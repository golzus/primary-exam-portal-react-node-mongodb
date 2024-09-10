import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import theme from '../../theme'; // מייבא את הנושא המותאם אישית שלך

const ContactForm = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Goldi Zusman
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Programmer & Software Engineer
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
          Email: <a href="mailto:golda.z2030@gmail.com" style={{ color: theme.palette.primary.main }}>golda.z2030@gmail.com</a>
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
          📞 +123 456 7890
        </Typography>
        
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 3,
            width: '100%',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            sx={{ backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            sx={{ backgroundColor: '#ffffff' }}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            sx={{ backgroundColor: '#ffffff' }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;
