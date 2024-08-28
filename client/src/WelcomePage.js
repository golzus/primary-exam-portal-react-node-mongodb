import React from 'react';
import { Box, Button } from '@mui/material';

const WelcomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f3e9',
        padding: '2rem',
      }}
    >
      <img 
        src='/logo.png' 
        alt='Logo' 
        style={{ 
          height: '30vw', // גובה גדול יותר עבור הלוגו
          marginBottom: '2rem' 
        }} 
      />
           <a href="/#/login" >

      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#9B153B', 
          color: '#ffffff', 
          fontWeight: 'bold', 
          fontSize: '1.25rem', 
          padding: '0.75rem 2rem',
          '&:hover': {
            backgroundColor: '#c2185b', // צבע כהה יותר בעת מעבר עכבר
          },
        }}
      >
        כניסת משתמשים
      </Button></a>
    </Box>
  );
};

export default WelcomePage;
