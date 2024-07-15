// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283593', // Indigo
      light: '#5c6bc0', // Light Blue
      dark: '#1a237e', // Darker Indigo
    },
    secondary: {
      main: '#ff7043', // Orange
    },
  },
});

export default theme;
