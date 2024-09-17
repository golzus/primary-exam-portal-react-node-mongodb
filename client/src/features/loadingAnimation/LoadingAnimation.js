import React from 'react';
import { Box, Typography } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';

const LOADING = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        // backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      {/* ספינר צבעוני */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <FaSpinner
          size={60}
          color="#9B153B"
          style={{
            animation: 'spin 1s linear infinite',
            position: 'absolute',
          }}
        />
      </Box>
      {/* הודעת טעינה */}
      {/* <Typography variant="h5" sx={{ color: '#9B153B', fontWeight: 'bold' }}>
        טוען נתונים, אנא המתן...
      </Typography> */}

      {/* הגדרת אנימציה */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};



export default LOADING;
