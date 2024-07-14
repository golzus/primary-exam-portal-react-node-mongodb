// import "./sitdebar.css";
// import NenuLink from "./NenuLink";
// import {
//   MdDashboard,
//   MdSupervisedUserCircle,
//   MdPendingActions,
//   MdOutlineSettings,
//   MdHelpCenter,
//   MdOutlineBusinessCenter,
//   MdLogout,
// } from "react-icons/md";
// import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import useAuth from "../../hooks/useAuth";
// import CurrentSchoolAndClass from "../../features/companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
// const SitdeBar = () => {
//   const {username,fullname,company,roles}=useAuth()
//   const [logout, { isSuccess, isError }] = useSendLogoutMutation();
//   const navigate = useNavigate();
//   const studentMenuItems = [
//     {
//       title: "דפים",
//       list: [
//         {
//           title: "ראשי",
//           path: "/dash",
//           icon: <MdDashboard />,
//         },
//         {
//           title: "פעולות",
//           path: "actions",
//           icon: <MdPendingActions />,
//         },
//       ],
//     },
//     {
//       title: "משתמש",
//       list: [
//         {
//           title: "הגדרות",
//           path: "settings",
//           icon: <MdOutlineSettings />,
//         },
//         {
//           title: "עזרה",
//           path: "help",
//           icon: <MdHelpCenter />,
//         },
//       ],
//     },
//   ];
//   const teacherMenuItems = [
//     {
//       title: "דפים",
//       list: [
//         {
//           title: "ראשי",
//           path: "/dash",
//           icon: <MdDashboard />,
//         },
//         {
//           title: "תלמידות",
//           path: "users",
//           icon: <MdSupervisedUserCircle />,
//         },
//         {
//           title: "בתי ספר",
//           path: "companies",
//           icon: <MdOutlineBusinessCenter />,
//         },
//         {
//           title: "פעולות",
//           path: "actions",
//           icon: <MdPendingActions />,
//         },
//       ],
//     },
//     {
//       title: "משתמש",
//       list: [
//         {
//           title: "הגדרות",
//           path: "settings",
//           icon: <MdOutlineSettings />,
//         },
//         {
//           title: "עזרה",
//           path: "help",
//           icon: <MdHelpCenter />,
//         },
//       ],
//     },
//   ];
// const menuItems=roles==="Teacher"?teacherMenuItems:studentMenuItems
//   // const user = {
//   //   username: "username",
//   //   fullname: "שם מלא ",
//   //   company: "שם חברה ",
//   //   image: "",
//   // };
//   useEffect(() => {
//     if (isSuccess) navigate("/login");
//   }, [isSuccess]);
//   const logoutClick = () => {
//     logout();
//   };
//   return (
//     <div className="side-bar">
//       <div className="side-bar-user">
//         <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" />
//         {/* <img src={user.image || "/3.png"} alt="" width="50" height="50" /> */}

//         <div className="side-bar-user-details">
//           <span className="side-car-user-username">{fullname} </span>
//           {/* <span className="side-car-user-username">{user.fullname} </span> */}
//           <span className="side-car-user-title">{company?.name} </span>
//           {/* <span className="side-car-user-title">{user.company} </span> */}
//           <span className="side-car-user-title">{roles} </span>
// <Link to={"dash/choose"}>classAndSchool</Link>
//         </div>
//       </div>
//       <ul className="side-bar-menu-list">
//       {menuItems.map((cat) => (
//           <li key={cat.title}>
//             <span className="side-bar-menu-cat"> {cat.title} </span>
//             {cat.list.map((itme) => (
//               <NenuLink itme={itme} key={itme.title} />
//             ))}
//           </li>
//         ))}
//       </ul>
//       <button onClick={logoutClick} className="side-bar-logout">
//         <MdLogout />
//         יציאה
//       </button>
//     </div>
//   );

// };

// export default SitdeBar;


// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button, Avatar, Typography, Divider, Box } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { 
//   Dashboard, 
//   Person, 
//   Business, 
//   PendingActions, 
//   Settings, 
//   Help, 
//   ExitToApp 
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם חברה",
//   image: "https://via.placeholder.com/50", // URL לדוגמא לתמונה
// };

