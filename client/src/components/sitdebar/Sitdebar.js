
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
import { useSendLoguotMutation } from '../../features/auth/authApiSlice';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';


// const user = {
//   username: "username",
//   fullname: "שם מלא",
//   seminary: "שם בית ספר",
//   image: "https://via.placeholder.com/50",
// };

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
      { title: "הפרטים שלי", path: "personalldetails", icon: <Person /> },
      { title: "הגדרות", path: "student-instruction", icon: <Settings /> },
    ],
  },
];

const SiteBar = () => {
  const [sendLogout, { error, data }] = useSendLoguotMutation();
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
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}>
    {/* רכיבים נוספים במידת הצורך */}
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
      <List sx={{ marginTop: 'auto' }}>
        <ListItem
          component={NavLink}
          to="/"
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
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, IconButton, Collapse, Tooltip } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { Dashboard, Person, Business, Settings, Help, ExitToApp, Quiz, ListAlt, Star } from '@mui/icons-material';
// import { PiListPlusLight } from 'react-icons/pi';
// import { GoChecklist } from 'react-icons/go';
// import useAuth from '../../hooks/useAuth';
// import { useSelector } from 'react-redux';
// import useSchoolAndClass from '../../hooks/useSchoolAndClass';
// import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
// import { FaChartLine, FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
// import { useSendLoguotMutation } from '../../features/auth/authApiSlice';

// // הגדרת נתונים לתפריט המורה
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

// // הגדרת פעולות נוספות
// const actions = [
//   {
//     list: [
//       { title: "יצירת בוחן חדש", path: "add", icon: <PiListPlusLight /> },
//       { title: "בחנים", path: "wordLsList", icon: <GoChecklist /> },
//     ],
//   },
// ];

// // הגדרת נתונים לתפריט התלמיד
// const studentMenuActions = [
//   {
//     title: "בחנים",
//     list: [
//       { title: "ראשי", path: "/dash", icon: <Dashboard /> },
//       { title: "בחנים", path: "wordLsList", icon: <Quiz /> },
//       { title: "בחנים שהושלמו", path: "todos", icon: <ListAlt /> },
//       { title: "גיליון ציונים", path: "marks", icon: <Star /> },
//       { title: "משחקים", path: "play", icon: <FaChartLine /> },
//       { title: "גרפים", path: "graphs", icon: <FaChartLine /> },
//     ],
//   },
//   {
//     title: "אישי",
//     list: [
//       { title: "הפרטים שלי", path: "personalldetails", icon: <Person /> },
//       { title: "הגדרות", path: "student-instruction", icon: <Settings /> },
//     ],
//   },
// ];

// // רכיב סרגל צד
// const SiteBar = () => {
//   const [sendLogout] = useSendLoguotMutation();
//   const { roles, classUser, fullname } = useAuth();
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
//         width: isCollapsed ? '50px' : '250px', // שינוי רוחב לפי פיקסלים
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: isCollapsed ? '50px' : '250px', // שינוי רוחב המגירה
//           boxSizing: 'border-box',
//           backgroundColor: '#f3f3e9',
//           color: '#9B153B',
//           direction: 'rtl',
//           maxHeight: '100%',
//           overflowY: 'auto', // הוספת גלילה בעת גלישת תוכן
//         },
//       }}
//     >
//       {/* כפתור התפריט העליון */}
//       <Box sx={{ padding: '10px', textAlign: 'center', position: 'relative' }}>
//         <IconButton onClick={toggleCollapse} sx={{ position: 'absolute', top: 0, right: 0 }}>
//           <FaBars style={{ color: '#9B153B' }} />
//         </IconButton>
//         {!isCollapsed && (
//           <>
//             {/* אייקון מורה/תלמיד */}
//             {roles === "Student" ? (
//               <FaUser style={{ fontSize: '30px', color: '#9B153B', marginBottom: '10px' }} />
//             ) : (
//               <FaUserTie style={{ fontSize: '25px', color: '#9B153B', marginBottom: '10px' }} />
//             )}
//             {/* שם מלא */}
//             <Typography variant="h6" component="div" sx={{ color: '#9B153B', fontSize: '16px', fontWeight: 'bold' }}>
//               {fullname}
//             </Typography>
//             {/* שם בית ספר וכיתה */}
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
//               {chosenNameSchool && (
//                 <>
//                   <FaSchool style={{ fontSize: '16px', color: '#9B153B' }} />
//                   <Typography variant="body2" sx={{ color: '#9B153B', fontSize: '12px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {chosenNameSchool}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
//               {chosenNameClass && (
//                 <>
//                   <FaChalkboardTeacher style={{ fontSize: '16px', color: '#9B153B' }} />
//                   <Typography variant="body2" sx={{ color: '#9B153B', fontSize: '12px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {chosenNameClass}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </>
//         )}
//       </Box>

//       {/* תוכן הסרגל */}
//       <Divider sx={{ borderColor: '#9B153B' }} />
//       <List>
//         {menuItems.map((cat, index) => (
//           <div key={index}>
//             <ListItem>
//               {!isCollapsed && <ListItemText primary={cat.title} sx={{ color: '#9B153B', fontSize: '14px', fontWeight: 'bold' }} />}
//             </ListItem>
//             {cat.list.map((item, subIndex) => (
//               <Tooltip title={isCollapsed ? item.title : ''} placement="right" key={subIndex}>
//                 <ListItem
//                   component={NavLink}
//                   to={item.path}
//                   sx={{
//                     paddingRight: '10px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     '&.active': {
//                       backgroundColor: '#9B153B',
//                       color: '#fff',
//                     },
//                     '&:hover': {
//                       backgroundColor: '#f0e4e6',
//                     },
//                   }}
//                   onClick={item.isAction ? toggleSubMenu : undefined}
//                 >
//                   <ListItemIcon sx={{ color: 'inherit' }}>
//                     {item.icon ? React.cloneElement(item.icon, { fontSize: 'medium' }) : (isSubMenuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />)}
//                   </ListItemIcon>
//                   {!isCollapsed && <ListItemText primary={item.title} sx={{ color: 'inherit', fontSize: '12px', whiteSpace: 'nowrap' }} />}
//                 </ListItem>
//               </Tooltip>
//             ))}
//             <Divider sx={{ borderColor: '#9B153B' }} />
//           </div>
//         ))}
//       </List>
//       {/* כפתור התנתקות */}
//       {!isCollapsed && (
//         <ListItem button onClick={sendLogout} sx={{ paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
//           <ListItemIcon sx={{ color: '#9B153B' }}>
//             <ExitToApp />
//           </ListItemIcon>
//           <ListItemText primary="התנתק" sx={{ color: '#9B153B', fontSize: '12px' }} />
//         </ListItem>
//       )}
//     </Drawer>
//   );
// };

// export default SiteBar;
