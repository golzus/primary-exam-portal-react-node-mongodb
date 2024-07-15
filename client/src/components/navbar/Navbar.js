// import{
//   MdNotifications,
//   MdOutlineChat,
//   MdPublic,
//   MdSearch,
// } from "react-icons/md"
// import "./navbar.css"
// const Navbar = () => {
//   return (
//   <div className="navbar">
//     <div className="navbar-title">
// ראשי
//     </div>
//     <div className="navbar-manu">
//       <div className="navbar-search">
//         <MdSearch/>
//         <input 
//         type="text" 
//         placeholder="Search..." 
//         className="navbar-input"/>

//       </div>
//       <div className="navbar-icons">
//         <MdOutlineChat size={20} />
//         <MdNotifications size={20}/>
//         <MdPublic size={20}/>

//         </div>
//     </div>
//   </div>
//   )
// }

// export default Navbar

import React from 'react';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // צבע ראשי כחול בהיר
    },
    secondary: {
      main: '#ffd740', // צבע משני צהוב
    },
  },
  typography: {
    fontFamily: [
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    padding: '10px 20px',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
  },
}));

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: '#f5f5f5' }}>
        <Toolbar>
          <div className="navbar-title" style={{ flexGrow: 1 }}>
            ראשי
          </div>
          <div className="navbar-search" style={{ display: 'flex', alignItems: 'center' }}>
            <MdSearch style={{ marginRight: '10px' }} />
            <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className="navbar-icons">
            <IconButton aria-label="show 4 new notifications" color="inherit">
              <Badge badgeContent={5} color="secondary">
                <MdNotifications size={20} />
              </Badge>
            </IconButton>
            <IconButton aria-label="show chat" color="inherit">
              <MdOutlineChat size={20} />
            </IconButton>
            <IconButton aria-label="show public" color="inherit">
              <MdPublic size={20} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
