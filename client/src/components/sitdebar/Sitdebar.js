
import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaSchool } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box, IconButton, Collapse, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dashboard, Person, Business, Settings, Help, ExitToApp, Quiz, ListAlt, Star } from '@mui/icons-material';
import { PiListPlusLight } from 'react-icons/pi';
import { GoChecklist } from 'react-icons/go';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import useSchoolAndClass from '../../hooks/useSchoolAndClass';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaChartLine } from 'react-icons/fa';


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
      { title: "פעולות", path: "#", icon: null, isAction: true },
    ],
  },
  {
    title: "משתמש",
    list: [
      { title: "הגדרות", path: "instructions", icon: <Settings /> },
      { title: "לבחירת ביה''ס וכיתה", path: "help", icon: <Help /> },
    ],
  },
];

const actions = [
  {
    list: [
      { title: "יצירת בוחן חדש", path: "add", icon: <PiListPlusLight /> },
      { title: "בחנים", path: "wordLsList", icon: <GoChecklist /> },
    ],
  },
];

const studentMenuActions = [
  {
    title: "בחנים",
    list: [
      { title: "ראשי", path: "/dash", icon: <Dashboard /> },
      { title: "בחנים", path: "wordLsList", icon: <Quiz /> },
      { title: "בחנים שהושלמו", path: "todos", icon: <ListAlt /> },
      { title: "גיליון ציונים", path: "marks", icon: <Star /> },
      { title: "משחקים", path: "play", icon: <FaChartLine /> },
      { title: "גרפים", path: "graphs", icon: <FaChartLine /> },
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

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: isCollapsed ? '3rem' : '12vw',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? '3rem' : '12vw',
          boxSizing: 'border-box',
          backgroundColor: '#f3f3e9',
          color: '#9B153B',
          direction: 'rtl',
          maxHeight: '100%',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ padding: '0.5rem', textAlign: 'center', position: 'relative' }}>
        <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <FaBars style={{ color: '#9B153B' }} />
        </IconButton>
        {!isCollapsed && (
          <>
            {image ? (
              <Avatar
                src={image}
                sx={{
                  width: '5vw',
                  height: '5vw',
                  maxWidth: '3rem',
                  maxHeight: '3rem',
                  margin: '0 auto 0.5rem',
                }}
              />
            ) : (
              <FaSchool style={{ fontSize: '1.5rem', color: '#9B153B', margin: '0 auto 0.5rem' }} />
            )}
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.7rem', fontWeight: 'bold' }}>
              {chosenNameSchool}
            </Typography>
            <Typography variant="h7" component="div" sx={{ color: '#9B153B', fontSize: '0.6rem', fontWeight: 'bold' }}>
              {chosenNameClass}
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}>
          <FaUser style={{ fontSize: '0.8rem', color: '#9B153B' }} />
          {!isCollapsed && (
            <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.7rem', fontWeight: 'bold' }}>
              {fullname}
            </Typography>
          )}
        </Box>
      </Box>

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
                    exact
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
                                exact
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
      <List sx={{ marginTop: 'auto' }}>
        <ListItem
          button
          component={NavLink}
          to="/logout"
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
      </List>
    </Drawer>
  );
};

export default SiteBar;



// import React, { useState, useEffect } from 'react';
// import { FaUser, FaBars, FaSchool } from "react-icons/fa";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box, IconButton, Collapse, Tooltip } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { Dashboard, Person, Business, Settings, Help, ExitToApp, Quiz, ListAlt, Star } from '@mui/icons-material';
// import { PiListPlusLight } from 'react-icons/pi';
// import { GoChecklist } from 'react-icons/go';
// import useAuth from '../../hooks/useAuth';
// import { useSelector } from 'react-redux';
// import useSchoolAndClass from '../../hooks/useSchoolAndClass';
// import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם בית ספר",
//   image: "https://via.placeholder.com/50",
// };

// const teacherMenuActions = [
//   {
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "תלמידות", path: "users", icon: <Person /> },
//       { title: "בתי ספר", path: "companies", icon: <Business /> },
//       { title: "פעולות", path: "#", icon: null, isAction: true },
//     ],
//   },
//   {
//     title: "משתמש",
//     list: [
//       { title: "הגדרות", path: "instructions", icon: <Settings /> },
//       { title: "לבחירת ביה''ס וכיתה", path: "help", icon: <Help /> },
//     ],
//   },
// ];

// const actions = [
//   {
//     list: [
//       { title: "יצירת בוחן חדש", path: "add", icon: <PiListPlusLight /> },
//       { title: "בחנים", path: "wordLsList", icon: <GoChecklist /> },
//     ],
//   },
// ];

// const studentMenuActions = [
//   {
//     title: "בחנים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "בחנים", path: "wordLsList", icon: <Quiz /> },
//       { title: "בחנים שהושלמו", path: "todos", icon: <ListAlt /> },
//       { title: "גיליון ציונים", path: "marks", icon: <Star /> },
//     ],
//   },
//   {
//     title: "אישי",
//     list: [
//       { title: "הפרטים שלי", path: "PersonalDetails", icon: <Person /> },
//     ],
//   },
// ];

// const SiteBar = () => {
//   const { roles, classUser, fullname, image } = useAuth();
//   const menuItems = roles === 'Teacher' ? teacherMenuActions : studentMenuActions;
//   const [classTeacher, setClassTeacher] = useState("");
//   const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 900);
//   const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
//   const { chosenClass } = useSelector((state) => state.schoolAndClass);
//   let { chosenNameClass, chosenNameSchool } = useSchoolAndClass();

//   useEffect(() => {
//     if (chosenClass) {
//       setClassTeacher(chosenClass);
//     }
//   }, [chosenClass]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth < 900);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const toggleSubMenu = () => {
//     setIsSubMenuOpen(!isSubMenuOpen);
//   };

