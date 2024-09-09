
// export default Tips;import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormatListNumbered, TipsAndUpdates } from '@mui/icons-material';
import theme from '../../../theme'; // ייבוא ה-theme הקיים שלך

const Tips = () => {
  const tips = [
    {
      title: "חשיבה באנגלית יום יום",
      description: `אחת השיטות היעילות ביותר לשפר את שטף הדיבור באנגלית היא להתרגל לחשוב בשפה. נסו להקדיש לפחות 20 דקות ביום למחשבות באנגלית – למשל, כשאתם עושים פעולות שגרתיות כמו נהיגה, הליכה, או סידור הבית. ככל שתחזרו על הפעולה הזו, תצליחו לשפר את שטף הדיבור שלכם ולזכור מילים שנשכחו.`,
    },
    {
      title: "ללמוד ולהשתמש במילים כמו תינוקות",
      description: `כדי לשלוט באנגלית בצורה יעילה, אין צורך ללמוד כמות עצומה של מילים בבת אחת. דמיינו תינוקות שמתחילים לדבר – הם משתמשים בכמות מוגבלת מאוד של מילים, אבל מצליחים לתקשר בצורה טבעית ויעילה. כאשר אתם נתקלים במילה שאינכם יודעים, תוכלו לתאר אותה בצורה מעגלית. לדוגמה, אם אינכם זוכרים איך לומר "משקפיים", תוכלו לומר "The thing that helps you see, and you wear it on your face above your nose". עם הזמן, תצליחו לחשוב באנגלית בצורה טבעית.`,
    },
    {
      title: "תרגול חוזר של מילים חדשות",
      description: `כדי להטמיע מילה חדשה בזיכרון בצורה יעילה, חשוב להשתמש בה לפחות 200 פעמים במהלך חיי היום-יום. השתמשו במילה בכל הזדמנות אפשרית – בשיחות עם חברים, במהלך קריאת ספרים, או אפילו במחשבות פנימיות. ככל שתחזרו על המילה יותר, כך היא תהפוך לחלק בלתי נפרד מאוצר המילים שלכם.`,
    },
    {
      title: "שימוש בביטויים כלליים בעת תקיעות",
      description: `במהלך שיחה, ייתכן שתיתקל במילה שאתה לא מצליח לזכור. כדי להמשיך בשיחה בצורה שוטפת, השתמש בביטויים כלליים כמו "you know", או "whatever". זה יעזור לך לשמור על קצב הדיבור ולהימנע מהשהיות ממושכות.`,
    },
    {
      title: "הסבר על מילה במקום להשתמש בה",
      description: `כאשר לא מוצאים את המילה המתאימה, נסו לתאר אותה במילים אחרות. לדוגמה, במקום לומר "משחקייה", אפשר להגיד "the place where kids play in the afternoon". כך תוכלו להמשיך לדבר מבלי לעצור ולהיתקע על מילה ספציפית שלא זוכרים.`,
    },
    {
      title: "שימוש במילים נרדפות מאוצר המילים שלך",
      description: `במקרים שבהם אתה מחפש מילה אך אינך מצליח למצוא אותה, חפש מילה נרדפת מאוצר המילים שלך. לדוגמה, במקום לומר "שכחתי", אפשר להגיד "it slipped my mind". שימוש במילים נרדפות יכול לשפר את שטף הדיבור שלך ולמנוע מצבים של תקיעה בשיחה.`,
    },
    {
      title: "תרגול עם דוברי שפת אם",
      description: `כדי לשפר את היכולת שלך לדבר בצורה טבעית ובביטחון, נסה לדבר כמה שיותר עם דוברי אנגלית שפת אם. זה יעזור לך להתאים את ההיגוי, ללמוד ביטויים מקומיים, ולהתרגל למגוון המבטאים שקיימים בשפה.`,
    },
    {
      title: "האזנה לאנגלית מדי יום",
      description: `בנוסף לשיחות, חשוב להאזין לאנגלית כמה שיותר – בין אם זה דרך פודקאסטים, סרטים, או שירים. האזנה לאנגלית תעזור לכם להתרגל לצלילים של השפה ולשפר את הבנת הנשמע.`,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: '65vw',
          height: '80vh', 
          margin: 'auto',
          backgroundColor: '#ffffff',  // צבע רקע לבן
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          טיפים לשיפור הדיבור באנגלית
        </Typography>
        <List>
          {tips.map((tip, index) => (
            <ListItem key={index} sx={{ marginBottom: '24px', display: 'flex', flexDirection: 'row-reverse' }}>
              <IconButton>
                <TipsAndUpdates sx={{ color: theme.palette.primary.main, marginRight: '8px' }} />
                <FormatListNumbered sx={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" color="primary" sx={{ marginLeft: '8px' }}>
                  {index + 1}
                </Typography>
              </IconButton>
              <ListItemText
                primary={
                  <Typography variant="h6" color="primary" sx={{ textAlign: 'right' }}>
                    {tip.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" sx={{ color: '#333', textAlign: 'right' }}>
                    {tip.description}
                  </Typography>
                }
                sx={{ textAlign: 'right' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default Tips;
