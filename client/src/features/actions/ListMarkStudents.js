import React, { useEffect, useState } from 'react';
import { useGetAlltestsByListWordIdMutation } from './listWord/view/ListWordApiSlice';
import { useParams, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress, ThemeProvider, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description'; // אייקון למבחן
import theme from '../../theme';

const ListMarkStudents = () => {
  const [getAlltestsByListWordId, { error, data, isLoading }] = useGetAlltestsByListWordIdMutation();
  const { _id } = useParams();
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAlltestsByListWordId({ _id });
        console.log('Response Data:', response);

        if (response.data && Array.isArray(response.data.data)) {
          const testsArray = response.data.data;
          const formattedRows = testsArray.map(item => ({
            id: item._id,
            mark: item.countListenToWord,
            user: item.user.fullname,
            actions: item._id
          }));
          console.log('Formatted Rows:', formattedRows);
          setRows(formattedRows);
          setFilteredRows(formattedRows);
        } else {
          console.error('No data received or data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [_id, getAlltestsByListWordId]);
  // useEffect(()=>{
  //     getAlltestsByListWordId({_id})
  // },[])
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        row.user.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, rows]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: 'mark', headerName: 'ציון', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'user', headerName: 'כותרת', width: 200, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'פעולות',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Link to={`/dash/test/${params.value}`} style={{ textDecoration: 'none', color: '#9B153B' }}>
          <DescriptionIcon />
        </Link>
      ),
    },
  ];

  if (isLoading) return <CircularProgress />;
  if (error || !data) return <Typography variant="h6">Error loading data</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px', margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          ציונים ובחנים של תלמידות
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {data.data[0].title}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {data.data[0].date.slice(0, 10)}
        </Typography>
        <Box className='user-list-top' sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px' }}>
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
              getRowId={(row) => row.id}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ListMarkStudents;
