

import React, { useEffect } from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid } from '@mui/x-data-grid';
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from './ListWordApiSlice';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../theme';
import WordSpeaker from '../add/WordSpeaker';
import useAuth from '../../../../hooks/useAuth';
import LOADING from '../../../loadingAnimation/LoadingAnimation';







const Words = () => {
  const {roles}=useAuth()
  const [getSingleTest,testResponse] = useGetSingleTestMutation();
  const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
  const { _id } = useParams();
  let isSuccess,wordList,isError,isLoading
  if(roles==='Teacher'){
     isSuccess=listWordsResponse.isSuccess;
     isLoading=listWordsResponse.isLoading;
    wordList=listWordsResponse.data;
    isError=listWordsResponse.isError
  }
  else{
    isSuccess=testResponse.isSuccess;
    isLoading=testResponse.isLoading
    wordList=testResponse.data;
    isError=testResponse.isError ;
  }
  useEffect(() => {
    if(roles==='Teacher')
    getListWordsById({ _id });
  else
  getSingleTest({_id})
  }, [_id]);

  const handlePrint = () => {
    const printableArea = document.getElementById('printable-area');
    if (printableArea) {
      const originalContent = document.body.innerHTML;
      const printContent = printableArea.innerHTML;

      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; padding: 0; }
            #printable-area { margin: 10px; }
            table { width: 80%; border-collapse: collapse; margin: 0 auto; }
            th, td { border: 1px solid ${theme.palette.primary.main}; padding: 6px; text-align: center; }
            th { background-color: ${theme.palette.primary.main}; color: #ffffff; }
            td { color: ${theme.palette.primary.main}; }
            @media print {
              body { margin: 0; font-size: 8px; }
              #printable-area { width: 100%; }
              table { width: 90%; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div id="printable-area">
            <h1 style="text-align: center; color: ${theme.palette.primary.main};">${wordList.data.title}</h1>
            <h2 style="text-align: center; color: ${theme.palette.primary.main};">${wordList.data.date}</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Word</th>
                  <th>Translation</th>
                </tr>
              </thead>
              <tbody>
                ${wordList.data.test.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.word}</td>
                    <td>${item.translate}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      console.error('Print area not found.');
    }
  };

  if (isLoading || !wordList) return <LOADING/>

  const columns = [
    { field: 'number', headerName: '#', flex: 0.2, headerAlign: 'center', align: 'center' },
    { field: 'word', headerName: 'Word', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'translate', headerName: 'Translation', flex: 1, headerAlign: 'center', align: 'center' },
    { 
      field: 'read', 
      headerName: 'Read', 
      flex: 0.2, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => <WordSpeaker word={params.row.word} />,
      printOptions: { display: 'none' } // Hide in print
    },
  ];

  const rows = wordList.data.test.map((item, index) => ({
    id: index,
    number: index + 1,
    word: item.word,
    translate: item.translate,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '16px' ,   backgroundColor: '#ffffff',  // צבע רקע לבן
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
          overflowY: 'auto',}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h4" component="h1" sx={{ color: theme.palette.primary.main }}>{wordList.data.title}</Typography>
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: '8px', color: theme.palette.primary.main }}>
            {wordList.data.date}
          </Typography>
        </Box>
       


  <Tooltip title="Print">
                <IconButton
                          onClick={handlePrint}

                  aria-label="print"
                  // onClick={() => printTest(params.row.id)}
                  color="info"
                  sx={{ mr: 1 }}
                >
                  <PrintIcon />
                </IconButton>
              </Tooltip>




        <Box sx={{ height: '100%', width: '100%' }}>
          <div id="printable-area" style={{ fontSize: '10px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              sx={{
                border: '1px solid #9B153B',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#9B153B', // Set header background color to Bordeaux
                  fontWeight: 'bold',
                  color: '#ffffff', // Set text color to white
                },
                '& .MuiDataGrid-cell': {
                  color: '#9B153B',
                  border: '1px solid #9B153B',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#f3f3e9',
                },
                '& .MuiCheckbox-root': {
                  color: '#9B153B',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#9B153B', // Bordeaux color for headers
                },
                '@media print': {
                  '& .no-print': {
                    display: 'none', // Hide elements with the class 'no-print' in print view
                  },
                },
              }}
            />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Words;
