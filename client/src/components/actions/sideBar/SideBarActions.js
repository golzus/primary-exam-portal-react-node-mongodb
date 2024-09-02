
   
//     import { Link, useNavigate } from "react-router-dom";
//     import { useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";
// import NenuLink from "../../sitdebar/NenuLink";
// import { PiListPlusLight } from "react-icons/pi";
// import { GoChecklist } from "react-icons/go";
// const SideBarActions = () => {
//     const {roles,company,fullname,image}=useAuth()

//       const navigate = useNavigate();
//       const studentMenuActions = [
//         {
//             title: "בחנים",
//             list: [
//               {
//                 title: "ראשי",
//                 path:"/dash/actions",
//               },
//               {
//                 title: "בחנים",
//                 path: "wordLsList",
//               },
//               {
//                 title: "רשימת משימות",
//                 path: "wordLsList",
//               },
//               {
//                 title:"גיליון ציונים",
//                 path:"marks"
//               },
//               {
//                 title:"בחנים",
//                 path:"exams"
//               }
//             ],
//           }]
//       const teacherMenuActions =
//        [ {
//           title: "בחנים",
//           list: [
//             {
//               title: "ראשי",
//               path: "/dash/actions",
//             },
//             {
//               title: "יצירת בוחן חדש",
//               path: "add",
//               icon: <PiListPlusLight />
//             },
//             {
//               title: "בחנים",
//               path: "wordLsList",
//               icon:<GoChecklist/>
//             },
//           ],
//         }]
//     const menuItems=roles==="Teacher"?teacherMenuActions:studentMenuActions
//       // const user = {
//       //   username: "username",
//       //   fullname: "שם מלא ",
//       //   company: "שם חברה ",
//       //   image: "",
//       // };
//       console.log(menuItems,"menu");

//       return (
//         <div className="side-bar">
//           <div className="side-bar-user">
//             <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" />
//             {/* <img src={user.image || "/3.png"} alt="" width="50" height="50" /> */}
    
//             <div className="side-bar-user-details">
//               <span className="side-car-user-username">{fullname} </span>
//               {/* <span className="side-car-user-username">{user.fullname} </span> */}
//               <span className="side-car-user-title">{company?.name} </span>
//               {/* <span className="side-car-user-title">{user.company} </span> */}
//               <span className="side-car-user-title">{roles} </span>
//               <Link to={"/dash/actions/choose"}>classAndSchool</Link>

//             </div>
//           </div>
//           <ul className="side-bar-menu-list">
//     {menuItems.map((cat) => (
//           <li key={cat.title}>
//             <span className="side-bar-menu-cat"> {cat.title} </span>
//             {cat.list.map((itme) => (
//               <NenuLink itme={itme} key={itme.title} />
//             ))}
//           </li>
//         ))}

//           </ul>
//           <button  className="side-bar-logout">
//           <Link to={"/dash"}>
//             יציאה
//             </Link>
//           </button>
//         </div>
//       );
    
//     };
    
        

// export default SideBarActions







// // import React, { useState } from 'react';
// // import { Link } from "react-router-dom";
// // import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Button, Typography } from '@mui/material';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import { styled } from '@mui/system';
// // import useAuth from "../../../hooks/useAuth";
// // import { PiListPlusLight } from "react-icons/pi";
// // import { GoChecklist } from "react-icons/go";

// // const SideBarActions = () => {
// //   const { roles, company, fullname } = useAuth();
// //   const [anchorEl, setAnchorEl] = useState(null);

// //   const studentMenuActions = [
// //     {
// //       title: "בחנים",
// //       list: [
// //         {
// //           title: "ראשי",
// //           path: "/dash/actions",
// //         },
// //         {
// //           title: "בחנים",
// //           path: "wordLsList",
// //         },
// //       ],
// //     }
// //   ];

// //   const teacherMenuActions = [
// //     {
// //       title: "בחנים",
// //       list: [
// //         {
// //           title: "ראשי",
// //           path: "/dash/actions",
// //         },
// //         {
// //           title: "יצירת בוחן חדש",
// //           path: "add",
// //           icon: <PiListPlusLight />
// //         },
// //         {
// //           title: "בחנים",
// //           path: "wordLsList",
// //           icon: <GoChecklist />
// //         },
// //       ],
// //     }
// //   ];

// //   const menuItems = roles === "Teacher" ? teacherMenuActions : studentMenuActions;

// //   const handleMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const StyledButton = styled(Button)(({ theme }) => ({
// //     color: 'white',
// //     marginLeft: theme.spacing(2),
// //     '&:hover': {
// //       backgroundColor: theme.palette.primary.light,
// //     },
// //     '&.active': {
// //       backgroundColor: theme.palette.primary.dark,
// //     }
// //   }));

