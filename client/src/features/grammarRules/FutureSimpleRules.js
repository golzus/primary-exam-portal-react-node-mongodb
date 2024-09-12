import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const FutureSimpleRules = () => {
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
        Future Simple – כללי הזמן לעתיד פשוט
      </Typography>

      {/* סעיף 1 */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          1. שימוש בעתיד פשוט
        </Typography>
        <Typography variant="body1" gutterBottom>
          עתיד פשוט הוא זמן שנשתמש בו לתאר פעולות שיתרחשו בעתיד. כל מה שצריך להוסיף זה את פועל העזר <strong>will</strong>.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="I will call you tomorrow." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="I will help now." />
          </ListItem>
        </List>
      </Box>

      {/* סעיף 2 */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          2. ביטויי זמן אופייניים לעתיד פשוט
        </Typography>
        <Typography variant="body1" gutterBottom>
          ביטויי זמן הנפוצים לשימוש בעתיד פשוט כוללים: <strong>next _______, soon, in _________, tomorrow</strong>.
        </Typography>
      </Box>

      {/* סעיף 3 */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          3. נוסחאות משפטיות לעתיד פשוט
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>חיובי:</strong> subject + will + V1 <br />
          דוגמה: <em>I will talk to you soon.</em>
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>שלילה:</strong> subject + won’t + V1 <br />
          דוגמה: <em>I won't talk to you soon.</em>
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>שאלות:</strong> Will + subject + V1? <br />
          דוגמה: <em>Will I talk to you tomorrow?</em>
        </Typography>
      </Box>

      {/* סעיף 4 - משפטי BE */}
      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.secondary.main }}>
          4. משפטי BE בעתיד פשוט
        </Typography>
        <Typography variant="body1" gutterBottom>
          הצורה של הפועל <strong>be</strong> בעתיד היא <strong>will be</strong>.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="I will be in Tel Aviv tomorrow." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="I won't be in Tel Aviv tomorrow." />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default FutureSimpleRules;
