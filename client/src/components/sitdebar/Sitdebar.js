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

const drawerWidth = '15rem';

const user = {
  username: "username",
  fullname: "שם מלא",
  seminary: "שם בית ספר",
  image: "https://via.placeholder.com/50", // Placeholder URL for image
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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
        width: isCollapsed ? '4rem' : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '4rem' : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#283593', // Indigo background color
          color: '#ffffff', // White text color
          direction: 'rtl',
        },
      }}
    >
      <Box sx={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <FaBars style={{ color: '#ffffff' }} />
        </IconButton>
        {image ? (
          <Avatar src={image} sx={{ width: '5rem', height: '5rem', margin: '2rem auto 1rem' }} />
        ) : (
          <FaUser style={{ fontSize: '40px', margin: '2rem auto 1rem' }} />
        )}
        {!isCollapsed && (
          <>
            <Typography variant="h6" component="div" sx={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' }}>{fullname}</Typography>
            <Typography variant="h6" component="div" sx={{ color: '#ffffff', fontSize: '1rem', fontWeight: 'bold' }}>{classTeacher}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff', fontSize: '1rem' }}>{roles}</Typography>
          </>
        )}
      </Box>
      <Divider />
      <List sx={{ paddingTop: '2rem' }}>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#ffffff', paddingRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }} />}
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
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  alignItems: 'center',
                  gap: '0.5rem',
                  '&:hover': {
                    backgroundColor: '#5c6bc0', // Light blue background on hover
                  },
                  '&.active': {
                    backgroundColor: '#1a237e', // Darker indigo background color for active link
                    fontWeight: 'bold',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ffffff', minWidth: 0 }}>{item.icon}</ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.title} sx={{ color: '#ffffff', textAlign: 'right', fontSize: '1.25rem', fontWeight: 'bold' }} />}
              </ListItem>
            ))}
          </div>
        ))}
      </List>
      {!isCollapsed && (
        <Button
          variant="contained"
          startIcon={<ExitToApp />}
          sx={{ backgroundColor: '#ff7043', color: 'white', width: '80%', margin: 'auto', display: 'flex', marginTop: 'auto', marginBottom: '2rem', fontSize: '1rem' }}
        >
          יציאה
        </Button>
      )}
    </Drawer>
  );
};

export default SiteBar;
