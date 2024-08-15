// // // import React, { useState, useEffect } from 'react'; // ייבוא React והוקסים לשימוש ב-state וב-useEffect
// // // import { IoLockClosedOutline } from 'react-icons/io5'; // ייבוא אייקון מנעול
// // // import { ThemeProvider, createTheme } from '@mui/material/styles'; // ייבוא ThemeProvider ו-createTheme מ-MUI להגדרת ערכת נושא
// // // import { Container, Box, TextField, Button, Typography, CssBaseline, Paper } from '@mui/material'; // ייבוא רכיבי MUI שונים לעיצוב
// // // import { useLoginMutation } from '../authApiSlice'; // ייבוא פונקציית ההתחברות מ-API
// // // import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate לניווט
// // // import useAuth from '../../../hooks/useAuth';
// // // // יצירת ערכת נושא מותאמת אישית עם צבעים ופונטים מותאמים
// // // const theme = createTheme({
// // //   palette: {
// // //     primary: {
// // //       main: '#8b0000', // צבע אדום כהה לצבע הראשי
// // //     },
// // //     secondary: {
// // //       main: '#e91e63', // צבע ורוד לצבע המשני
// // //     },
// // //   },
// // //   typography: {
// // //     fontFamily: [
// // //       'Arial',
// // //       'Helvetica',
// // //       'sans-serif',
// // //     ].join(','), // פונטים לשימוש
// // //   },
// // // });

// // // const LoginPage = () => {
// // //   const [login, { isError, error, isLoading, data, isSuccess }] = useLoginMutation(); // קריאת הפונקציה login מ-useLoginMutation
// // //   const navigate = useNavigate(); // שימוש ב-useNavigate לניווט
// // //   const {roles}=useAuth()
// // //   const [username, setUsername] = useState(''); // הגדרת state לאחסון שם המשתמש
// // //   const [password, setPassword] = useState(''); // הגדרת state לאחסון הסיסמה

// // //   useEffect(() => {
// // //     if (isSuccess) {
// // //       console.log(roles,"roles");
// // //       if(roles==='Teacher')
// // //       navigate('/dash'); // אם ההתחברות הצליחה, נווט לדשבורד
// // //     else{
// // //       navigate('/dash/actions')
// // //     console.log("hello");}
// // //     }
// // //   }, [isSuccess, navigate]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault(); // מניעת רענון דף בעת שליחה
// // //     login({ username, password }); // קריאת הפונקציה login עם שם המשתמש והסיסמה
// // //   };

// // //   return (
// // //     <ThemeProvider theme={theme}>
// // //       <Container component="main" maxWidth="xs">
// // //         <CssBaseline /> {/* עיצוב בסיסי מ-MUI */}
// // //         <Box
// // //           sx={{
// // //             marginTop: '20vh', // מרחק מהחלק העליון של הדף
// // //             display: 'flex', // הגדרת תצוגה כ-flex
// // //             flexDirection: 'column', // תצוגה בטור
// // //             alignItems: 'center', // מרכזית לרוחב
// // //           }}
// // //         >
// // //           <Paper elevation={6} sx={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
// // //             <Box
// // //               sx={{
// // //                 display: 'flex', // הגדרת תצוגה כ-flex
// // //                 flexDirection: 'column', // תצוגה בטור
// // //                 alignItems: 'center', // מרכזית לרוחב
// // //               }}
// // //             >
// // //               <IoLockClosedOutline size={40} color="#8b0000" /> {/* אייקון מנעול */}
// // //               <Typography component="h1" variant="h5" color={"#8b0000"} >
// // //                 כניסת משתמשים
// // //               </Typography>
// // //               <Box
// // //                 component="form"
// // //                 onSubmit={handleSubmit}
// // //                 sx={{ mt: 1, width: '100%' }} // עיצוב הטופס
// // //               >
// // //                 <TextField
// // //                   variant="outlined"
// // //                   margin="normal"
// // //                   required
// // //                   fullWidth
// // //                   id="username"
// // //                   label="שם משתמש"
// // //                   name="username"
// // //                   autoComplete="username"
// // //                   autoFocus
// // //                   value={username} // ערך state של שם המשתמש
// // //                   onChange={(e) => setUsername(e.target.value)} // עדכון state בעת שינוי ערך השדה
// // //                 />
// // //                 <TextField
// // //                   variant="outlined"
// // //                   margin="normal"
// // //                   required
// // //                   fullWidth
// // //                   name="password"
// // //                   label="סיסמה"
// // //                   type="password"
// // //                   id="password"
// // //                   autoComplete="current-password"
// // //                   value={password} // ערך state של הסיסמה
// // //                   onChange={(e) => setPassword(e.target.value)} // עדכון state בעת שינוי ערך השדה
// // //                 />
// // //                 <Button
// // //                   type="submit"
// // //                   fullWidth
// // //                   variant="contained"
// // //                   color="primary"
// // //                   sx={{ mt: 3, mb: 2 }}
// // //                 >
// // //                   התחבר
// // //                 </Button>
// // //                 {isError && (
// // //                   <Typography color="error">
// // //                     {error?.data?.message || 'התרחשה שגיאה בהתחברות'}
// // //                   </Typography>
// // //                 )}
// // //               </Box>
// // //             </Box>
// // //           </Paper>
// // //         </Box>
// // //       </Container>
// // //     </ThemeProvider>
// // //   );
// // // };

