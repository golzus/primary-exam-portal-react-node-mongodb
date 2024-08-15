import React from 'react';
import { Box, Typography } from '@mui/material';

const MainPage = () => {
  return (
    <Box
      sx={{
        marginTop:'1rem',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: '#f3f3e9', // Background color to match your theme
        textAlign: 'center',
      }}
    >
      <img 
        src='/logo.png' 
        alt='Logo' 
        style={{
          width: '40%', 
          maxWidth: '400px', 
          marginBottom: '1rem'
        }} 
      />
      {/* <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          color: '#9B153B', 
          fontWeight: 'bold',
          fontSize: '2.5rem'
        }}
      >
        ברוכים הבאים למערכת שלנו
      </Typography> */}
    </Box>
  );
};

export default MainPage;
