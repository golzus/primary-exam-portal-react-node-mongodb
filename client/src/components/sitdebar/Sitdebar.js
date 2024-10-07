
import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaSchool } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, IconButton, Collapse, Tooltip } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dashboard, Person, Business, ExitToApp, Quiz, ListAlt, Star } from '@mui/icons-material';
import { PiListPlusLight } from 'react-icons/pi';
import { GoChecklist } from 'react-icons/go';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import useSchoolAndClass from '../../hooks/useSchoolAndClass';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaChartLine } from 'react-icons/fa';
import { useSendLoguotMutation } from '../../features/auth/authApiSlice';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { MdSportsEsports } from 'react-icons/md';
import { HelpOutline, FilterAlt } from '@mui/icons-material';
import { ChatBubbleOutline } from '@mui/icons-material';
import { Book } from '@mui/icons-material';
import { FaBook } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { BsFillChatRightDotsFill } from "react-icons/bs";

const teacherMenuActions = [
  {
    list: [
      { title: "ראשי", path: "/dash", icon: <Dashboard /> },
      { title: "תלמידות", path: "users", icon: <Person /> },
      { title: "בתי ספר", path: "companies", icon: <Business /> },
      { title: "פעולות", path: "#", icon: null, isAction: true },
    ],
  },

  {
    title: "משתמש",
    list: [
      { title: "הוראות", path: "instructions", icon: <HelpOutline /> },
      { title: "לבחירת ביה''ס וכיתה", path: "choose-school-and-class", icon: <FilterAlt /> },
    ],
  },
];

const actions = [
  {
    list: [
      { title: "יצירת בוחן חדש", path: "add-test", icon: <PiListPlusLight /> },
      { title: "בחנים", path: "wordsList", icon: <GoChecklist /> },
    ],
  },
];

const studentMenuActions = [
  {
    title: "בחנים",
    list: [
      { title: "ראשי", path: "/dash", icon: <Dashboard /> },
      { title: "בחנים", path: "wordsList", icon: <FaBook /> },
      { title: "בחנים שהושלמו", path: "todos", icon: <FaCheckCircle /> },
      // { title: "גיליון ציונים", path: "marks", icon: <Star /> },
      { title: "משחקים", path: "play", icon: < MdSportsEsports /> },
      { title: "גרפים", path: "graphs", icon: <FaChartLine /> },
      { title: "טיפים לדיבור באנגלית", path: "tips", icon: <ChatBubbleOutline /> },
      { title:"כללי דקדוק", path: "gramar-rules", icon: <Book /> },
      // { title:"התכתבות עם המורה", path: "comments", icon: <BsFillChatRightDotsFill /> },

    ],



  },
  {
    title: "אישי",
    list: [
      { title: "הפרטים שלי", path: "personalldetails", icon: <Person /> },
      { title: "הוראות", path: "student-instruction", icon: <HelpOutline /> },
    ],
  },
];

const SiteBar = () => {
  const [logout, { IsSucsses, data,isLoading }] = useSendLoguotMutation();
  const { roles, classUser, fullname, image } = useAuth();
  const menuItems = roles === 'Teacher' ? teacherMenuActions : studentMenuActions;
  const [classTeacher, setClassTeacher] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 900);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { chosenClass } = useSelector((state) => state.schoolAndClass);
  let { chosenNameClass, chosenNameSchool } = useSchoolAndClass();

  useEffect(() => {
    if (chosenClass) {
      setClassTeacher(chosenClass);
    }
  }, [chosenClass]);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  if (roles === "Student") {
    chosenNameClass = classUser.name;
  }
