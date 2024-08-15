import React, { useState } from 'react';
import { ThemeProvider, Box, Typography, Container, IconButton, Collapse, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import theme from '../../theme'
const TeacherInstructions = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper
          sx={{
            width: '70vw',
            height: '70vh',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
            הוראות למורה
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
            ברוכים הבאים לאתר הבחנים שלנו! הנה הוראות לשימוש:
          </Typography>

          <Box>
            <Typography variant="h6" gutterBottom onClick={() => toggleSection('createAccount')} sx={{ cursor: 'pointer', color: theme.palette.primary.light }}>
              יצירת חשבון
              <IconButton size="small">
                {openSection === 'createAccount' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'createAccount'} timeout="auto" unmountOnExit>
              <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
                1. לחץ על כפתור "הרשמה" בפינה הימנית העליונה של הדף.
                2. מלא את הפרטים הנדרשים ולחץ על "שלח".
                3. לאחר מכן, תקבל הודעת אימייל לאימות החשבון.
              </Typography>
            </Collapse>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom onClick={() => toggleSection('createQuiz')} sx={{ cursor: 'pointer', color: theme.palette.primary.light }}>
              יצירת בחן חדש
              <IconButton size="small">
                {openSection === 'createQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'createQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
                1. היכנס למערכת עם פרטי החשבון שלך.
                2. בתפריט הראשי, לחץ על "צור בחן חדש".
                3. מלא את השדות הנדרשים כמו שם הבחן, תיאור, שאלות ותשובות.
                4. לחץ על "שמור" כדי לשמור את הבחן.
              </Typography>
            </Collapse>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom onClick={() => toggleSection('presentQuiz')} sx={{ cursor: 'pointer', color: theme.palette.primary.light }}>
              הצגת בחנים לתלמידים
              <IconButton size="small">
                {openSection === 'presentQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'presentQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
                1. לחץ על "ניהול בחנים" בתפריט הראשי.
                2. בחר את הבחן שברצונך להציג לתלמידים.
                3. לחץ על "הצג לתלמידים".
                4. התלמידים יוכלו לגשת לבחן באמצעות הקישור שהוענק להם.
              </Typography>
            </Collapse>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom onClick={() => toggleSection('checkQuiz')} sx={{ cursor: 'pointer', color: theme.palette.primary.light }}>
              בדיקת בחנים
              <IconButton size="small">
                {openSection === 'checkQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'checkQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
                1. לאחר שתלמידים סיימו את הבחן, תוכל לבדוק את התשובות שלהם.
                2. לחץ על "בדיקת בחנים" בתפריט הראשי.
                3. בחר את הבחן הרצוי ולחץ על "בדוק תשובות".
                4. הענק ציונים לתלמידים ולחץ על "שמור".
              </Typography>
            </Collapse>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom onClick={() => toggleSection('help')} sx={{ cursor: 'pointer', color: theme.palette.primary.light }}>
              עזרה ותמיכה
              <IconButton size="small">
                {openSection === 'help' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'help'} timeout="auto" unmountOnExit>
              <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.dark }}>
                אם נתקלת בבעיות או יש לך שאלות, תוכל לפנות אלינו באמצעות כפתור "צור קשר" שבתחתית הדף. אנחנו כאן לעזור לך!
              </Typography>
            </Collapse>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default TeacherInstructions;