// // // export default LoginPage; // ייצוא הקומפוננטה לשימוש חיצוני



// // import React, { useState, useEffect } from 'react';
// // import { IoLockClosedOutline } from 'react-icons/io5';
// // import { ThemeProvider, createTheme } from '@mui/material/styles';
// // import { Container, Box, TextField, Button, Typography, CssBaseline, Paper } from '@mui/material';
// // import { useLoginMutation } from '../authApiSlice';
// // import { useNavigate } from 'react-router-dom';
// // import useAuth from '../../../hooks/useAuth';

// // // יצירת ערכת נושא מותאמת אישית עם צבעים ופונטים מותאמים
// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#8b0000', // צבע אדום כהה לצבע הראשי
// //     },
// //     secondary: {
// //       main: '#e91e63', // צבע ורוד לצבע המשני
// //     },
// //   },
// //   typography: {
// //     fontFamily: [
// //       'Arial',
// //       'Helvetica',
// //       'sans-serif',
// //     ].join(','),
// //   },
// // });

// // const LoginPage = () => {
// //   const [login, { isError, error, isLoading, data, isSuccess }] = useLoginMutation();
// //   const navigate = useNavigate();
// //   const { roles } = useAuth();
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');

// //   useEffect(() => {
// //     if (isSuccess) {
// //       if (roles === 'Teacher') {
// //         navigate('/dash');
// //       } else {
// //         navigate('/dash/actions');
// //       }
// //     }
// //   }, [isSuccess, navigate, roles]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     login({ username, password });
// //   };

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <Container component="main" maxWidth="xs">
// //         <CssBaseline />
// //         <Box
// //           sx={{
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             height: '100vh', // מתיחה לגובה המסך כולו
// //             padding: '0 16px', // רווחים בצדדים
// //           }}
// //         >
// //           <Paper
// //             elevation={6}
// //             sx={{
// //               padding: '24px',
// //               width: '100%',
// //               maxWidth: '400px',
// //               borderRadius: '8px', // עיגול פינות של הקופסה
// //               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // הצללה רכה
// //             }}
// //           >
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 alignItems: 'center',
// //               }}
// //             >
// //               <IoLockClosedOutline size={50} color="#8b0000" />
// //               <Typography component="h1" variant="h4" color="#8b0000" fontWeight="bold" sx={{ mb: 2 }}>
// //                 כניסת משתמשים
// //               </Typography>
// //               <Box
// //                 component="form"
// //                 onSubmit={handleSubmit}
// //                 sx={{ mt: 1, width: '100%' }}
// //               >
// //                 <TextField
// //                   variant="outlined"
// //                   margin="normal"
// //                   required
// //                   fullWidth
// //                   id="username"
// //                   label="שם משתמש"
// //                   name="username"
// //                   autoComplete="username"
// //                   autoFocus
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   sx={{ mb: 2 }}
// //                 />
// //                 <TextField
// //                   variant="outlined"
// //                   margin="normal"
// //                   required
// //                   fullWidth
// //                   name="password"
// //                   label="סיסמה"
// //                   type="password"
// //                   id="password"
// //                   autoComplete="current-password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   sx={{ mb: 2 }}
// //                 />
// //                 <Button
// //                   type="submit"
// //                   fullWidth
// //                   variant="contained"
// //                   color="primary"
// //                   sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
// //                 >
// //                   התחבר
// //                 </Button>
// //                 {isError && (
// //                   <Typography color="error" sx={{ mt: 2 }}>
// //                     {error?.data?.message || 'התרחשה שגיאה בהתחברות'}
// //                   </Typography>
// //                 )}
// //               </Box>
// //             </Box>
// //           </Paper>
// //         </Box>
// //       </Container>
// //     </ThemeProvider>
// //   );
// // };

