import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, InputAdornment, IconButton, Tooltip, Button, Modal, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
import useAuth from '../../../hooks/useAuth';
import AddUserForm from '../add/AddUser';
import theme from '../../../theme'; 
import { ThemeProvider } from '@mui/material/styles'; 
import './users-list.css';

const UsersList = () => {
  const { company } = useAuth();
  const { data: users, isError, error, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { error: errorDelete, data: deletedData }] = useDeleteUserMutation();
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (users) {
      const usersData = users.data.map(user => ({
        ...user,
        id: user._id,
        companyName: user.company?.name,
      }));
      setRows(usersData);
    }
  }, [users]);

  const deleteClick = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser({ _id: user._id });
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.fullname.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    { field: 'username', headerName: 'שם משתמש', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'fullname', headerName: 'שם מלא', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'companyName', headerName: 'חברה', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'מייל', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'active', headerName: 'פעיל', flex: 1, headerAlign: 'center', align: 'center', type: 'boolean' },
    {
      field: 'actions',
      headerName: 'פעולות',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dash/users/${params.row._id}`} className='users-list-button users-list-view'>
            <Tooltip title="View">
              <IconButton aria-label="view">
                <EditIcon />
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

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  return (
    <ThemeProvider theme={theme}> 
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box className='user-list-top' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Button
            className="users-list-add-button"
            onClick={() => setShowAddUserForm(true)}
            startIcon={<IoPersonAddSharp />}
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
            הוספת תלמידה
          </Button>
          <TextField
            label="חיפוש לפי שם"
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
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ flex: 1, overflowY: 'auto', height: '70%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row._id}
            />
          </Box>
          <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#f3f3e9', padding: '8px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/logo.png' style={{ height: '200px', marginRight: '8px' }} />
            <Typography variant="body2" color="textSecondary">
              © 2024 Your Company
            </Typography>
          </Box>
        </Box>
        <Modal
          open={showAddUserForm}
          onClose={() => setShowAddUserForm(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Paper sx={{ padding: '16px', width: '400px', margin: 'auto', marginTop: '20vh' }}>
            <Typography id="modal-title" variant="h6" component="h2">
              הוספת תלמידה חדשה
            </Typography>
            <AddUserForm 
              setShowThankYou={setShowThankYou} 
              setOpenModal={setShowAddUserForm} 
            />
          </Paper>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default UsersList;
