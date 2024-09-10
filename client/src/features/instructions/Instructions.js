import React, { useState } from 'react';
import { ThemeProvider, Box, Typography, Container, IconButton, Collapse, Paper, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import theme from '../../theme';

const TeacherInstructions = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Paper
          sx={{
            width: '70vw',
            height: '70vh',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, textAlign: 'center' }}>
            הוראות למורה
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.dark, textAlign: 'center' }}>
            ברוכים הבאים לאתר הבחנים שלנו!
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.dark, textAlign: 'center' }}>
            הנה הוראות לשימוש:
          </Typography>

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
                1. כאשר ברצונך להוסיף או לעדכן מידע במערכת (תלמיד, בוחן), בחר בית ספר וכיתה שבהם תרצה לבצע את השינויים.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                2. בחר את הפרטים שברצונך לעדכן או צור חדשים לפי הצורך.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                3. כל פעולה שתבצע תתעדכן בכיתה הספציפית ובבית הספר שנבחרו.
              </Typography>
            </Collapse>
          </Box>

          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('createQuiz')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              יצירת בוחן חדש
              <IconButton size="small">
                {openSection === 'createQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'createQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                1. כאשר אתה יוצר בוחן חדש, באפשרותך לבחור את המאפיינים הבאים:
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                2. האם התלמיד יוכל לראות את המילה באנגלית בעת מענה על הבוחן.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                3. מספר הפעמים שהתלמיד יוכל לשמוע את המילה באנגלית במהלך הבוחן.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                4. האם התלמידים יוכלו לגשת לבוחן. אם אינך רוצה שהם יוכלו לגשת, השאר את הסטטוס כ- DISABLE. אם תרצה לאפשר להם גישה, עדכן את הסטטוס ל- ENABLE.
              </Typography>
            </Collapse>
          </Box>

          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => toggleSection('checkQuiz')}
              sx={{ cursor: 'pointer', color: theme.palette.primary.light }}
            >
              בדיקת ציונים
              <IconButton size="small">
                {openSection === 'checkQuiz' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={openSection === 'checkQuiz'} timeout="auto" unmountOnExit>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                1. תוכל לראות רשימה של כל המבחנים שנעשו עד כה. לחץ על כפתור "MARKS" ליד הבוחן הרצוי כדי לראות את הציונים של כל התלמידים. תלמידים שלא ביצעו את הבוחן יופיעו ברשימה, אך לא ניתן להיכנס למבוחן שלהם. ליד שמם יופיע מנעול.
              </Typography>
              <Typography variant="body1" sx={{ color: '#800000', marginBottom: '8px' }}>
                2. תוכל גם לעבור לקטגוריה "STUDENTS" ולבחור את התלמידה הרצויה כדי לראות את הציונים שלה בכל המבחנים. תלמידים שלא ביצעו את הבוחן יופיעו ברשימה אך לא יהיה ניתן להיכנס לבוחן שלהם. ליד שמם יופיע מנעול.
              </Typography>
            </Collapse>
          </Box>

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
                אם נתקלת בבעיות או יש לך שאלות, תוכל לפנות אלינו באמצעות מספר הטלפון: 050-4199417 או במייל:
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

export default TeacherInstructions;