const navigate=useNavigate()

  const handleLogout = async () => {

    try {

      await logout();
        navigate('/') // הנח שהפונקציה logout מבוצעת בצורה אסינכרונית
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: isCollapsed ? '50px' : '200px', // שינוי רוחב לפי פיקסלים
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '50px' : '200px', // שינוי רוחב המגירה
          boxSizing: 'border-box',
          backgroundColor: '#f3f3e9',
          color: '#9B153B',
          direction: 'rtl',
          maxHeight: '100%',
          overflowY: 'auto', // הוספת גלילה בעת גלישת תוכן
        },
      }}
    >
      <Box sx={{ padding: '0.5rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={!isCollapsed?{ position:'absolute',top: 0, right: 0 }:{}}>
          <FaBars style={{ color: '#9B153B'  }} />
        </IconButton>
        {!isCollapsed && (
          <>
            {roles === "Student" ? (
              <FaUser style={{ fontWeight: 'bold', fontSize: '1.9rem', color: '#9B153B', margin: '0 auto 0.5rem' }} />
            ) : (
              <FaUserTie style={{ fontSize: '1.5rem', color: '#9B153B', margin: '0 auto 0.5rem' }} />
            )}
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '1rem', fontWeight: 'bold' }}>
              {fullname}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {chosenNameSchool && (
                <>
                  <FaSchool style={{ fontSize: '1rem', color: '#9B153B' }} />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: '#9B153B',
                      fontSize: '0.7rem',
                      fontWeight: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chosenNameSchool}
                  </Typography>
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {chosenNameClass && (
                <>
                  <FaChalkboardTeacher style={{ fontSize: '1rem', color: '#9B153B' }} />
                  <Typography
                    variant="h7"
                    component="div"
                    sx={{
                      color: '#9B153B',
                      fontSize: '0.6rem',
                      fontWeight: 'normal',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chosenNameClass}
                  </Typography>
                </>
              )}
            </Box>
          </>
        )}

      </Box>
   


      {isCollapsed && <Box sx={{  padding: '0.5rem', textAlign: 'center' }}>
        <Typography
        title={`שם: ${fullname}`}>
          {roles === 'Student' && <FaUser style={{ fontSize: '1rem', color: '#9B153B'}} />}
          {roles === 'Teacher' && <FaUserTie style={{ fontSize: '1rem', color: '#9B153B' }} />
          }
        </Typography>
        <Typography title={`בית ספר: ${chosenNameSchool}`}>
          {chosenNameSchool && <FaSchool style={{ fontSize: '1rem', color: '#9B153B' }} />}
        </Typography>
        <Typography title={`כיתה: ${chosenNameClass}`}>
          {chosenNameClass&&<FaChalkboardTeacher style={{ fontSize: '1rem', color: '#9B153B' }} />}
        </Typography>
      </Box>
      }

      <Divider sx={{ borderColor: '#9B153B' }} />
      <List>
        {menuItems.map((cat, index) => (
          <div key={index}>
            <ListItem>
              {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '0rem', fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'right' }} />}
            </ListItem>
            {cat.list.map((item, subIndex) => (
              <div key={subIndex}>
                <Tooltip title={isCollapsed ? item.title : ''} placement="right">
                  <ListItem
                    component={NavLink}
                    to={item.path}
                    exact="true" // שינוי זה ממיר את הערך למחרוזת

                    sx={{
                      paddingRight: '0.5rem',
                      marginBottom: '0rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      '&.active': {
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        color: '#fff',
                        backgroundColor: '#9B153B',
                      },
                      '&:hover': {
                        backgroundColor: '#f0e4e6',
                      },
                    }}
                    onClick={item.isAction ? toggleSubMenu : undefined}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                      {item.icon ? React.cloneElement(item.icon, { fontSize: isCollapsed ? 'small' : 'medium' }) : (isSubMenuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />)}
                    </ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold' }} />}
                  </ListItem>
                </Tooltip>
                {item.isAction && (
                  <Collapse in={isSubMenuOpen}>
                    <List component="div" disablePadding>
                      {actions.map((action, actionIndex) => (
                        <div key={actionIndex}>
                          {action.list.map((subAction, subActionIndex) => (
                            <Tooltip key={subActionIndex} title={isCollapsed ? subAction.title : ''} placement="right">
                              <ListItem
                                component={NavLink}
                                to={subAction.path}
                                exact="true" // שינוי זה ממיר את הערך למחרוזת

                                sx={{
                                  paddingRight: '0.5rem',
                                  marginBottom: '0rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  '&.active': {
                                    fontWeight: 'bold',
                                    fontSize: '0.7rem',
                                    color: '#fff',
                                    backgroundColor: '#9B153B',
                                  },
                                  '&:hover': {
                                    backgroundColor: '#f0e4e6',
                                  },
                                }}
                              >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
                                  {subAction.icon ? React.cloneElement(subAction.icon, { fontSize: isCollapsed ? 'small' : 'medium' }) : null}
                                </ListItemIcon>
                                {!isCollapsed && <ListItemText primary={subAction.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold' }} />}
                              </ListItem>
                            </Tooltip>
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
      </List>
      <Divider sx={{ borderColor: '#9B153B' }} />
      {/* <List sx={{ marginTop: 'auto' }}>
        <ListItem
          component={NavLink}
          to="/"
          onClick={() => logout()}
          sx={{
            paddingRight: '0.5rem',
            marginBottom: '0rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            '&:hover': {
              backgroundColor: '#f0e4e6',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
            <ExitToApp />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="יציאה" sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold' }} />
          )}
        </ListItem>
      </List> */}


<List sx={{ marginTop: 'auto' }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            paddingRight: '0.5rem',
            marginBottom: '0rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            '&:hover': {
              backgroundColor: '#f0e4e6',
            },
            cursor: isLoading ? 'not-allowed' : 'pointer', // שנה את הקורסור אם יש טעינה
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
            <ExitToApp />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText
              primary="יציאה"
              sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold' }}
            />
          )}
        </ListItem>
      </List>



    </Drawer>
  );
};

export default SiteBar;