// //   return (
// //     <AppBar position="static">
// //       <Toolbar>
// //         <IconButton
// //           edge="start"
// //           color="inherit"
// //           aria-label="menu"
// //           onClick={handleMenuOpen}
// //           sx={{ display: { md: 'none' } }}
// //         >
// //           <MenuIcon />
// //         </IconButton>
// //         <Typography variant="h6" sx={{ flexGrow: 1 }}>
// //           <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" style={{ marginRight: '10px' }} />
// //           {fullname}
// //         </Typography>
// //         <Box sx={{ display: { xs: 'none', md: 'block' } }}>
// //           {menuItems.map((cat) => (
// //             <StyledButton key={cat.title}>
// //               {cat.title}
// //               {cat.list.map((item) => (
// //                 <Link to={item.path} key={item.title} style={{ marginLeft: '10px', color: 'inherit', textDecoration: 'none' }}>
// //                   {item.title}
// //                 </Link>
// //               ))}
// //             </StyledButton>
// //           ))}
// //           <StyledButton>
// //             <Link to={"/dash"} style={{ color: 'inherit', textDecoration: 'none' }}>
// //               יציאה
// //             </Link>
// //           </StyledButton>
// //         </Box>
// //         <Menu
// //           anchorEl={anchorEl}
// //           open={Boolean(anchorEl)}
// //           onClose={handleMenuClose}
// //           sx={{ display: { xs: 'block', md: 'none' } }}
// //         >
// //           {menuItems.map((cat) => (
// //             <div key={cat.title}>
// //               <MenuItem onClick={handleMenuClose}>
// //                 {cat.title}
// //               </MenuItem>
// //               {cat.list.map((item) => (
// //                 <MenuItem onClick={handleMenuClose} key={item.title}>
// //                   <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
// //                     {item.title}
// //                   </Link>
// //                 </MenuItem>
// //               ))}
// //             </div>
// //           ))}
// //           <MenuItem onClick={handleMenuClose}>
// //             <Link to={"/dash"} style={{ color: 'inherit', textDecoration: 'none' }}>
// //               יציאה
// //             </Link>
// //           </MenuItem>
// //         </Menu>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default SideBarActions;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box, IconButton } from '@mui/material';
import { PiListPlusLight } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material'; // Import ExitToApp icon from MUI

import { 
  Star,
  ListAlt,
  Dashboard, 
  Person, 
  Business, 
  PendingActions, 
  Settings, 
  Help, 
  
   Quiz, Assignment, School, Info } 
from '@mui/icons-material';
const drawerWidth = 260;

const SideBarActions = () => {
  const { roles, company, fullname, image } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);



  // const studentMenuActions = [
  //   {
  //     title: "בחנים",
  //     list: [
  //       { title: "ראשי", path: "/dash/actions", icon: <Quiz /> },
  //       { title: "בחנים", path: "actions/wordLsList", icon: <Assignment /> },
  //       { title: "רשימת משימות", path: "actions/wordLsList", icon: <Assignment /> },
  //       { title: "גיליון ציונים", path: "actions/marks", icon: <School /> },
  //     ],
  //   },
  //   {
  //     title: "אישי",
  //     list: [
  //       { title: "הפרטים שלי", icon: <Person /> },
  //     ],
  //   },
  // ];
  
  const studentMenuActions = [
    {
      title: "בחנים",
      list: [
        { title: "ראשי", path: "/dash/actions", icon: <Dashboard /> }, // Dashboard icon for main
        { title: "בחנים", path: "wordLsList", icon: <Quiz /> }, // Quiz icon for tests
        { title: "רשימת משימות", path: "todos", icon: <ListAlt /> }, // List icon for task list
        { title: "גיליון ציונים", path: "marks", icon: <Star /> }, // Star icon for grades (representing excellence)
      ],
    },
    {
      title: "אישי",
      list: [
        { title: "הפרטים שלי",path: "personalldetails", icon: <Person /> }, // Person icon for personal details
      ],
    },
  ];
  
  

  const teacherMenuActions = [
    {
      title: "בחנים",
      list: [
        { title: "ראשי", path: "/dash/actions" },
        { title: "יצירת בוחן חדש", path: "add", icon: <PiListPlusLight /> },
        { title: "בחנים", path: "wordLsList", icon: <GoChecklist /> }
      ]
    }
  ];

  const menuItems = roles === "Teacher" ? teacherMenuActions : studentMenuActions;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: isCollapsed ? '4rem' : {
          xs: '70vw',
          sm: '40vw',
          md: '25vw',
          lg: '17rem',
        },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '4rem' : {
            xs: '70vw',
            sm: '40vw',
            md: '25vw',
            lg: '17rem',
          },
          boxSizing: 'border-box',
          backgroundColor: '#f3f3e9',
          color: '#9B153B',
          direction: 'rtl',
        }
      }}
    >
      
      <Box sx={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <FaBars style={{ color: '#9B153B' }} />
        </IconButton>
        {image ? (
          <Avatar
            src={image}
            sx={{
              width: { xs: '5rem', md: '6rem', lg: '7rem' },
              height: { xs: '5rem', md: '6rem', lg: '7rem' },
              margin: '2rem auto 1rem'
            }}
          />
        ) : (
          <FaUser style={{ fontSize: '40px', margin: '2rem auto 1rem', color: '#9B153B' }} />
        )}
        {!isCollapsed && (
          <>
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' }}>{fullname}</Typography>
            <Typography variant="body1" sx={{ color: '#9B153B', fontSize: '1rem' }}>{roles}</Typography>
          </>
        )}
      </Box>
      
      <Divider sx={{ borderColor: '#9B153B' }} />
      <List sx={{ paddingTop: '1rem' }}>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }} />}
            </ListItem>
            {cat.list.map((item, subIndex) => (
              <ListItem
                component={NavLink}
                to={item.path}
                key={subIndex}
                exact="true" // שינוי זה ממיר את הערך למחרוזת

                sx={{
                  paddingRight: '1rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  alignItems: 'center',
                  gap: '0.5rem',
                  '&:hover': {
                    backgroundColor: '#f8bbd0',
                  },
                  '&.active': {
                    backgroundColor: '#c2185b',
                    fontWeight: 'bold',
                    color: '#ffffff',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>{item.icon}</ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '1.25rem', fontWeight: 'bold' }} />}
              </ListItem>
            ))}
          </div>
        ))}
      </List>
      {!isCollapsed && (
        <IconButton
          component={NavLink}
          to="/dash"
          sx={{ color: '#9B153B', width: '100%', textAlign: 'center', marginTop: 'auto', marginBottom: '2rem' }}
        >
          <ExitToApp fontSize="large" />
        </IconButton>
      )}
    </Drawer>
  );
};

export default SideBarActions;
