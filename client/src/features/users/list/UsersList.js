// import React from 'react'
// import "./users-list.css"
// import { IoPersonAddSharp } from "react-icons/io5";

// import Search from "../../../components/search/Search"
// import {useDeleteUserMutation,useGetAllUsersQuery} from '../view/userApiSlice'
// import { Link, useSearchParams } from "react-router-dom"
// //try
// import useAuth from '../../../hooks/useAuth'
// const UsersList = () => {
//   const {company}=useAuth()
// //
// const {data:users,isError,error,isLoading}=useGetAllUsersQuery()
// const [deleteUser,{error:errorDelete,data:deletedData}]=useDeleteUserMutation()
// console.log(errorDelete,deletedData);
// const deleteClick = (user) => {
//   if (window.confirm("בטוח שברצונך למחוק את המשתמש ?")) {
//     deleteUser({ _id: user._id });
//   }
// };
// const [searchParams]=useSearchParams()
// const q=searchParams.get("q")
//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
//   const filterData=!q?[...users.data]:users.data.filter(user=>(user.fullname.indexOf(q)>-1)||(user.company.name.indexOf(q)>-1))
//   return (
//     <div className='user-list'>
//       <div className='user-list-top'>
//         <Search placeholder={"חיפוש לפי שם פרטי "} />
//         <Link to="/dash/users/add"
//           className="users-list-add-button">
//             <IoPersonAddSharp
//        />
//        הוספת תלמידה
//         </Link>
//       </div>
      
//       <table className='users-list-table'>
//         <thead>
//           <tr>
//             <td> שם פרטי</td>
//             <td> שם מלא</td>
//             <td> חברה </td>
//             <td> מייל </td>
//             <td> פעיל</td>
//           </tr>
//         </thead>
//         <tbody>
//           {filterData?.map(user => (
           
//            <tr key={user._id}>
//               <td>
//                 <div className='users-list-company'>
                  
//                   {user.username}
//                 </div>
//               </td>
       
//               <td>
//                 {user.fullname}
//               </td>
//               <td>
//                 {user.company?.name}
//               </td>
//               <td>
//                 {user.email}
//               </td>
//               <td>
//                 {user.active ? "פעיל" : "לא פעיל"}
//               </td>
//               <td>
//                 <div className='users-list-buttons'>
//                 <Link to={`/dash/users/${user._id}`} className='users-list-button users-list-view'>
//                   צפייה
//                 </Link>
//                 <button title="Delete item" aria-label="Delete item" onClick={()=>{deleteClick(user)}} className='users-list-button users-list-delete'>
//                   מחיקה
//                 </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   )
// }





// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link, useSearchParams } from "react-router-dom";
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import Search from "../../../components/search/Search";
// import "./users-list.css";

// const theme = createTheme({
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: '2px solid #5d57c9',
//           borderRadius: '8px',
//           padding: '16px',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f0f0f0',
//             fontWeight: 'bold',
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#f0f0f0',
//           },
//         },
//       },
//     },
//   },
// });

// const UsersList = () => {
//   const { company } = useAuth();
//   const { data: users, isError, error, isLoading } = useGetAllUsersQuery();
//   const [deleteUser, { error: errorDelete, data: deletedData }] = useDeleteUserMutation();
//   const [searchParams] = useSearchParams();
//   const [rows, setRows] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const q = searchParams.get("q");

//   useEffect(() => {
//     if (users) {
//       const usersData = users.data.map(user => ({
//         ...user,
//         id: user._id,  // הוספת מזהה ייחודי לכל שורה
//         companyName: user.company?.name,
//       }));
//       setRows(q ? usersData.filter(user => (user.fullname.includes(q) || user.companyName.includes(q))) : usersData);
//     }
//   }, [users, q]);

//   const deleteClick = (user) => {
//     if (window.confirm("בטוח שברצונך למחוק את המשתמש ?")) {
//       deleteUser({ _id: user._id });
//     }
//   };

