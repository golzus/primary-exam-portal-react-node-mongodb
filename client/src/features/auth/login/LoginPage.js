import React from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box, TextField, Button, Typography, CssBaseline, Paper } from '@mui/material';
import { useLoginMutation } from '../authApiSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash'); // אם ההתחברות הצליחה, נווט לדשבורד
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // מניעת רענון דף בעת שליחה
    const data = new FormData(e.target); // יצירת אובייקט FormData מהטופס
    const userObject = Object.fromEntries(data.entries()); // המרת FormData לאובייקט
    login(userObject); // קריאת הפונקציה login עם הנתונים מהטופס
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

export default LoginPage;
