
   
    import { Link, useNavigate } from "react-router-dom";
    import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import NenuLink from "../../sitdebar/NenuLink";
import { PiListPlusLight } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
const SideBarActions = () => {
    const {roles,company,fullname,image}=useAuth()

      const navigate = useNavigate();
      const studentMenuActions = [
        {
            title: "בחנים",
            list: [
              {
                title: "ראשי",
                path:"/dash/actions",
              },
              {
                title: "בחנים",
                path: "wordLsList",
              },
              {
                title: "רשימת משימות",
                path: "wordLsList",
              },
              {
                title:"גיליון ציונים",
                path:"marks"
              },
              {
                title:"בחנים",
                path:"exams"
              }
            ],
          }]
      const teacherMenuActions =
       [ {
          title: "בחנים",
          list: [
            {
              title: "ראשי",
              path: "/dash/actions",
            },
            {
              title: "יצירת בוחן חדש",
              path: "add",
              icon: <PiListPlusLight />
            },
            {
              title: "בחנים",
              path: "wordLsList",
              icon:<GoChecklist/>
            },
          ],
        }]
    const menuItems=roles==="Teacher"?teacherMenuActions:studentMenuActions
      // const user = {
      //   username: "username",
      //   fullname: "שם מלא ",
      //   company: "שם חברה ",
      //   image: "",
      // };
      console.log(menuItems,"menu");

      return (
        <div className="side-bar">
          <div className="side-bar-user">
            <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" />
            {/* <img src={user.image || "/3.png"} alt="" width="50" height="50" /> */}
    
            <div className="side-bar-user-details">
              <span className="side-car-user-username">{fullname} </span>
              {/* <span className="side-car-user-username">{user.fullname} </span> */}
              <span className="side-car-user-title">{company?.name} </span>
              {/* <span className="side-car-user-title">{user.company} </span> */}
              <span className="side-car-user-title">{roles} </span>
              <Link to={"/dash/actions/choose"}>classAndSchool</Link>

            </div>
          </div>
          <ul className="side-bar-menu-list">
    {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="side-bar-menu-cat"> {cat.title} </span>
            {cat.list.map((itme) => (
              <NenuLink itme={itme} key={itme.title} />
            ))}
          </li>
        ))}

          </ul>
          <button  className="side-bar-logout">
          <Link to={"/dash"}>
            יציאה
            </Link>
          </button>
        </div>
      );
    
    };
    
        

export default SideBarActions







// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Button, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled } from '@mui/system';
// import useAuth from "../../../hooks/useAuth";
// import { PiListPlusLight } from "react-icons/pi";
// import { GoChecklist } from "react-icons/go";

// const SideBarActions = () => {
//   const { roles, company, fullname } = useAuth();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const studentMenuActions = [
//     {
//       title: "בחנים",
//       list: [
//         {
//           title: "ראשי",
//           path: "/dash/actions",
//         },
//         {
//           title: "בחנים",
//           path: "wordLsList",
//         },
//       ],
//     }
//   ];

//   const teacherMenuActions = [
//     {
//       title: "בחנים",
//       list: [
//         {
//           title: "ראשי",
//           path: "/dash/actions",
//         },
//         {
//           title: "יצירת בוחן חדש",
//           path: "add",
//           icon: <PiListPlusLight />
//         },
//         {
//           title: "בחנים",
//           path: "wordLsList",
//           icon: <GoChecklist />
//         },
//       ],
//     }
//   ];

//   const menuItems = roles === "Teacher" ? teacherMenuActions : studentMenuActions;

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const StyledButton = styled(Button)(({ theme }) => ({
//     color: 'white',
//     marginLeft: theme.spacing(2),
//     '&:hover': {
//       backgroundColor: theme.palette.primary.light,
//     },
//     '&.active': {
//       backgroundColor: theme.palette.primary.dark,
//     }
//   }));

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           onClick={handleMenuOpen}
//           sx={{ display: { md: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <img src={company?.image || "/logo612.jpg"} alt="" width="50" height="50" style={{ marginRight: '10px' }} />
//           {fullname}
//         </Typography>
//         <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//           {menuItems.map((cat) => (
//             <StyledButton key={cat.title}>
//               {cat.title}
//               {cat.list.map((item) => (
//                 <Link to={item.path} key={item.title} style={{ marginLeft: '10px', color: 'inherit', textDecoration: 'none' }}>
//                   {item.title}
//                 </Link>
//               ))}
//             </StyledButton>
//           ))}
//           <StyledButton>
//             <Link to={"/dash"} style={{ color: 'inherit', textDecoration: 'none' }}>
//               יציאה
//             </Link>
//           </StyledButton>
//         </Box>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           sx={{ display: { xs: 'block', md: 'none' } }}
//         >
//           {menuItems.map((cat) => (
//             <div key={cat.title}>
//               <MenuItem onClick={handleMenuClose}>
//                 {cat.title}
//               </MenuItem>
//               {cat.list.map((item) => (
//                 <MenuItem onClick={handleMenuClose} key={item.title}>
//                   <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
//                     {item.title}
//                   </Link>
//                 </MenuItem>
//               ))}
//             </div>
//           ))}
//           <MenuItem onClick={handleMenuClose}>
//             <Link to={"/dash"} style={{ color: 'inherit', textDecoration: 'none' }}>
//               יציאה
//             </Link>
//           </MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default SideBarActions;
