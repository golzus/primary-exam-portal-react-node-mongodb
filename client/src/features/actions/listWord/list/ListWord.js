// import React, { useEffect } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import {
//   useDeleteListWordsMutation,
//   useGetAllListWordsQuery,
//   useGetAllListWordsByClassMutation,
// } from "../view/ListWordApiSlice";
// import { MdDelete } from "react-icons/md";
// import { RxPencil2 } from "react-icons/rx";
// import { ImList2 } from "react-icons/im";
// import { useSelector } from "react-redux";
// import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
// const ListWord = () => {
//   const [
//     getAllListWordsByClass,
//     { data: wordLsList, isError, error, isLoading },
//   ] = useGetAllListWordsByClassMutation();
//   const { chosenClass } = useSelector((state) => state.schoolAndClass);
//   let classObj
//   if(chosenClass)
//    classObj={chosenClass:chosenClass}
//   useEffect(() => {
//     if(chosenClass)
//     getAllListWordsByClass(classObj);
//   },[chosenClass]);
//   const [deleteListWords, { error: er }] = useDeleteListWordsMutation();
//   if(!chosenClass)return <CurrentSchoolAndClass/>
// if(error)
// {
//  return( <h1>{error.data.message}</h1>)
// }  // const {
//   //   data: wordLsList,
//   //   isError,
//   //   error,
//   //   isLoading,
//   // } = useGetAllListWordsQuery();
//   const deleteClick = (list) => {
//     if (window.confirm("בטוח שברתונך למחוק את החברה ?")) {
//       deleteListWords({ _id: list._id });
//     }
//   };

//   if (isLoading) return <h1>loading...</h1>;  
//   let count = 0;
//   return (
//     <div>
//       <table className="users-list-table">
//         <thead>
//           <tr>
//             <td>מס' בחינה</td>

//             <td>כותרת</td>
//             <td> תאריך</td>
//             <td> מספר מילים </td>
//           </tr>
//         </thead>
//         <tbody>
//           {wordLsList?.data.map((list) => (
//             <tr key={list._id}>
//               {" "}
//               <td>{++count}</td>
//               <td>
//                 <div className="users-list-company">{list.title}</div>
//               </td>
//               <td>{list.date.slice(0, 10)}</td>
//               <td>{list.test.length}</td>
//               <td>
//                 <div className="users-list-buttons">
//                   <Link
//                     to={`/dash/actions/test/${list._id}`}
//                     className="users-list-button users-list-view"
//                   >
//                     {" "}
//            <RxPencil2 title="update" fontSize={20} />
//                   </Link>
//                   <Link
//                     to={`/dash/actions/${list._id}`}
//                     className="users-list-button users-list-view"
//                   >
//                     {/* צפייה */}
//                     <ImList2 title="list" />
//                   </Link>
//                   <button
//                     onClick={() => {
//                       deleteClick(list);
//                     }}
//                     className="users-list-button users-list-delete"
//                   >
//                     {/* מחיקה */}
//                     <MdDelete title="Delete" fontSize={20} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListWord;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDeleteListWordsMutation, useGetAllListWordsByClassMutation } from "../view/ListWordApiSlice";
import { useSelector } from "react-redux";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#5d57c9',
    },
    secondary: {
      main: '#f39c12',
    },
    info: {
      main: '#3498db',
    },
    error: {
      main: '#e74c3c',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '2px solid #5d57c9',
          borderRadius: '8px',
          padding: '16px',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
            fontWeight: 'bold',
            color: '#333',
          },
          '& .MuiDataGrid-cell': {
            padding: '8px 16px',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
  },
});

const ListWord = () => {
  const [
    getAllListWordsByClass,
    { data: wordLsList, isError, error, isLoading },
  ] = useGetAllListWordsByClassMutation();
  const { chosenClass } = useSelector((state) => state.schoolAndClass);
  let classObj;
  if (chosenClass) classObj = { chosenClass: chosenClass };

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (chosenClass) getAllListWordsByClass(classObj);
  }, [chosenClass]);

  const [deleteListWords] = useDeleteListWordsMutation();

  if (!chosenClass) return <CurrentSchoolAndClass />;

  if (error) {
    return <Typography color="error" variant="h5">{error.data.message}</Typography>;
  }

  if (isLoading) return <Typography variant="h5">Loading...</Typography>;

  const handleDeleteClick = (list) => {
    if (window.confirm("בטוח שברצונך למחוק את המבחן?")) {
      deleteListWords({ _id: list._id });
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const printTest = (testId) => {
    // Find the test with the corresponding id
    const test = wordLsList?.data.find((list) => list._id === testId);

    if (test) {
      // Create a new window
      const printWindow = window.open('', '', 'width=800,height=600');

      // Define the content for the print window
      const content = `
        <html>
        <head>
          <title>${test.title} - Print Preview</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .container { max-width: 700px; margin: 0 auto; }
            h1 { text-align: center; margin-bottom: 20px; }
            ul { padding-left: 20px; }
            li { margin-bottom: 10px; }
            .no-print { text-align: center; margin-top: 20px; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${test.title}</h1>
            <ul>
              ${test.test.map(word => `<li>${word}</li>`).join('')}
            </ul>
            <div class="no-print">
              <button onclick="window.print()">Print</button>
            </div>
          </div>
        </body>
        </html>
      `;

      // Write the content to the new window
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
    } else {
      alert("Test not found!");
    }
  };

  const filteredRows = (wordLsList?.data || [])
    .filter((list) => list.title.toLowerCase().includes(searchText.toLowerCase()))
    .map((list) => ({
      id: list._id,
      title: list.title,
      date: list.date.slice(0, 10),
      wordCount: list.test.length,
    }));

  const columns = [
    { field: 'title', headerName: 'כותרת', flex: 1, headerAlign: 'center', align: 'center', renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">{params.row.title}</Typography>
    )},
    { field: 'date', headerName: 'תאריך', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'wordCount', headerName: 'מספר מילים', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'פעולות',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Fill Test">
            <IconButton
              component={Link}
              to={`/dash/actions/test/${params.row.id}`}
              aria-label="fill-test"
              color="primary"
              sx={{ mr: 1 }}
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton
              aria-label="print"
              onClick={() => printTest(params.row.id)}
              color="info"
              sx={{ mr: 1 }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton
              component={Link}
              to={`/dash/actions/${params.row.id}`}
              aria-label="update"
              color="info"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteClick(params.row)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='list-word'>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            label="חיפוש לפי כותרת"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '300px' }}
          />
          <Button
            component={Link}
            to="/dash/actions/add"
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AddCircleIcon style={{ marginRight: 8 }} />
            הוספת מבחן
          </Button>
        </Box>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 30]}
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default ListWord;
