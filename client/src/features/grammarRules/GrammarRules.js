import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import { History, Event, Schedule, TextFields } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const GrammarRules = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "65vh",
          backgroundColor: "#f3f3e9",
          gap: 2,
          padding: 4,


          backgroundColor: '#ffffff',  // צבע רקע לבן
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
        }}
      >
        <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>
          בחרו את הזמן שאתם רוצים ללמוד:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
              <IconButton
                component={Link}
                to="past-simple-rules"
                sx={{
                  fontSize: 60,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <History />
              </IconButton>
              <Typography variant="h6">עבר פשוט</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
              <IconButton
                component={Link}
                to="present-continuous-rules"
                sx={{
                  fontSize: 60,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Schedule />
              </IconButton>
              <Typography variant="h6">הווה ממושך</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
              <IconButton
                component={Link}
                to="future-simple-rules"
                sx={{
                  fontSize: 60,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Event />
              </IconButton>
              <Typography variant="h6">עתיד פשוט</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
              <IconButton
                component={Link}
                to="verb-explanation"
                sx={{
                  fontSize: 60,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <TextFields />
              </IconButton>
              <Typography variant="h6">הסבר על פועל</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default GrammarRules;