// const menuItems = [
//   {
//     title: "דפים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "משתמשים", path: "users", icon: <Person /> },
//       { title: "חברות", path: "seminaries", icon: <Business /> },
//       { title: "פעולות", path: "actions", icon: <PendingActions /> },
//     ],
//   },
//   {
//     title: "משתמש",
//     list: [
//       { title: "הגדרות", path: "settings", icon: <Settings /> },
//       { title: "עזרה", path: "help", icon: <Help /> },
//     ],
//   },
// ];

// const SiteBar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="right"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: '#f5f5f5',
//           color: '#1A2035',
//           direction: 'rtl',
//         },
//       }}
//     >
//       <Toolbar sx={{ backgroundColor: '#f5f5f5', textAlign: 'center', padding: '16px' }}>
//         <Typography variant="h6" noWrap sx={{ color: '#1A2035' }}>
//           CREATIVE TIM
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <Box sx={{ padding: '16px', textAlign: 'center' }}>
//         <Avatar src={user.image} sx={{ width: 50, height: 50, margin: 'auto' }} />
//         <Typography variant="h6" component="div" sx={{ color: '#1A2035' }}>{user.fullname}</Typography>
//         <Typography variant="body2" sx={{ color: '#757575' }}>{user.seminary}</Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               <ListItemText primary={cat.title} sx={{ color: '#1A2035', paddingRight: '16px' }} />
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <ListItem 
//                 button 
//                 component={NavLink} 
//                 to={item.path} 
//                 key={subIndex} 
//                 sx={{
//                   paddingRight: '16px',
//                   display: 'flex',
//                   justifyContent: 'flex-start',
//                   alignItems: 'center',
//                   '&:hover': {
//                     backgroundColor: '#e0e0e0',
//                   },
//                   '&.active': {
//                     backgroundColor: '#ffd740', // צבע אחר כשנבחר
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: '#1A2035', minWidth: '40px' }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.title} sx={{ color: '#1A2035' }} />
//               </ListItem>
//             ))}
//           </div>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         startIcon={<ExitToApp />}
//         sx={{ backgroundColor: '#00bcd4', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '16px' }}
//       >
//         יציאה
//       </Button>
//     </Drawer>
//   );
// };

// export default SiteBar;



// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button, Avatar, Typography, Divider, Box } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { 
//   Dashboard, 
//   Person, 
//   Business, 
//   PendingActions, 
//   Settings, 
//   Help, 
//   ExitToApp 
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם חברה",
//   image: "https://via.placeholder.com/50", // URL לדוגמא לתמונה
// };

// const menuItems = [
//   {
//     title: "דפים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "משתמשים", path: "users", icon: <Person /> },
//       { title: "חברות", path: "seminaries", icon: <Business /> },
//       { title: "פעולות", path: "actions", icon: <PendingActions /> },
//     ],
//   },
//   {
//     title: "משתמש",
//     list: [
//       { title: "הגדרות", path: "settings", icon: <Settings /> },
//       { title: "עזרה", path: "help", icon: <Help /> },
//     ],
//   },
// ];

