import React, { useState, useEffect } from 'react';
import { IoLockClosedOutline, IoPersonOutline, IoLockOpenOutline } from 'react-icons/io5';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box, TextField, Button, Typography, CssBaseline, Paper, InputAdornment, CircularProgress } from '@mui/material';
import { useLoginMutation } from '../authApiSlice';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8b0000', // צבע בורדו
    },
    secondary: {
      main: '#e91e63',
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
  const [login, { isError, error, isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash');
    }
  }, [isSuccess]);

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
                          style={{ transition: 'color 0.3s' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
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
                          style={{ transition: 'color 0.3s' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    backgroundColor: '#8b0000', // צבע בורדו קבוע
                    '&:hover': {
                      backgroundColor: '#720000', // צבע כהה יותר בהובר
                    },
                    transition: 'background-color 0.3s ease', // מעבר עדין בצבע הרקע
                  }}
                  // disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={16}
                        sx={{
                          color: 'white',
                          mr: 1,
                          animationDuration: '550ms', // אנימציה עדינה יותר
                        }}
                      />
                      מתחבר...
                    </>
                  ) : (
                    'התחבר'
                  )}
                </Button>
                {isError && (
                  <Typography variant="contained" color="error" sx={{ mt: 2, textAlign: 'center' }}>
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
