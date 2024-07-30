import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaSchool } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box, IconButton, Collapse } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dashboard, Person, Business, PendingActions, Settings, Help, ExitToApp, Quiz, Assignment, School, Star, ListAlt } from '@mui/icons-material';
import { PiListPlusLight } from 'react-icons/pi';
import { GoChecklist } from 'react-icons/go';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import useSchoolAndClass from '../../hooks/useSchoolAndClass';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'; // triangle icons

const user = {
  username: "username",
  fullname: "שם מלא",
  seminary: "שם בית ספר",
  image: "https://via.placeholder.com/50",
};

const teacherMenuActions = [
  {
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

const actions = [
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
      { title: "ראשי", path: "/dash/actions", icon: <Dashboard /> },
      { title: "בחנים", path: "wordLsList", icon: <Quiz /> },
      { title: "רשימת משימות", path: "todos", icon: <ListAlt /> },
      { title: "גיליון ציונים", path: "marks", icon: <Star /> },
    ],
  },
  {
    title: "אישי",
    list: [
      { title: "הפרטים שלי", path: "PersonalDetails", icon: <Person /> },
    ],
  },
];

const SiteBar = () => {
  const { roles, classUser, fullname, image } = useAuth();
  const menuItems = roles === 'Teacher' ? teacherMenuActions : studentMenuActions;
  const [classTeacher, setClassTeacher] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { chosenClass } = useSelector((state) => state.schoolAndClass);
  let { chosenNameClass, chosenNameSchool } = useSchoolAndClass();

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

  if (roles === "Student") {
    chosenNameClass = classUser.name;
  }

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
          maxHeight: '100%',
        },
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
              width: '10vw',
              height: '10vw',
              maxWidth: '7rem',
              maxHeight: '7rem',
              margin: '0 auto 1rem',
            }}
          />
        ) : (
          <FaSchool style={{ fontSize: '2rem', color: '#9B153B', margin: '0 auto 1rem' }} />
        )}
        {!isCollapsed && (
          <>
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '1rem', fontWeight: 'bold' }}>
              {chosenNameSchool}
            </Typography>
            <Typography variant="h7" component="div" sx={{ color: '#9B153B', fontSize: '0.9rem', fontWeight: 'bold' }}>
              {chosenNameClass}
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <FaUser style={{ fontSize: '1rem', color: '#9B153B' }} />
          <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {fullname}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#9B153B' }} />
      <List>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '0rem', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'right' }} />}
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
                      backgroundColor: '#f8bbd0',
                    },
                    '&.active': {
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      color: '#fff',
                      backgroundColor: 'transparent', // No background color for active
                    },
                  }}
                  onClick={item.isAction ? toggleSubMenu : undefined}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                    {React.cloneElement(item.icon, { fontSize: 'medium' })}
                  </ListItemIcon>
                  {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold' }} />}
                  {item.isAction && (
                    <IconButton
                      onClick={toggleSubMenu}
                      sx={{ 
                        marginLeft: 'auto', 
                        color: '#9B153B', 
                        fontSize: '1rem' 
                      }}
                    >
                      {isSubMenuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                    </IconButton>
                  )}
                </ListItem>
                {item.isAction && (
                  <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ backgroundColor: '#f3f3e9', color: '#9B153B', paddingLeft: '1rem' }}>
                      {actions.map((actionCat, actionIndex) => (
                        <div key={actionIndex}>
                          {actionCat.list.map((actionItem, actionIndex) => (
                            <ListItem
                              button
                              key={actionIndex}
                              component={NavLink}
                              to={actionItem.path}
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
                                  fontWeight: 'bold',
                                  fontSize: '0.9rem',
                                  color: '#fff',
                                  backgroundColor: 'transparent', // No background color for active
                                },
                              }}
                            >
                              <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                                {React.cloneElement(actionItem.icon, { fontSize: 'medium' })}
                              </ListItemIcon>
                              {!isCollapsed && <ListItemText primary={actionItem.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold' }} />}
                            </ListItem>
                          ))}
                        </div>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
            <Divider sx={{ borderColor: '#9B153B', margin: '1rem 0' }} />
          </div>
        ))}
      </List>
      <Box sx={{ textAlign: 'center', marginTop: 'auto', marginBottom: '1rem' }}>
        <IconButton component={NavLink} to="/logout" sx={{ color: '#9B153B' }}>
          <ExitToApp fontSize="large" />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default SiteBar;