// const SiteBar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="right"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: '#f5f5f5', // צבע רקע
//           color: '#1A2035', // צבע טקסט
//           direction: 'rtl',
//         },
//       }}
//     >
//       <Toolbar sx={{ backgroundColor: '#f5f5f5', textAlign: 'center', padding: '16px' }}>
//         <Typography variant="h6" noWrap sx={{ color: '#1A2035' }}>
//           CREATIVE TIM
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <Box sx={{ padding: '16px', textAlign: 'center' }}>
//         <Avatar src={user.image} sx={{ width: 50, height: 50, margin: 'auto' }} />
//         <Typography variant="h6" component="div" sx={{ color: '#1A2035' }}>{user.fullname}</Typography>
//         <Typography variant="body2" sx={{ color: '#757575' }}>{user.seminary}</Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               <ListItemText primary={cat.title} sx={{ color: '#1A2035', paddingRight: '16px' }} />
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <ListItem 
//                 button 
//                 component={NavLink} 
//                 to={item.path} 
//                 key={subIndex} 
//                 sx={{
//                   paddingRight: '16px',
//                   display: 'flex',
//                   justifyContent: 'flex-start',
//                   alignItems: 'center',
//                   '&:hover': {
//                     backgroundColor: '#e0e0e0', // צבע רקע בהעברת העכבר
//                   },
//                   '&.active': {
//                     backgroundColor: '#ffd740', // צבע רקע כאשר נבחר
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: '#1A2035', minWidth: '40px' }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.title} sx={{ color: '#1A2035' }} />
//               </ListItem>
//             ))}
//           </div>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         startIcon={<ExitToApp />}
//         sx={{ backgroundColor: '#00bcd4', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '16px' }}
//       >
//         יציאה
//       </Button>
//     </Drawer>
//   );
// };

// export default SiteBar;



// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Avatar, Typography, Divider, Box } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { 
//   Dashboard, 
//   Person, 
//   Business, 
//   PendingActions, 
//   Settings, 
//   Help, 
//   ExitToApp 
// } from '@mui/icons-material';

// const drawerWidth = '25rem';  // Increased drawer width to 25rem

// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם חברה",
//   image: "https://via.placeholder.com/50", // URL לדוגמא לתמונה
// };

// const menuItems = [
//   {
//     title: "דפים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "משתמשים", path: "users", icon: <Person /> },
//       { title: "חברות", path: "seminaries", icon: <Business /> },
//       { title: "פעולות", path: "actions", icon: <PendingActions /> },
//     ],
//   },
//   {
//     title: "משתמש",
//     list: [
//       { title: "הגדרות", path: "settings", icon: <Settings /> },
//       { title: "עזרה", path: "help", icon: <Help /> },
//     ],
//   },
// ];

// const SiteBar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="right"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: '#f5f5f5', // צבע רקע
//           color: '#1A2035', // צבע טקסט
//           direction: 'rtl',
//         },
//       }}
//     >
//       <Box sx={{ padding: '1rem', textAlign: 'center' }}>
//         <Avatar src={user.image} sx={{ width: '5rem', height: '5rem', margin: 'auto' }} />
//         <Typography variant="h6" component="div" sx={{ color: '#1A2035', fontSize: '1.5rem', fontWeight: 'bold' }}>{user.fullname}</Typography>
//         <Typography variant="body2" sx={{ color: '#757575', fontSize: '1rem' }}>{user.seminary}</Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               <ListItemText primary={cat.title} sx={{ color: '#1A2035', paddingRight: '1rem', fontSize: '1.75rem', fontWeight: 'bold' }} />
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <ListItem 
//                 button 
//                 component={NavLink} 
//                 to={item.path} 
//                 key={subIndex}
//                 exact // Use the exact prop to ensure only the exact path is active
//                 sx={{
//                   paddingRight: '1rem',
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   alignItems: 'center',
//                   gap: '0.5rem', // רווח בין האייקון לטקסט
//                   '&:hover': {
//                     backgroundColor: '#e0e0e0', // צבע רקע בהעברת העכבר
//                   },
//                   '&.active': {
//                     backgroundColor: '#bdbdbd', // צבע רקע כאשר נבחר
//                     fontWeight: 'bold', // הפיכת הטקסט למודגש כאשר נבחר
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: '#1A2035', minWidth: 0 }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.title} sx={{ color: '#1A2035', textAlign: 'right', fontSize: '10rem', fontWeight: 'bold' }} />
//               </ListItem>
//             ))}
//           </div>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         startIcon={<ExitToApp />}
//         sx={{ backgroundColor: '#00bcd4', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '1rem', fontSize: '1.25rem' }}
//       >
//         יציאה
//       </Button>
//     </Drawer>
//   );
// };

// export default SiteBar;




