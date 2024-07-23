import React, { useState, useEffect } from 'react'; // ייבוא React והוקסים לשימוש ב-state וב-useEffect
import { IoLockClosedOutline } from 'react-icons/io5'; // ייבוא אייקון מנעול
import { ThemeProvider, createTheme } from '@mui/material/styles'; // ייבוא ThemeProvider ו-createTheme מ-MUI להגדרת ערכת נושא
import { Container, Box, TextField, Button, Typography, CssBaseline, Paper } from '@mui/material'; // ייבוא רכיבי MUI שונים לעיצוב
import { useLoginMutation } from '../authApiSlice'; // ייבוא פונקציית ההתחברות מ-API
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate לניווט

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
    ].join(','), // פונטים לשימוש
  },
});

const LoginPage = () => {
  const [login, { isError, error, isLoading, data, isSuccess }] = useLoginMutation(); // קריאת הפונקציה login מ-useLoginMutation
  const navigate = useNavigate(); // שימוש ב-useNavigate לניווט

  const [username, setUsername] = useState(''); // הגדרת state לאחסון שם המשתמש
  const [password, setPassword] = useState(''); // הגדרת state לאחסון הסיסמה

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash'); // אם ההתחברות הצליחה, נווט לדשבורד
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // מניעת רענון דף בעת שליחה
    login({ username, password }); // קריאת הפונקציה login עם שם המשתמש והסיסמה
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> {/* עיצוב בסיסי מ-MUI */}
        <Box
          sx={{
            marginTop: '20vh', // מרחק מהחלק העליון של הדף
            display: 'flex', // הגדרת תצוגה כ-flex
            flexDirection: 'column', // תצוגה בטור
            alignItems: 'center', // מרכזית לרוחב
          }}
        >
          <Paper elevation={6} sx={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
            <Box
              sx={{
                display: 'flex', // הגדרת תצוגה כ-flex
                flexDirection: 'column', // תצוגה בטור
                alignItems: 'center', // מרכזית לרוחב
              }}
            >
              <IoLockClosedOutline size={40} color="#8b0000" /> {/* אייקון מנעול */}
              <Typography component="h1" variant="h5">
                כניסת משתמשים
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }} // עיצוב הטופס
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
                  value={username} // ערך state של שם המשתמש
                  onChange={(e) => setUsername(e.target.value)} // עדכון state בעת שינוי ערך השדה
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
                  value={password} // ערך state של הסיסמה
                  onChange={(e) => setPassword(e.target.value)} // עדכון state בעת שינוי ערך השדה
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  התחבר
                </Button>
                {isError && (
                  <Typography color="error">
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

export default LoginPage; // ייצוא הקומפוננטה לשימוש חיצוני
