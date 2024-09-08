import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'; // לא יוצרים them חדש
import { FormatListNumbered } from '@mui/icons-material';
import theme from '../../../theme'; // ייבוא ה-theme הקיים שלך

const Tips = () => {
  const tips = [
    {
      title: "חשיבה באנגלית יום יום",
      description: `אחת השיטות היעילות ביותר לשפר את שטף הדיבור באנגלית היא להתרגל לחשוב בשפה...`,
    },
    {
      title: "תרגול חוזר של מילים חדשות",
      description: `כדי להטמיע מילה חדשה בזיכרון בצורה יעילה, חשוב להשתמש בה לפחות 200 פעמים במהלך חיי היום-יום...`,
    },
    {
      title: "שימוש בביטויים כלליים בעת תקיעות",
      description: `במהלך שיחה, ייתכן שתיתקל במילה שאתה לא מצליח לזכור...`,
    },
    {
      title: "הסבר על מילה במקום להשתמש בה",
      description: `כאשר לא מוצאים את המילה המתאימה, נסה לתאר אותה במילים אחרות...`,
    },
    {
      title: "שימוש במילים נרדפות מאוצר המילים שלך",
      description: `במקרים שבהם אתה מחפש מילה אך אינך מצליח למצוא אותה...`,
    },
    {
      title: "תרגול עם דוברי שפת אם",
      description: `כדי לשפר את היכולת שלך לדבר בצורה טבעית ובביטחון, נסה לדבר כמה שיותר עם דוברי אנגלית שפת אם...`,
    },
    {
      title: "האזנה לאנגלית מדי יום",
      description: `בנוסף לשיחות, חשוב להאזין לאנגלית כמה שיותר – בין אם זה דרך פודקאסטים, סרטים...`,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: '800px',
          margin: 'auto',
          backgroundColor: '#f3f3e9',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          טיפים לשיפור הדיבור באנגלית
        </Typography>
        <List>
          {tips.map((tip, index) => (
            <ListItem key={index} style={{ marginBottom: '16px' }}>
              <IconButton>
                <FormatListNumbered sx={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" color="primary" style={{ marginLeft: '8px' }}>
                  {index + 1}
                </Typography>
              </IconButton>
              <ListItemText
                primary={<Typography variant="h6" color="primary">{tip.title}</Typography>}
                secondary={<Typography variant="body1">{tip.description}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default Tips;