// import React, { useEffect, useState } from 'react';
// import { FaUser } from "react-icons/fa";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Avatar, Typography, Divider, Box } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { 
//   Dashboard, 
//   Person, 
//   Business, 
//   PendingActions, 
//   Settings, 
//   Help, 
//   ExitToApp 
// } from '@mui/icons-material';
// import useAuth from '../../hooks/useAuth';
// import { useSelector } from 'react-redux';

// const drawerWidth = '15rem';  // Decreased drawer width to 22rem

// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם בית ספר",
//   image: "https://via.placeholder.com/50", // URL לדוגמא לתמונה
// };

// const menuItems = [
//   {
//     title: "דפים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "תלמידות", path: "users", icon: <Person /> },
//       { title: "בתי ספר", path: "companies", icon: <Business /> },
//       { title: "פעולות", path: "actions", icon: <PendingActions /> },
//     ],
//   },
//   {
//     title: "משתמש",
//     list: [
//       { title: "הגדרות", path: "settings", icon: <Settings /> },
//       { title: "לבחירת ביה''ס וכיתה", path: "help", icon: <Help /> },
//     ],
//   },
// ];


// const SiteBar = () => {
//   const {roles,company,fullname,image}=useAuth()
//  const [classTeacher,setClassTeacher]=useState("")
//   //cheks if the user role is a teacher and if yes brings the class
//     const { chosenClass } = useSelector((state) => state.schoolAndClass);
//     let classObj
//     useEffect(()=>{
//       if(chosenClass){
//        setClassTeacher(chosenClass)
//       }
//     },[chosenClass])
   
  
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="right"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: '#f5f5f5', // צבע רקע
//           color: '#1A2035', // צבע טקסט
//           direction: 'rtl',
//         },
//       }}
//     >
//       <Box sx={{ padding: '1rem', textAlign: 'center' }}>
//      {image&&   <Avatar src={image} sx={{ width: '5rem', height: '5rem', margin: 'auto' }} />}
//      {!image&&<FaUser sx={{ fontSize: '40px', margin: 'auto' }} />}
//         <Typography variant="h6" component="div" sx={{ color: '#1A2035', fontSize: '1.75rem', fontWeight: 'bold' }}>{fullname}</Typography>
//         <Typography variant="h6" component="div" sx={{ color: '#1A2035', fontSize: '1.75rem', fontWeight: 'bold' }}>{classTeacher}</Typography>
//         {/* <FaUser style={{ fontSize: '50px', color: '#FFEBEB' }} /> */}

//         <Typography variant="body2" sx={{ color: '#757575', fontSize: '1.25rem' }}>{roles}</Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               <ListItemText primary={cat.title} sx={{ color: '#1A2035', paddingRight: '1rem', fontSize: '2rem', fontWeight: 'bold' }} />
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <ListItem 
//                 button 
//                 component={NavLink} 
//                 to={item.path} 
//                 key={subIndex}
//                 exact // Use the exact prop to ensure only the exact path is active
//                 sx={{
//                   paddingRight: '1rem',
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   alignItems: 'center',
//                   gap: '0.5rem', // רווח בין האייקון לטקסט
//                   '&:hover': {
//                     backgroundColor: '#e0e0e0', // צבע רקע בהעברת העכבר
//                   },
//                   '&.active': {
//                     backgroundColor: '#bdbdbd', // צבע רקע כאשר נבחר
//                     fontWeight: 'bold', // הפיכת הטקסט למודגש כאשר נבחר
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: '#1A2035', minWidth: 0 }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.title} sx={{ color: '#1A2035', textAlign: 'right', fontSize: '2rem', fontWeight: 'bold' }} />
//               </ListItem>
//             ))}
//           </div>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         startIcon={<ExitToApp />}
//         sx={{ backgroundColor: '#00bcd4', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '1rem', fontSize: '1.5rem' }}
//       >
//         יציאה
//       </Button>
//     </Drawer>
//   );
// };

// export default SiteBar;



