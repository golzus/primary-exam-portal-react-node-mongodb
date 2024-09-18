




import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, InputAdornment, IconButton, Tooltip, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from "@mui/icons-material/Visibility";
 import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useSearchParams } from 'react-router-dom';
import { BsBuildingAdd } from "react-icons/bs";
import { useGetAllSchoolsByTeacherMutation, useDeleteSchoolMutation } from '../CompaniesApiSlice';
import useAuth from '../../../hooks/useAuth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LOADING from '../../loadingAnimation/LoadingAnimation';
const SchoolList = () => {
  const [getAllSchoolsByTeacher, { data: Schools, isError, error, isLoading }] = useGetAllSchoolsByTeacherMutation();
  const { _id } = useAuth();
  const teacher = _id;

  useEffect(() => {
    getAllSchoolsByTeacher({ teacher });
  }, []);

  const [deleteSchool] = useDeleteSchoolMutation();
  const [searchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (Schools) {
      const schoolsData = Schools.data?.map(school => ({
        ...school,
        id: school._id,
        createedAt: school.createdAt?.toString().slice(0, 10),
        activeStatus: school.active ? "פעיל" : "לא פעיל"
      }));
      setRows(schoolsData);
    }
  }, [Schools]);

  const deleteClick = (school) => {
    if (window.confirm("בטוח שברצונך למחוק את בית הספר?")) {
      deleteSchool({ _id: school._id });
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows?.filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    { field: 'name', headerName: 'שם בית ספר', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'createedAt', headerName: 'נוצר ב', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'activeStatus', headerName: 'פעיל', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'פעולות',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dash/companies/${params.row._id}`} className='list-view'>
            <Tooltip title="View-classes">
              <IconButton aria-label="view-classes">
                <VisibilityIcon />

              </IconButton>
            </Tooltip>
          </Link>
          <Link to={`/dash/companies/class/${params.row._id}`} className='class-list-button'>
            <Tooltip title="add class">
              <IconButton aria-label="add-class">
                <AddCircleOutlineIcon />

              </IconButton>
            </Tooltip>
          </Link>


         



          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => deleteClick(params.row)}>
            <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (isLoading) return <LOADING/>
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '75vh', overflowY: 'hidden',
    }}>
      <Box className='school-list-top' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 16px',overflowX:'auto',overflowY:'hidden' }}>
        <Button
          className="schools-list-add-button"
          component={Link}
          to="/dash/companies/add"
          startIcon={<BsBuildingAdd />}
          sx={{
            backgroundColor: '#9B153B',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#7a0f29',
            },
            fontSize: '0.75rem',
            padding: '4px 8px',
          }}
        >
          הוספת בית ספר
        </Button>
        <TextField
          label="חיפוש לפי שם בית ספר"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ margin: '4px', fontSize: '0.75rem' }}
        />
      </Box>
      <Box sx={{ 
   flex: 1, 
   overflowY: 'auto', 
   paddingBottom: '20vh', 
   display: 'flex', 
   flexDirection: 'column', 
   minHeight: '65vh', // מאפשר ל-Box להתכווץ ולהתממש בהתאם לתוכן,
  minWidth:'700px'}}>
  <DataGrid
    rows={filteredRows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    disableSelectionOnClick
    sx={{
      height: "100%", // ייקח את כל השטח הפנוי ב-Box
      width: "100%",
      "& .MuiDataGrid-columnHeader": {
        fontWeight: "bolder", // Bold header text
        fontSize: "larger",
      },
      "& .MuiDataGrid-cell": {
        // overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }}
  />
</Box>
    </Box>
  );
};

export default SchoolList;
