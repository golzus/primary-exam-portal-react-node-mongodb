import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FaExclamation } from 'react-icons/fa';

const VerbsExplanation = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      style={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: '10px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
        height: '68vh', // גובה מוגדר
        overflowY: 'auto', // גלילה פנימית כאשר התוכן חורג
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom style={{ color: theme.palette.primary.main }}>
        פעלים באנגלית – מדריך ללמידה
      </Typography>

      {/* הסבר כללי על פעלים */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          מה זה פעלים באנגלית?
        </Typography>
        <Typography variant="body1" gutterBottom>
          פעלים באנגלית הם מילים שמתארות פעולה, כמו "ללכת", "לאכול", "לכתוב" ועוד. הם מהווים חלק מרכזי במשפט, וללא פועל קשה לבטא פעולה.
        </Typography>
      </Box>

      {/* סעיף 1 - פעלים חזקים */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          1. פעלים חזקים
        </Typography>
        <Typography variant="body1" gutterBottom>
          פעלים חזקים הם פעלים שבהם השינוי לזמן עבר מתבצע בתוך הפועל עצמו, ולא באמצעות תוספת חיצונית. השינוי הזה מתבצע לרוב בתנועות הפועל.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Run -> Ran (הפועל 'לרוץ' הופך ל'רצתי' בעבר)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Sing -> Sang (הפועל 'לשיר' הופך ל'שרתי' בעבר)" />
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom>
          השינוי מתבצע בתנועה הפנימית של הפועל (כמו שינוי מ-'u' ל-'a'), ולכן הם נקראים 'פעלים חזקים'. השינוי הוא פנימי ללא תוספת סיומת.
        </Typography>
      </Box>

      {/* סעיף 2 - פעלים חלשים */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          2. פעלים חלשים
        </Typography>
        <Typography variant="body1" gutterBottom>
          פעלים חלשים הם פעלים שבהם לא מתבצע שינוי פנימי, אלא מתווספת להם סיומת של זמן עבר, לרוב -ed.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Walk -> Walked (הפועל 'ללכת' הופך ל'הלכתי' בעבר)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Talk -> Talked (הפועל 'לדבר' הופך ל'דיברתי' בעבר)" />
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom>
          הפעלים עצמם לא משתנים, אלא מקבלים תוספת חיצונית של זמן עבר. זאת הסיבה לקרוא להם 'פעלים חלשים'.
        </Typography>
      </Box>

      {/* סעיף 3 - פעלים חריגים */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          3. פעלים חריגים
        </Typography>
        <Typography variant="body1" gutterBottom>
          פעלים חריגים הם פעלים שהשינוי שלהם לזמן עבר אינו תואם כלל קבוע, ולכן יש ללמוד אותם בצורה פרטנית.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Go -> Went (הפועל 'ללכת' הופך ל'הלכתי' בעבר)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="דוגמה: Wake -> Woke (הפועל 'להתעורר' הופך ל'התעוררתי' בעבר)" />
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom>
          אין כלל ברור לגבי הפעלים החריגים, ולכן יש ללמוד כל פועל בנפרד.
        </Typography>
        <IconButton
                component={Link}
                to="irregular-rules"
                sx={{
                  fontSize: 60,
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              ><Typography>לרשימה של החריגים השכיחים</Typography>
              <FaExclamation  />
              </IconButton>
      </Box>
    </Paper>
  );
};

export default VerbsExplanation;
