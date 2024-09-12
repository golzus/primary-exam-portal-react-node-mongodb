import React, { useState } from 'react';
import { ThemeProvider, Box, Typography, Container, IconButton, Collapse, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import theme from '../../theme';
import { Link } from 'react-router-dom';

const StudentInstructions = () => {
  const [openSection, setOpenSection] = useState(null);

  // פונקציה להחלפת מצב פתיחה וסגירה של כל חלק בהוראות
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        {/* הקומפוננטה Paper מכילה את כל ההוראות בעיצוב נעים לעין */}
        <Paper
          sx={{
            width: '70vw',
            height: '70vh', // גובה מוגדר ל-70% מגובה הדפדפן
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto' // הגדרת גלילה אוטומטית במקרה שהתוכן חורג מהשטח הנראה
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, textAlign: 'center' }}>
            הוראות לתלמידה
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.dark, textAlign: 'center' }}>
            ברוכים הבאים לאתר הבחנים שלנו!
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.dark, textAlign: 'center' }}>
            הנה הוראות לשימוש:
          </Typography>

          {/* תיבת הוראות כלליות */}
          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('generalInstructions')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              באופן כללי
              <IconButton size="small">
                {openSection === 'generalInstructions' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'generalInstructions'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                1. האתר נועד לעשיית בחנים בצורה נוחה וחווייתית, תוך כדי לימוד המילים באמצעות משחקים ובחני דמו לתרגול.
              </Typography>
            </Collapse>
          </Box>

          {/* תיבת הוראות לבחנים */}
          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('createQuiz')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              בחנים
              <IconButton size="small">
                {openSection === 'createQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'createQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                1. ניתן להיכנס לתפריט הבחנים שהושלמו, ולראות את הציונים ואת התשובות.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                2. בחנים שלא ניתן לעשותם יופיעו עם סמל מפתח ולא ניתן להיכנס אליהם.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                3. בכל בוחן ניתן ללחוץ על PLAY ולשחק במשחקים שיעזרו לתרגול המילים.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                4. לחיצה על כפתור VIEW מאפשרת לראות ולהדפיס את המילים שבבוחן.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                5. כפתור TRY מאפשר בחן דמה לתרגול.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                6. שימו לב: כל מבחן ניתן לביצוע פעם אחת בלבד!
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                7. ניתן להתאים את מהירות הדיבור ולזכור שכמות השמיעה מוגבלת.
              </Typography>
            </Collapse>
          </Box>

          {/* תיבת משחקים וגרפים */}
          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('checkQuiz')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              משחקים וגרפים
              <IconButton size="small">
                {openSection === 'checkQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'checkQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                1. ניתן לבחור את הבוחן הרצוי ולתרגל את המילים באמצעות משחקים.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                2. נתיב הגרפים מציג את ממוצע הבחנים שלך, סטיית התקן, וגרף קווים לכל הציונים שלך.
              </Typography>
            </Collapse>
          </Box>

          {/* תיבת עזרה ותמיכה */}
          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('help')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              עזרה ותמיכה
              <IconButton size="small">
                {openSection === 'help' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'help'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                אם יש בעיות או שאלות, ניתן לפנות אלינו בטלפון: 050-4199417 או במייל: 
              </Typography>
              <Link
          href="mailto:golda.z2030@gmail.com?subject=Contact from Website&body=Hello Goldi,"
          sx={{
            color:  '#800000',
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          golda.z2030@gmail.com
        </Link>
            </Collapse>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StudentInstructions;
