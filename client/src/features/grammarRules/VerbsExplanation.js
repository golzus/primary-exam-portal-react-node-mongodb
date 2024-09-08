import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const VerbsExplanation = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      style={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom style={{ color: theme.palette.primary.main }}>
        פעלים באנגלית – מדריך ללמידה
      </Typography>

      {/* סעיף 1 - מה זה פעלים באנגלית */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          1. מה זה פעלים באנגלית?
        </Typography>
        <Typography variant="body1" gutterBottom>
          פעלים באנגלית הם מילים המתארות פעולה, כמו "ללכת", "לכתוב", "לאכול", ועוד. במשפטים רבים, הם מהווים את הליבה של המשפט ומסייעים להבנת ההקשר הכולל.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="I walk to school every day." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="She writes a letter." />
          </ListItem>
        </List>
      </Box>

      {/* סעיף 2 - סוגי פעלים באנגלית */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          2. שלושה סוגי פעלים באנגלית
        </Typography>
        <Typography variant="body1" gutterBottom>
          באנגלית יש שלושה סוגים עיקריים של פעלים: חזקים, חלשים, וחריגים.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="פעלים חזקים: לדוגמה, run -> ran" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="פעלים חלשים: לדוגמה, walk -> walked" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="פעלים חריגים: לדוגמה, go -> went" />
          </ListItem>
        </List>
      </Box>

      {/* סעיף 3 - הטיית פעלים בזמן */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          3. הטיות פעלים בזמנים שונים
        </Typography>
        <Typography variant="body1" gutterBottom>
          הפעלים האנגליים נוטים בזמנים שונים, כאשר הפעלים מופיעים ב-12 זמנים שונים. הזמנים הנפוצים ביותר הם הווה ועבר.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="הווה פשוט: I eat breakfast every day." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="עבר פשוט: I ate breakfast yesterday." />
          </ListItem>
        </List>
      </Box>

      {/* סעיף 4 - דקדוק באנגלית עם פעלים */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          4. פעלים ודקדוק
        </Typography>
        <Typography variant="body1" gutterBottom>
          הפעלים ממלאים תפקיד מרכזי בזמנים השונים באנגלית. חשוב לדעת להטות אותם בצורה נכונה על מנת לדבר בצורה תקינה.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="חיובי: She will go to school tomorrow." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="שלילה: She won't go to school tomorrow." />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default VerbsExplanation;
