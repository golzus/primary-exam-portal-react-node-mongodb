// import React from 'react';
// import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import { styled, alpha } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#0d47a1', // צבע ראשי כחול כהה
//     },
//     secondary: {
//       main: '#1565c0', // צבע משני כחול עמוק
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Arial',
//       'Helvetica',
//       'sans-serif',
//     ].join(','),
//   },
// });

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   '& .MuiInputBase-input': {
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.8),
//     padding: '10px 20px',
//     transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
//       duration: theme.transitions.duration.shortest,
//     }),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 1),
//     },
//   },
// }));

// const Navbar = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="static" style={{ backgroundColor: '#0d47a1' }}>
//         <Toolbar>
//           <div className="navbar-title" style={{ flexGrow: 1, color: '#ffffff' }}>
//             ראשי
//           </div>
//           <div className="navbar-search" style={{ display: 'flex', alignItems: 'center' }}>
//             <MdSearch style={{ color: '#ffffff', marginRight: '10px' }} />
//             <StyledInputBase
//               placeholder="חיפוש..."
//               inputProps={{ 'aria-label': 'search' }}
//               style={{ color: '#ffffff' }}
//             />
//           </div>
//           <div className="navbar-icons">
//             <IconButton aria-label="הצג 5 התראות חדשות" color="inherit">
//               <Badge badgeContent={5} color="secondary">
//                 <MdNotifications size={20} style={{ color: '#ffffff' }} />
//               </Badge>
//             </IconButton>
//             <IconButton aria-label="הצג צ'אט" color="inherit">
//               <MdOutlineChat size={20} style={{ color: '#ffffff' }} />
//             </IconButton>
//             <IconButton aria-label="הצג ציבור" color="inherit">
//               <MdPublic size={20} style={{ color: '#ffffff' }} />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   );
// };

// export default Navbar;



import React from 'react';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8b0000', // Dark red primary color
    },
    secondary: {
      main: '#e91e63', // Pink secondary color
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
    backgroundColor: '#ffffff', // צבע לבן
    color: '#000000', // צבע טקסט שחור
    padding: '10px 20px',
    paddingLeft: '40px', // מקום לאייקון
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&::placeholder': {
      color: '#aaaaaa', // צבע של טקסט חיפוש
    },
  },
}));

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: '#9B153B' }}>
        <Toolbar>
          <div className="navbar-title" style={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
            ראשי
          </div>
          <div className="navbar-search" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MdSearch style={{ position: 'absolute', left: '10px', color: '#e91e63' }} />
            <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className="navbar-icons">
            <IconButton aria-label="הצג 5 התראות חדשות" color="inherit">
              <Badge badgeContent={5} color="secondary">
                <MdNotifications size={20} style={{ color: '#ffffff' }} />
              </Badge>
            </IconButton>
            <IconButton aria-label="הצג צ'אט" color="inherit">
              <MdOutlineChat size={20} style={{ color: '#ffffff' }} />
            </IconButton>
            <IconButton aria-label="הצג ציבור" color="inherit">
              <MdPublic size={20} style={{ color: '#ffffff' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;



//#9B153B