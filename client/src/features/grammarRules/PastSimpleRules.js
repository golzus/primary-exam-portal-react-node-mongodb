import React from 'react';
import { IconButton,Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from '../../theme';
import { Link } from 'react-router-dom';
import { FaExclamation } from 'react-icons/fa';

const PastSimpleRules = () => {
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
          height: '68vh', // גובה מוגדר
          overflowY: 'auto', // גלילה פנימית כאשר התוכן חורג
        }}

      >
        <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          כללי השימוש ב-Past Simple
        </Typography>

        <Divider sx={{ marginBottom: theme.spacing(3), backgroundColor: '#c5a880' }} />

        {/* תיאור כללי */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            תיאור כללי:
          </Typography>
          <Typography variant="body1" paragraph>
            Past Simple מציין זמן עבר – פעולות שהתחילו בעבר והסתיימו בעבר. נוכל לזהות את Past Simple בעזרת צירופי הזמן האופייניים לו, כגון <strong>yesterday</strong>, <strong>last+week/month/year</strong>, וצירופי זמן הכוללים את המילה <strong>ago</strong>.
          </Typography>
        </Box>

        {/* פועל העזר To be */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            פועל העזר To be:
          </Typography>
          <Typography variant="body1" paragraph>
            פועל העזר To be הופך בעבר ל-<strong>was</strong> ו-<strong>were</strong>. גוף יחיד יקבל את <strong>was</strong> וגוף רבים או <strong>you</strong> יקבל את <strong>were</strong>.
          </Typography>
          <List>
            {['She was', 'He was', 'I was', 'You were', 'We were', 'They were'].map((text, index) => (
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
            בזמן Past Simple, חלק מהפעלים יקבלו את אחת מהסיומות <strong>d</strong>, <strong>ed</strong>, או <strong>ied</strong>. כל הפעלים ישמרו על אותה צורה בכל הגופים.
          </Typography>
          <List>
            {[
              'פועל שמסתיים באות e יקבל תוספת d: dance → danced',
              'פועל שמסתיים באות y אחרי אות תנועה יקבל ed: enjoy → enjoyed',
              'פועל שמסתיים באות y אחרי אות עיצור יקבל ied: cry → cried',
              'פועל שמסתיים ברצף עיצור-תנועה-עיצור יכפיל את האות האחרונה: stop → stopped'
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

        {/* פעלים יוצאי דופן */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            פעלים יוצאי דופן:
          </Typography>
          <Typography variant="body1" paragraph>
            ישנם כ-200 פעלים שלא מקבלים את התוספות הרגילות, אלא מקבלים צורות שונות בעבר. הנה כמה מהפעלים הנפוצים:
          </Typography>
          <List>
            {['go → went', 'eat → ate', 'buy → bought', 'drink → drank'].map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
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
            <strong>Last week I was at a pop concert with friends.</strong><br />
            <strong>They drank beer yesterday.</strong><br />
            <strong>She was at school yesterday.</strong><br />
            <strong>They played football last week.</strong><br />
            <strong>He ate pizza yesterday.</strong>
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
              ><Typography>לקרוא עוד על פעלים</Typography>
              <FaExclamation  />
              </IconButton>

        {/* משפט בשלילה */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            משפט בשלילה:
          </Typography>
          <Typography variant="body1" paragraph>
            כדי להפוך את המשפט לשלילה, נוסיף את המילה <strong>didn't</strong> לאחר הנושא, והפועל יופיע בצורת ה-Present Simple שלו. לדוגמה: <strong>They didn't want to play with us.</strong>
          </Typography>
        </Box>

        {/* משפט בשאלה */}
        <Box mb={4}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            משפט בשאלה:
          </Typography>
          <Typography variant="body1">
            כדי להפוך את המשפט לשאלה, נוסיף את המילה <strong>did</strong> בתחילת המשפט, והפועל יופיע בצורת ה-Present Simple שלו. לדוגמה: <strong>Did she read the book?</strong>
          </Typography>
          
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default PastSimpleRules;
