import React from 'react';
import { IconButton, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from '../../theme';
import { Link } from 'react-router-dom';
import { FaExclamation } from 'react-icons/fa';

const PresentContinuousRules = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: '850px',
          margin: 'auto',
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
          borderRadius: '10px',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
          height: '68vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          כללי השימוש ב-Present Continuous
        </Typography>

        <Divider sx={{ marginBottom: theme.spacing(3), backgroundColor: '#c5a880' }} />

        {/* תיאור כללי */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            תיאור כללי:
          </Typography>
          <Typography variant="body1" paragraph>
            ה-Present Continuous (או Present Progressive) משמש לתיאור פעולות שמתרחשות כרגע או בזמן מסוים. נשתמש בזמן זה כדי לתאר פעולות מתמשכות או זמניות, לדוגמה: <strong>I am eating</strong> (אני אוכל).
          </Typography>
        </Box>

        {/* מבנה המשפט */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            מבנה המשפט:
          </Typography>
          <Typography variant="body1" paragraph>
            המבנה הבסיסי של הווה ממושך הוא: נושא + פועל עזר <strong>am/is/are</strong> + הפועל בצורת <strong>ing</strong>.
          </Typography>
          <List>
            {['I am working', 'She is eating', 'They are playing'].map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* תוספות לפעלים */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            תוספות לפעלים:
          </Typography>
          <Typography variant="body1" paragraph>
            הפועל מקבל תוספת <strong>ing</strong>. יש כמה חוקים לפעלים:
          </Typography>
          <List>
            {[
              'פועל שמסתיים באות e מאבד את ה-e: make → making',
              'פועל שמסתיים ב-cvc (consonant-vowel-consonant) יכפיל את האות האחרונה: run → running',
              'פועל שמסתיים ב-y נשאר עם y: play → playing',
            ].map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* דוגמאות */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            דוגמאות:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>She is reading a book right now.</strong><br />
            <strong>We are having lunch.</strong><br />
            <strong>They are playing football at the moment.</strong><br />
            <strong>He is studying for his exams.</strong>
          </Typography>
        </Box>

        {/* משפט בשלילה */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            משפט בשלילה:
          </Typography>
          <Typography variant="body1" paragraph>
            כדי להפוך את המשפט לשלילה, נוסיף <strong>not</strong> אחרי הפועל העזר: <strong>She is not working</strong>.
          </Typography>
        </Box>

        {/* משפט בשאלה */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            משפט בשאלה:
          </Typography>
          <Typography variant="body1">
            כדי להפוך את המשפט לשאלה, נשנה את הסדר ונמקם את הפועל העזר לפני הנושא: <strong>Is she working?</strong>
          </Typography>
        </Box>

        <IconButton
          component={Link}
          to="/dash/gramar-rules/verb-explanation"
          sx={{
            fontSize: 60,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Typography>לקרוא עוד על פעלים</Typography>
          <FaExclamation />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
};

export default PresentContinuousRules;
