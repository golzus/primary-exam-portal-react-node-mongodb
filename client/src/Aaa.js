import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { Home, Quiz, Assignment, Grade, Notifications } from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          מערכת ניהול למידה
        </Typography>
        <Button
          color="inherit"
          startIcon={<Home />}
          sx={{ mx: 1, '&:hover': { bgcolor: '#5c6bc0' } }}
        >
          ראשי
        </Button>
        <Button
          color="inherit"
          startIcon={<Quiz />}
          sx={{ mx: 1, '&:hover': { bgcolor: '#5c6bc0' } }}
        >
          בחנים
        </Button>
        <Button
          color="inherit"
          startIcon={<Assignment />}
          sx={{ mx: 1, '&:hover': { bgcolor: '#5c6bc0' } }}
        >
          מטלות
        </Button>
        <Button
          color="inherit"
          startIcon={<Grade />}
          sx={{ mx: 1, '&:hover': { bgcolor: '#5c6bc0' } }}
        >
          גליון ציונים
        </Button>
        <IconButton
          color="inherit"
          onClick={handleMenu}
          sx={{ mx: 1, '&:hover': { bgcolor: '#5c6bc0' } }}
        >
          <Notifications />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleClose}>Notification 3</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