import React, { useState, useEffect } from 'react';
import { FaUser, FaBars } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Avatar, Typography, Divider, Box, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { 
  Dashboard, 
  Person, 
  Business, 
  PendingActions, 
  Settings, 
  Help, 
  ExitToApp 
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const drawerWidth = '15rem';  // רוחב הדפדפן 

const user = {
  username: "username",
  fullname: "שם מלא",
  seminary: "שם בית ספר",
  image: "https://via.placeholder.com/50", // URL לדוגמא לתמונה
};

const menuItems = [
  {
    title: "דפים",
    list: [
      { title: "ראשי", path: "/dash", icon: <Dashboard /> },
      { title: "תלמידות", path: "users", icon: <Person /> },
      { title: "בתי ספר", path: "companies", icon: <Business /> },
      { title: "פעולות", path: "actions", icon: <PendingActions /> },
    ],
  },
  {
    title: "משתמש",
    list: [
      { title: "הגדרות", path: "settings", icon: <Settings /> },
      { title: "לבחירת ביה''ס וכיתה", path: "help", icon: <Help /> },
    ],
  },
];

const SiteBar = () => {
  const { roles, company, fullname, image } = useAuth();
  const [classTeacher, setClassTeacher] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false); // מצב התחלה - לא מצומצם
  const { chosenClass } = useSelector((state) => state.schoolAndClass);
  
  useEffect(() => {
    if (chosenClass) {
      setClassTeacher(chosenClass);
    }
  }, [chosenClass]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: isCollapsed ? '4rem' : drawerWidth, // שינוי הרוחב לפי מצב
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '4rem' : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5', // צבע רקע
          color: '#1A2035', // צבע טקסט
          direction: 'rtl',
        },
      }}
    >
      <Box sx={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <FaBars sx={{ color: '#1A2035' }} />
        </IconButton>
        {image && <Avatar src={image} sx={{ width: '5rem', height: '5rem', margin: '2rem auto 1rem' }} />}
        {!image && <FaUser sx={{ fontSize: '40px', margin: '2rem auto 1rem' }} />}
        {!isCollapsed && (
          <>
            <Typography variant="h6" component="div" sx={{ color: '#1A2035', fontSize: '1.75rem', fontWeight: 'bold' }}>{fullname}</Typography>
            <Typography variant="h6" component="div" sx={{ color: '#1A2035', fontSize: '1.75rem', fontWeight: 'bold' }}>{classTeacher}</Typography>
            <Typography variant="body2" sx={{ color: '#757575', fontSize: '1.25rem' }}>{roles}</Typography>
          </>
        )}
      </Box>
      <Divider />
      <List sx={{ paddingTop: '1rem' }}>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#1A2035', paddingRight: '1rem', fontSize: '2rem', fontWeight: 'bold' }} />}
            </ListItem>
            {cat.list.map((item, subIndex) => (
              <ListItem 
                button 
                component={NavLink} 
                to={item.path} 
                key={subIndex}
                exact 
                sx={{
                  paddingRight: '1rem',
                  marginBottom: '1rem', // רווח בין האייקונים
                  display: 'flex',
                  justifyContent: isCollapsed ? 'center' : 'flex-end', // מיקום אייקון לפי מצב
                  alignItems: 'center',
                  gap: '0.5rem', // רווח בין האייקון לטקסט
                  '&:hover': {
                    backgroundColor: '#e0e0e0', // צבע רקע בהעברת העכבר
                  },
                  '&.active': {
                    backgroundColor: '#bdbdbd', // צבע רקע כאשר נבחר
                    fontWeight: 'bold', // הפיכת הטקסט למודגש כאשר נבחר
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#1A2035', minWidth: 0 }}>{item.icon}</ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.title} sx={{ color: '#1A2035', textAlign: 'right', fontSize: '2rem', fontWeight: 'bold' }} />}
              </ListItem>
            ))}
          </div>
        ))}
      </List>
      {!isCollapsed && (
        <Button
          variant="contained"
          startIcon={<ExitToApp />}
          sx={{ backgroundColor: '#00bcd4', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '1rem', fontSize: '1.5rem' }}
        >
          יציאה
        </Button>
      )}
    </Drawer>
  );
};

export default SiteBar;
