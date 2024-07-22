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



// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom"; // Import Link here
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import AddUserForm from '../add/AddUser';  // Import AddUserForm component
// import './users-list.css';  // Make sure the path is correct

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
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);

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
//     { field: 'username', headerName: 'שם משתמש', flex: 1, headerAlign: 'center', align: 'center' },
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
//           <button 
//             className="users-list-add-button"
//             onClick={() => setShowAddUserForm(true)}
//           >
//             <IoPersonAddSharp />
//             הוספת תלמידה
//           </button>
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
//         {showAddUserForm && (
//           <AddUserForm 
//             setShowThankYou={setShowThankYou} 
//             setOpenModal={setShowAddUserForm} 
//           />
//         )}
//         {showThankYou && (
//           <div className="thank-you-message">
//             <h2>תודה! התלמידה נוספה בהצלחה.</h2>
//             <button onClick={() => setShowThankYou(false)}>סגור</button>
//           </div>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default UsersList;

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom";
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import AddUserForm from '../add/AddUser';
// import './users-list.css';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#283593', // Indigo
//       light: '#5c6bc0', // Light Blue
//       dark: '#1a237e', // Darker Indigo
//     },
//     secondary: {
//       main: '#ff7043', // Orange
//     },
//   },
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: '2px solid #283593',
//           borderRadius: '8px',
//           padding: '16px',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#e8eaf6', // Light Indigo background
//             fontWeight: 'bold',
//             color: '#1a237e', // Darker Indigo text
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//             color: '#283593', // Indigo text
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#e8eaf6',
//           },
//           '& .MuiCheckbox-root': {
//             color: '#283593', // Indigo for checkbox
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#283593', // Indigo border
//             },
//             '&:hover fieldset': {
//               borderColor: '#1a237e', // Darker Indigo border on hover
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#5c6bc0', // Light Blue border on focus
//             },
//           },
//           '& .MuiInputAdornment-root': {
//             color: '#283593', // Indigo color for adornment
//           },
//           '& .MuiInputLabel-root': {
//             color: '#283593', // Indigo color for label
//             '&.Mui-focused': {
//               color: '#5c6bc0', // Light Blue color on focus
//             },
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ff7043', // Orange background
//           color: '#ffffff', // White text
//           '&:hover': {
//             backgroundColor: '#f4511e', // Darker orange on hover
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: '#283593', // Indigo color for icons
//           '&:hover': {
//             color: '#1a237e', // Darker Indigo on hover
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
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);

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
//     { field: 'username', headerName: 'שם משתמש', flex: 1, headerAlign: 'center', align: 'center' },
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
//           <Button
//             className="users-list-add-button"
//             onClick={() => setShowAddUserForm(true)}
//             startIcon={<IoPersonAddSharp />}
//             sx={{
//               marginBottom: '16px',
//               backgroundColor: theme.palette.secondary.main, // using secondary main color
//               color: '#ffffff', // white text color
//               '&:hover': {
//                 backgroundColor: theme.palette.secondary.dark, // darker secondary color on hover
//               },
//             }}
//           >
//             הוספת תלמידה
//           </Button>
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
//         {showAddUserForm && (
//           <AddUserForm 
//             setShowThankYou={setShowThankYou} 
//             setOpenModal={setShowAddUserForm} 
//           />
//         )}
//         {showThankYou && (
//           <div className="thank-you-message">
//             <h2>תודה! התלמידה נוספה בהצלחה.</h2>
//             <button onClick={() => setShowThankYou(false)}>סגור</button>
//           </div>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default UsersList;



// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip, Button, Modal, Paper, Typography } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom";
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import AddUserForm from '../add/AddUser';
// import './users-list.css';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#283593', // Indigo
//       light: '#5c6bc0', // Light Blue
//       dark: '#1a237e', // Darker Indigo
//     },
//     secondary: {
//       main:'#9B153B'
//     },
//   },
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: 'none', // Remove the border
//           borderRadius: '8px',
//           width: '100%',
//           overflow: 'hidden', // Prevent horizontal overflow
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f3f3e9', // Light beige background color
//             fontWeight: 'bold',
//             color: '#9B153B', // Dark red text color
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//             color: '#9B153B', // Dark red text color
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#f3f3e9', // Light beige background color
//           },
//           '& .MuiCheckbox-root': {
//             color: '#9B153B', // Dark red for checkbox
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#9B153B', // Dark red border
//             },
//             '&:hover fieldset': {
//               borderColor: '#9B153B', // Dark red border on hover
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#9B153B', // Dark red border on focus
//             },
//           },
//           '& .MuiInputAdornment-root': {
//             color: '#9B153B', // Dark red color for adornment
//           },
//           '& .MuiInputLabel-root': {
//             color: '#9B153B', // Dark red color for label
//             '&.Mui-focused': {
//               color: '#9B153B', // Dark red color on focus
//             },
//           },
//           '& .MuiInputBase-input': {
//             backgroundColor: '#f3f3e9', // Light beige background color for input
//             padding: '8px', // Padding for input text
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ff7043', // Orange background
//           color: '#ffffff', // White text
//           '&:hover': {
//             backgroundColor: '#f4511e', // Darker orange on hover
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: '#9B153B', // Dark red color for icons
//           '&:hover': {
//             color: '#9B153B', // Dark red on hover
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
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);

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
//     if (window.confirm("Are you sure you want to delete this user?")) {
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
//     { field: 'username', headerName: 'שם משתמש', flex: 1, headerAlign: 'center', align: 'center' },
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

//   useEffect(() => {
//     if (showThankYou) {
//       const timer = setTimeout(() => {
//         setShowThankYou(false);
//       }, 10000); // 10 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [showThankYou]);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className='user-list'>
//         <Box className='user-list-top' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <Button
//             className="users-list-add-button"
//             onClick={() => setShowAddUserForm(true)}
//             startIcon={<IoPersonAddSharp />}
//             sx={{
//               backgroundColor: theme.palette.secondary.main, // using secondary main color
//               color: '#ffffff', // white text color
//               '&:hover': {
//                 backgroundColor: theme.palette.secondary.dark, // darker secondary color on hover
//               },
//             }}
//           >
//             הוספת תלמידה
//           </Button>
//           <TextField
//             label="חיפוש לפי שם"
//             variant="outlined"
//             value={searchText}
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ margin: "10px" }}
//           />
//         </Box>
//         <Box sx={{
//           height: 'calc(100vh - 120px)', // Adjust height to fit the screen
//           width: '100%',
//           overflow: 'auto',
//           padding: '16px'
//         }}>
//           <div style={{ width: '100%', overflowX: 'auto' }}>
//             <DataGrid
//               rows={filteredRows}
//               columns={columns}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//               disableSelectionOnClick
//               getRowId={(row) => row._id}
//               autoHeight
//               sx={{
//                 '& .MuiDataGrid-cell': {
//                   color: '#9B153B' // Dark red text color
//                 },
//               }}
//             />
//           </div>
//         </Box>
//         <Modal
//           open={showAddUserForm}
//           onClose={() => setShowAddUserForm(false)}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Paper sx={{ padding: '16px', margin: 'auto', maxWidth: '500px', position: 'relative' }}>
//             <Typography variant="h6" component="h2" id="modal-title">
//               הוספת תלמידה
//             </Typography>
//             <AddUserForm 
//               setShowThankYou={setShowThankYou} 
//               setShowAddUserForm={setShowAddUserForm}
//             />
//           </Paper>
//         </Modal>
//         {showThankYou && (
//           <Box sx={{
//             position: 'fixed',
//             bottom: '16px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             backgroundColor: '#d4edda',
//             padding: '16px',
//             borderRadius: '8px',
//             boxShadow: 3,
//             zIndex: 1000,
//             color: '#283593',
//           }}>
//             תלמידה נוספה בהצלחה!
//           </Box>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default UsersList;



// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box, TextField, InputAdornment, IconButton, Tooltip, Button, Modal, Paper, Typography } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from "react-router-dom";
// import { IoPersonAddSharp } from "react-icons/io5";
// import { useDeleteUserMutation, useGetAllUsersQuery } from '../view/userApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import AddUserForm from '../add/AddUser';
// import './users-list.css';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#283593',
//       light: '#5c6bc0',
//       dark: '#1a237e',
//     },
//     secondary: {
//       main: '#9B153B'
//     },
//   },
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: 'none',
//           borderRadius: '8px',
//           padding: '16px',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f3f3e9',
//             fontWeight: 'bold',
//             color: '#9B153B',
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//             color: '#9B153B',
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#f3f3e9',
//             boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
//           },
//           '& .MuiCheckbox-root': {
//             color: '#9B153B',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#9B153B',
//             },
//             '&:hover fieldset': {
//               borderColor: '#9B153B',
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#9B153B',
//             },
//           },
//           '& .MuiInputAdornment-root': {
//             color: '#9B153B',
//           },
//           '& .MuiInputLabel-root': {
//             color: '#9B153B',
//             '&.Mui-focused': {
//               color: '#9B153B',
//             },
//           },
//           '& .MuiInputBase-input': {
//             backgroundColor: '#f3f3e9',
//             padding: '8px',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ff7043',
//           color: '#ffffff',
//           '&:hover': {
//             backgroundColor: '#f4511e',
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: '#9B153B',
//           '&:hover': {
//             color: '#9B153B',
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
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);

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
//     if (window.confirm("Are you sure you want to delete this user?")) {
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
//     { field: 'username', headerName: 'שם משתמש', flex: 1, headerAlign: 'center', align: 'center' },
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

//   useEffect(() => {
//     if (showThankYou) {
//       const timer = setTimeout(() => {
//         setShowThankYou(false);
//       }, 10000);

//       return () => clearTimeout(timer);
//     }
//   }, [showThankYou]);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//        sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}
//        >
//         <Box className='user-list-top'
//          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}
//          >
//           <Button
//             className="users-list-add-button"
//             onClick={() => setShowAddUserForm(true)}
//             startIcon={<IoPersonAddSharp />}
//             sx={{
//               backgroundColor: theme.palette.secondary.main,
//               color: '#ffffff',
//               '&:hover': {
//                 backgroundColor: theme.palette.secondary.dark,
//               },
//               fontSize: '0.75rem', // smaller font size
//               padding: '4px 8px', // smaller padding
//             }}
//           >
//             הוספת תלמידה
//           </Button>
//           <TextField
//             label="חיפוש לפי שם"
//             variant="outlined"
//             value={searchText}
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ margin: '4px', fontSize: '0.75rem' }} // smaller margin and font size
//           />
//         </Box>
//         <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//           <Box sx={{ flex: 1, overflowY: 'auto', height: '70%' }}> {/* Adjust height to fit 70% of the available space */}
//             <DataGrid
//               rows={filteredRows}
//               columns={columns}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//               disableSelectionOnClick
//               getRowId={(row) => row._id}
//             />
//           </Box>
//           <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#f3f3e9', padding: '8px', zIndex: 1 }}>
//             {/* Sticky footer content */}
//             <Typography variant="body2" color="textSecondary">
//               © 2024 Your Company
//             </Typography>
//           </Box>
//         </Box>
//         <Modal
//           open={showAddUserForm}
//           onClose={() => setShowAddUserForm(false)}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Paper sx={{ padding: '16px', width: '400px', margin: 'auto', marginTop: '20vh' }}>
//             <Typography id="modal-title" variant="h6" component="h2">
//               הוספת תלמידה חדשה
//             </Typography>
//             <AddUserForm 
//               setShowThankYou={setShowThankYou} 
//               setOpenModal={setShowAddUserForm} 
//             />
//           </Paper>
//         </Modal>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UsersList;

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
import theme from '../../../theme'; // ייבוא ה-theme
import { ThemeProvider } from '@mui/material/styles'; // ייבוא ThemeProvider
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
    <ThemeProvider theme={theme}> {/* שימוש ב-ThemeProvider */}
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
          <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#f3f3e9', padding: '8px', zIndex: 1 }}>
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