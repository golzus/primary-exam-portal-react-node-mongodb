import React, { useState, useEffect } from 'react';
import { FaUser, FaBars } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box, IconButton, Collapse } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LuSchool2 } from "react-icons/lu";
import { LiaSchoolSolid } from "react-icons/lia";
import { PiListPlusLight } from 'react-icons/pi';
import { GoChecklist } from 'react-icons/go';
// import useAuth from "../../../../hooks/useAuth";
import { School as SchoolIcon, Class as ClassIcon, ExitToApp, Dashboard, Person, Business, Settings, Help, Quiz, Assignment, PendingActions } from '@mui/icons-material';
import { useSelector } from 'react-redux'; // ודא שהחבילה מותקנת וייבוא נכון
import useAuth from '../../hooks/useAuth';
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
      { title: "פעולות", path: "#", icon: <PendingActions />, isAction: true },
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

const teacherMenuActions = [
  {
    title: "בחנים",
    list: [
      { title: "יצירת בוחן חדש", path: "actions/add", icon: <PiListPlusLight /> },
      { title: "בחנים", path: "actions/wordLsList", icon: <GoChecklist /> },
    ],
  },
];

const studentMenuActions = [
  {
    title: "בחנים",
    list: [
      { title: "ראשי", path: "/dash/actions", icon: <Quiz /> },
      { title: "בחנים", path: "actions/wordLsList", icon: <Assignment /> },
      { title: "רשימת משימות", path: "actions/wordLsList", icon: <Assignment /> },
      { title: "גיליון ציונים", path: "actions/marks", icon: <SchoolIcon /> },
    ],
  },
  {
    title: "אישי",
    list: [
      { title: "הפרטים שלי", icon: <Person /> },
    ],
  },
];

// הוסף את actionCategories כאן
const actionCategories = [
  {
    title: "פעולות נוספות",
    list: [
      { title: "הוספת תלמיד", path: "/actions/add-student", icon: <PiListPlusLight /> },
      { title: "רשימת תלמידים", path: "/actions/student-list", icon: <GoChecklist /> },
    ],
  },
];

const SiteBar = () => {
  const { roles, company, fullname, image } = useAuth();
  const [classTeacher, setClassTeacher] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { chosenClass, chosenNameSchool,chosenNameClass } = useSelector((state) => state.schoolAndClass);

  useEffect(() => {
    if (chosenClass) {
      setClassTeacher(chosenClass);
    }
  }, [chosenClass]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: isCollapsed ? '4rem' : '14vw',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '4rem' : '14vw',
          boxSizing: 'border-box',
          backgroundColor: '#f3f3e9',
          color: '#9B153B',
          direction: 'rtl',
        },
      }}
    >
      <Box sx={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <FaBars style={{ color: '#9B153B' }} />
        </IconButton>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <img 
            src='/logo.png' 
            style={{ 
              height: isCollapsed ? '50px' : '100px', 
              marginRight: '8px',
              transition: 'height 0.3s ease-in-out'
            }} 
          />
        </Box>
        {image ? (
          <Avatar
            src={image}
            sx={{
              width: '10vw',
              height: '10vw',
              maxWidth: '7rem',
              maxHeight: '7rem',
              margin: '0 auto 1rem',
            }}
          />
        ) : (
          <FaUser style={{ fontSize: '10vw', maxWidth: '40px', maxHeight: '40px', color: '#9B153B', margin: '0 auto 1rem' }} />
        )}
        {!isCollapsed && (
          <>
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {fullname}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <LuSchool2 style={{ fontSize: '1rem' }} />
              <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {chosenNameSchool}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <LiaSchoolSolid style={{ fontSize: '1rem' }} />
              <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {chosenNameClass}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#9B153B', fontSize: '1.1rem' }}>
              {roles}
            </Typography>
          </>
        )}
      </Box>
      <Divider sx={{ borderColor: '#9B153B' }} />
      <List sx={{ paddingTop: '1rem' }}>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }} />}
            </ListItem>
            {cat.list.map((item, subIndex) => (
              <div key={subIndex}>
                <ListItem
                  button
                  component={NavLink}
                  to={item.path}
                  exact
                  sx={{
                    paddingRight: '1rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    alignItems: 'center',
                    gap: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#f8bbd0', // Light pink background on hover
                    },
                    '&.active': {
                      backgroundColor: '#c2185b', // Dark pink background color for active link
                      fontWeight: 'bold',
                      color: '#ffffff', // White text color when active
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }} />}
                </ListItem>
                {item.isAction && (
                  <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {actionCategories.map((actionCat, actionIndex) => (
                        <div key={actionIndex}>
                          <ListItem>
                            {!isCollapsed && <ListItemText primary={actionCat.title} sx={{ color: '#9B153B', paddingRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }} />}
                          </ListItem>
                          {actionCat.list.map((subItem, subIndex) => (
                            <ListItem
                              button
                              key={subIndex}
                              component={NavLink}
                              to={subItem.path}
                              sx={{
                                paddingRight: '3rem',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                                alignItems: 'center',
                                gap: '0.5rem',
                                '&:hover': {
                                  backgroundColor: '#f8bbd0', // Light pink background on hover
                                },
                                '&.active': {
                                  backgroundColor: '#c2185b', // Dark pink background color for active link
                                  fontWeight: 'bold',
                                  color: '#ffffff', // White text color when active
                                },
                              }}
                            >
                              <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                                {React.cloneElement(subItem.icon, { fontSize: 'medium' })} {/* Adjust icon size */}
                              </ListItemIcon>
                              {!isCollapsed && <ListItemText primary={subItem.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }} />}
                            </ListItem>
                          ))}
                        </div>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </div>
        ))}
        {roles.includes("מורה") && (
          <>
            <Divider sx={{ borderColor: '#9B153B', marginTop: '1rem' }} />
            {teacherMenuActions.map((cat, index) => (
              <div key={index}>
                <ListItem>
                  {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }} />}
                </ListItem>
                {cat.list.map((item, subIndex) => (
                  <ListItem button key={subIndex} component={NavLink} to={item.path} sx={{ color: '#9B153B' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.title} />}
                  </ListItem>
                ))}
              </div>
            ))}
          </>
        )}
      </List>
      {!isCollapsed && (
        <IconButton
          component={NavLink}
          to="/logout"
          sx={{ color: '#9B153B', width: '100%', textAlign: 'center', marginTop: 'auto', marginBottom: '2rem' }}
        >
          <ExitToApp fontSize="large" />
        </IconButton>
      )}
    </Drawer>
  );
};

export default SiteBar;