//   if (roles === "Student") {
//     chosenNameClass = classUser.name;
//   }

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="right"
//       sx={{
//         width: isCollapsed ? '3rem' : '12vw',
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: isCollapsed ? '3rem' : '12vw',
//           boxSizing: 'border-box',
//           backgroundColor: '#f3f3e9',
//           color: '#9B153B',
//           direction: 'rtl',
//           maxHeight: '100%',
//           overflow: 'hidden',
//         },
//       }}
//     >
//       <Box sx={{ padding: '0.5rem', textAlign: 'center', position: 'relative' }}>
//         <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
//           <FaBars style={{ color: '#9B153B' }} />
//         </IconButton>
//         {!isCollapsed && (
//           <>
//             {image ? (
//               <Avatar
//                 src={image}
//                 sx={{
//                   width: '5vw',
//                   height: '5vw',
//                   maxWidth: '3rem',
//                   maxHeight: '3rem',
//                   margin: '0 auto 0.5rem',
//                 }}
//               />
//             ) : (
//               <FaSchool style={{ fontSize: '1.5rem', color: '#9B153B', margin: '0 auto 0.5rem' }} />
//             )}
//             <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.7rem', fontWeight: 'bold' }}>
//               {chosenNameSchool}
//             </Typography>
//             <Typography variant="h7" component="div" sx={{ color: '#9B153B', fontSize: '0.6rem', fontWeight: 'bold' }}>
//               {chosenNameClass}
//             </Typography>
//           </>
//         )}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}>
//           <FaUser style={{ fontSize: '0.8rem', color: '#9B153B' }} />
//           {!isCollapsed && (
//             <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '0.7rem', fontWeight: 'bold' }}>
//               {fullname}
//             </Typography>
//           )}
//         </Box>
//       </Box>

//       <Divider sx={{ borderColor: '#9B153B' }} />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', paddingRight: '0rem', fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'right' }} />}
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <div key={subIndex}>
//                 <Tooltip title={isCollapsed ? item.title : ''} placement="right">
//                   <ListItem
//                     component={NavLink}
//                     to={item.path}
//                     exact
//                     sx={{
//                       paddingRight: '0.5rem',
//                       marginBottom: '0.2rem',
//                       display: 'flex',
//                       // justifyContent: isCollapsed ? 'center' : 'flex-start',
//                       alignItems: 'center',
//                       gap: '0.5rem',
//                       '&.active': {
//                         fontWeight: 'bold',
//                         fontSize: '0.7rem',
//                         color: item.isAction ?'#9B153B':'#fff',
//                         backgroundColor: item.isAction ? 'transparent' : '#9B153B',
//                       },
//                     }}
//                     onClick={item.isAction ? toggleSubMenu : undefined}
//                   >
//                     <ListItemIcon sx={{ color: 'inherit', minWidth: 0 }}>
//                       {item.icon ? React.cloneElement(item.icon, { fontSize: isCollapsed ? 'small' : 'medium' }) : (isSubMenuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />)}
//                     </ListItemIcon>
//                     {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold' }} />}
//                   </ListItem>
//                 </Tooltip>
//                 {item.isAction && (
//                   <Collapse in={isSubMenuOpen}>
//                     <List component="div" disablePadding>
//                       {actions.map((action, actionIndex) => (
//                         <div key={actionIndex}>
//                           <ListItem>
//                             {!isCollapsed && <ListItemText primary={action.title} sx={{ color: '#9B153B', paddingRight: '0rem', fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'right' }} />}
//                           </ListItem>
//                           {action.list.map((subAction, subActionIndex) => (
//                             <Tooltip key={subActionIndex} title={isCollapsed ? subAction.title : ''} placement="right">
//                             <ListItem
//                               component={NavLink}
//                               to={subAction.path}
//                               exact
//                               sx={{
//                                 paddingRight: '1rem',
//                                 marginBottom: '0.2rem',
//                                 display: 'flex',
//                                 justifyContent: isCollapsed ? 'center' : 'flex-start',
//                                 alignItems: 'center',
//                                 gap: '0.5rem',
//                                 fontSize: '0.7rem',
//                                 '&.active': {
//                                   fontWeight: 'bold',
//                                   color: '#fff',
//                                   backgroundColor: 'transparent',
//                                 },
//                               }}
//                             >
//                               <ListItemIcon sx={{ color: '#9B153B', minWidth: 0 }}>
//                                 {subAction.icon ? React.cloneElement(subAction.icon, { fontSize: 'small' }) : null}
//                               </ListItemIcon>
//                               {!isCollapsed && (
//                                 <ListItemText
//                                   primary={subAction.title}
//                                   sx={{ color: '#9B153B', textAlign: 'right', fontSize: '0.7rem', fontWeight: 'bold',
//                                   '&.active': {
//                                     fontWeight: 'bold',
//                                     fontSize: '0.7rem',
//                                     color: item.isAction ?'#9B153B':'#fff',
//                                     backgroundColor: item.isAction ? 'transparent' : '#9B153B',
                                    
//                                   }, }}
//                                 />
//                               )}
//                             </ListItem>
//                           </Tooltip>
//                         ))}
//                       </div>
//                     ))}
//                   </List>
//                 </Collapse>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </List>

//     <Divider sx={{ borderColor: '#9B153B' }} />
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5rem', marginTop: 'auto' }}>
//       <Tooltip title={isCollapsed ? 'התנתק' : ''} placement="right">
//         <IconButton sx={{ color: '#9B153B', fontSize: '1.5rem' }} component={NavLink} to='/login'>
//           <ExitToApp sx={{ fontSize: '2rem' }} />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   </Drawer>
// );
// };

// export default SiteBar;