//   const columns = [
//     { field: 'username', headerName: 'שם פרטי', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'fullname', headerName: 'שם מלא', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'companyName', headerName: 'חברה', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'email', headerName: 'מייל', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'active', headerName: 'פעיל', flex: 1, headerAlign: 'center', align: 'center', type: 'boolean' },
//     {
//       field: 'actions',
//       headerName: 'פעולות',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <Link to={`/dash/users/${params.row._id}`} className='users-list-button users-list-view'>
//             <Tooltip title="View">
//               <IconButton aria-label="view">
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>
//           </Link>
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete" onClick={() => deleteClick(params.row)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </>
//       ),
//     },
//   ];

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className='user-list'>
//         <div className='user-list-top'>
//           {/* <Search placeholder={"חיפוש לפי שם פרטי "} /> */}
//           <Link to="/dash/users/add" className="users-list-add-button">
//             <IoPersonAddSharp />
//             הוספת תלמידה
//           </Link>
//         </div>
//         <Box sx={{ height: 700, width: '100%', marginTop: '20px' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//             disableSelectionOnClick
//             getRowId={(row) => row.id}  // שימוש ב-id המותאם שלנו
//           />
//         </Box>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default UsersList;


// // export default UsersList







// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom";
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import "./users-list.css";

// const theme = createTheme({
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: '2px solid #5d57c9',
//           borderRadius: '8px',
//           padding: '16px',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f0f0f0',
//             fontWeight: 'bold',
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#f0f0f0',
//           },
//         },
//       },
//     },
//   },
// });

// const UsersList = () => {
//   const { company } = useAuth();
//   const { data: users, isError, error, isLoading } = useGetAllUsersQuery();
//   const [deleteUser, { error: errorDelete, data: deletedData }] = useDeleteUserMutation();
//   const [rows, setRows] = useState([]);
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     if (users) {
//       const usersData = users.data.map(user => ({
//         ...user,
//         id: user._id,
//         companyName: user.company?.name,
//       }));
//       setRows(usersData);
//     }
//   }, [users]);

//   const deleteClick = (user) => {
//     if (window.confirm("בטוח שברצונך למחוק את המשתמש ?")) {
//       deleteUser({ _id: user._id });
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchText(event.target.value);
//   };

//   const filteredRows = rows.filter((row) => {
//     return row.fullname.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const columns = [
//     { field: 'username', headerName: 'שם פרטי', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'fullname', headerName: 'שם מלא', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'companyName', headerName: 'חברה', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'email', headerName: 'מייל', flex: 1, headerAlign: 'center', align: 'center' },
//     { field: 'active', headerName: 'פעיל', flex: 1, headerAlign: 'center', align: 'center', type: 'boolean' },
//     {
//       field: 'actions',
//       headerName: 'פעולות',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <Link to={`/dash/users/${params.row._id}`} className='users-list-button users-list-view'>
//             <Tooltip title="View">
//               <IconButton aria-label="view">
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>
//           </Link>
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete" onClick={() => deleteClick(params.row)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </>
//       ),
//     },
//   ];

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className='user-list'>
//         <div className='user-list-top'>
//           <TextField
//             label="חיפוש לפי שם"
//             variant="outlined"
//             fullWidth
//             value={searchText}
//             onChange={handleSearch}
//             sx={{ marginBottom: '16px' }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Link to="/dash/users/add" className="users-list-add-button">
//             <IoPersonAddSharp />
//             הוספת תלמידה
//           </Link>
//         </div>
//         <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
//           <DataGrid
//             rows={filteredRows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//             disableSelectionOnClick
//             getRowId={(row) => row._id}
//           />
//         </Box>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default UsersList;




// // https://www.jgive.com/new/he/ils/donation-targets/91205/about



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom"; // Import Link here
import { IoPersonAddSharp } from "react-icons/io5";
import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
import useAuth from '../../../hooks/useAuth';
import AddUserForm from '../add/AddUser';  // Import AddUserForm component
import './users-list.css';  // Make sure the path is correct

const theme = createTheme({
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
    if (window.confirm("בטוח שברצונך למחוק את המשתמש ?")) {
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

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='user-list'>
        <div className='user-list-top'>
          <TextField
            label="חיפוש לפי שם"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={handleSearch}
            sx={{ marginBottom: '16px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <button 
            className="users-list-add-button"
            onClick={() => setShowAddUserForm(true)}
          >
            <IoPersonAddSharp />
            הוספת תלמידה
          </button>
        </div>
        <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
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
        {showAddUserForm && (
          <AddUserForm 
            setShowThankYou={setShowThankYou} 
            setOpenModal={setShowAddUserForm} 
          />
        )}
        {showThankYou && (
          <div className="thank-you-message">
            <h2>תודה! התלמידה נוספה בהצלחה.</h2>
            <button onClick={() => setShowThankYou(false)}>סגור</button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default UsersList;
