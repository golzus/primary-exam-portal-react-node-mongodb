import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';  // שימוש ב-theme הקיים שלך

const PastSimpleRules = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: '850px',
          margin: 'auto',
          backgroundColor: '#f7f3e9',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          כללי השימוש ב-Past Simple
        </Typography>

        <Divider sx={{ marginBottom: '20px', backgroundColor: '#c5a880' }} />

        {/* תיאור כללי */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          תיאור כללי:
        </Typography>
        <Typography variant="body1" paragraph>
          Past Simple מציין זמן עבר – פעולות שהתחילו בעבר והסתיימו בעבר. נוכל לזהות את Past Simple בעזרת צירופי הזמן האופייניים לו, כגון <b>yesterday</b>, <b>last+week/month/year</b>, וצירופי זמן הכוללים את המילה <b>ago</b>.
        </Typography>

        {/* פועל העזר To be */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          פועל העזר To be:
        </Typography>
        <Typography variant="body1" paragraph>
          פועל העזר To be הופך בעבר ל-<b>was</b> ו-<b>were</b>. גוף יחיד יקבל את <b>was</b> וגוף רבים או <b>you</b> יקבל את <b>were</b>.
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="She was" /></ListItem>
          <ListItem><ListItemText primary="He was" /></ListItem>
          <ListItem><ListItemText primary="I was" /></ListItem>
          <ListItem><ListItemText primary="You were" /></ListItem>
          <ListItem><ListItemText primary="We were" /></ListItem>
          <ListItem><ListItemText primary="They were" /></ListItem>
        </List>

        {/* תוספות לפעלים */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          תוספות לפעלים:
        </Typography>
        <Typography variant="body1" paragraph>
          בזמן Past Simple, חלק מהפעלים יקבלו את אחת מהסיומות <b>d</b>, <b>ed</b>, או <b>ied</b>. כל הפעלים ישמרו על אותה צורה בכל הגופים.
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="פועל שמסתיים באות e יקבל תוספת d: dance → danced" /></ListItem>
          <ListItem><ListItemText primary="פועל שמסתיים באות y אחרי אות תנועה יקבל ed: enjoy → enjoyed" /></ListItem>
          <ListItem><ListItemText primary="פועל שמסתיים באות y אחרי אות עיצור יקבל ied: cry → cried" /></ListItem>
          <ListItem><ListItemText primary="פועל שמסתיים ברצף עיצור-תנועה-עיצור יכפיל את האות האחרונה: stop → stopped" /></ListItem>
        </List>

        {/* פעלים יוצאי דופן */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          פעלים יוצאי דופן:
        </Typography>
        <Typography variant="body1" paragraph>
          ישנם כ-200 פעלים שלא מקבלים את התוספות הרגילות, אלא מקבלים צורות שונות בעבר. הנה כמה מהפעלים הנפוצים:
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="go → went" /></ListItem>
          <ListItem><ListItemText primary="eat → ate" /></ListItem>
          <ListItem><ListItemText primary="buy → bought" /></ListItem>
          <ListItem><ListItemText primary="drink → drank" /></ListItem>
        </List>

        {/* דוגמאות */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          דוגמאות:
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Last week I was at a pop concert with friends.</b><br />
          <b>They drank beer yesterday.</b><br />
          <b>She was at school yesterday.</b><br />
          <b>They played football last week.</b><br />
          <b>He ate pizza yesterday.</b>
        </Typography>

        {/* משפט בשלילה */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          משפט בשלילה:
        </Typography>
        <Typography variant="body1" paragraph>
          כדי להפוך את המשפט לשלילה, נוסיף את המילה <b>didn't</b> לאחר הנושא, והפועל יופיע בצורת ה-Present Simple שלו. לדוגמה: <b>They didn't want to play with us.</b>
        </Typography>

        {/* משפט בשאלה */}
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          משפט בשאלה:
        </Typography>
        <Typography variant="body1">
          כדי להפוך את המשפט לשאלה, נוסיף את המילה <b>did</b> בתחילת המשפט, והפועל יופיע בצורת ה-Present Simple שלו. לדוגמה: <b>Did she read the book?</b>
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default PastSimpleRules;