// // export default LoginPage;
// import React, { useState, useEffect } from 'react';
// import { IoLockClosedOutline, IoPersonOutline, IoLockOpenOutline } from 'react-icons/io5'; // ייבוא אייקונים נוספים
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Container, Box, TextField, Button, Typography, CssBaseline, Paper, InputAdornment } from '@mui/material';
// import { useLoginMutation } from '../authApiSlice';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';

// // יצירת ערכת נושא מותאמת אישית עם צבעים ופונטים מותאמים
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8b0000', // צבע אדום כהה לצבע הראשי
//     },
//     secondary: {
//       main: '#e91e63', // צבע ורוד לצבע המשני
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

// const LoginPage = () => {
//   const [login, { isError, error, isLoading, data, isSuccess }] = useLoginMutation();
//   const navigate = useNavigate();
//   const { roles } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     if (isSuccess) {
//       if (roles === 'Teacher') {
//         navigate('/dash');
//       } else {
//         navigate('/dash/actions');
//       }
//     }
//   }, [isSuccess, navigate, roles]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login({ username, password });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100vh',
//             padding: '0 16px',
//           }}
//         >
//           <Paper
//             elevation={6}
//             sx={{
//               padding: '24px',
//               width: '100%',
//               maxWidth: '400px',
//               borderRadius: '8px',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <IoLockClosedOutline size={50} color="#8b0000" />
//               <Typography component="h1" variant="h4" color="#8b0000" fontWeight="bold" sx={{ mb: 2 }}>
//                 כניסת משתמשים
//               </Typography>
//               <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 1, width: '100%' }}
//               >
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="username"
//                   label="שם משתמש"
//                   name="username"
//                   autoComplete="username"
//                   autoFocus
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   sx={{ mb: 2 }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <IoPersonOutline 
//                         // color="#8b0000" 
//                         />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   label="סיסמה"
//                   type="password"
//                   id="password"
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   sx={{ mb: 2 }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <IoLockOpenOutline color="#8b0000" />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
//                 >
//                   התחבר
//                 </Button>
//                 {isError && (
//                   <Typography color="error" sx={{ mt: 2 }}>
//                     {error?.data?.message || 'התרחשה שגיאה בהתחברות'}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Paper>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from 'react';
import { IoLockClosedOutline, IoPersonOutline, IoLockOpenOutline } from 'react-icons/io5';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box, TextField, Button, Typography, CssBaseline, Paper, InputAdornment } from '@mui/material';
import { useLoginMutation } from '../authApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

// יצירת ערכת נושא מותאמת אישית עם צבעים ופונטים מותאמים
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b0000', // צבע אדום כהה לצבע הראשי
    },
    secondary: {
      main: '#e91e63', // צבע ורוד לצבע המשני
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

const LoginPage = () => {
  const [login, { isError, error, isLoading, data, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const { roles } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      // if (roles === 'Teacher') {
        navigate('/dash');
      // } else {
        // navigate('/dash/actions');
      // }
    }
  }, [isSuccess, navigate, roles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '0 16px',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IoLockClosedOutline size={50} color="#8b0000" />
              <Typography component="h1" variant="h4" color="#8b0000" fontWeight="bold" sx={{ mb: 2 }}>
                כניסת משתמשים
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="שם משתמש"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IoPersonOutline
                          color={username || usernameFocused ? "#8b0000" : "#8b0000"}
                          // color={username || usernameFocused ? "#e91e63" : "#8b0000"}
                          style={{ transition: 'color 0.3s' }} // שינוי צבע באלגנטיות
                        />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }} // ניהול התווית
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IoLockOpenOutline
                          color={password || passwordFocused ? "#8b0000" : "#8b0000"}
                          style={{ transition: 'color 0.3s' }} // שינוי צבע באלגנטיות
                        />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }} // ניהול התווית
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
                >
                  התחבר
                </Button>
                {isError && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error?.data?.message || 'התרחשה שגיאה בהתחברות'}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
