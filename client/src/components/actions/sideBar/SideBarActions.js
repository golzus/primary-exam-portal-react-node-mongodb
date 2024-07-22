
   


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
        { title: "בחנים", path: "actions/wordLsList", icon: <Quiz /> }, // Quiz icon for tests
        { title: "רשימת משימות", path: "actions/wordLsList", icon: <ListAlt /> }, // List icon for task list
        { title: "גיליון ציונים", path: "actions/marks", icon: <Star /> }, // Star icon for grades (representing excellence)
      ],
    },
    {
      title: "אישי",
      list: [
        { title: "הפרטים שלי",path: "PersonalDetails", icon: <Person /> }, // Person icon for personal details
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
                button
                component={NavLink}
                to={item.path}
                key={subIndex}
                exact
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
