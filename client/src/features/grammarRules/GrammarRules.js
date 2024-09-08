// import React, { useState } from 'react';
// import { Box, Typography, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
// import { AccessTime, History, Event, Schedule, ExpandLess, ExpandMore } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../../theme';
// import { Link } from 'react-router-dom';

// const tenses = [
//   {
//     title: "עבר פשוט",
//     icon: <History sx={{ color: theme.palette.primary.main }} />,
//     rules: `העבר הפשוט משמש לתיאור פעולות שהסתיימו בזמן מסוים בעבר... לדוגמה: I walked to the park.`,
//   },
//   {
//     title: "עתיד פשוט",
//     icon: <Event sx={{ color: theme.palette.primary.main }} />,
//     rules: `העתיד הפשוט משמש לתיאור פעולות שיקרו בעתיד... לדוגמה: I will walk to the park.`,
//   },
//   {
//     title: "הווה ממושך",
//     icon: <Schedule sx={{ color: theme.palette.primary.main }} />,
//     rules: `הווה ממושך משמש לתיאור פעולות המתרחשות כעת או מתמשכות... לדוגמה: I am walking to the park.`,
//   },
//   {
//     title: "עבר ממושך",
//     icon: <AccessTime sx={{ color: theme.palette.primary.main }} />,
//     rules: `העבר הממושך מתאר פעולות שנעשו בעבר לתקופה מסוימת... לדוגמה: I was walking to the park when it started to rain.`,
//   },
// ];

// const GrammarRules = () => {
//   const [openTense, setOpenTense] = useState(null);

//   const handleToggle = (index) => {
//     setOpenTense(openTense === index ? null : index);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           maxWidth: '800px',
//           margin: 'auto',
//           backgroundColor: '#f3f3e9',
//           padding: '20px',
//           borderRadius: '8px',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           כללי דקדוק באנגלית - זמנים
//         </Typography>
//         <List>
//           {tenses.map((tense, index) => (
//             <div key={index}>
//               <ListItem button onClick={() => handleToggle(index)}>
//                 <IconButton>{tense.icon}</IconButton>
//                 <ListItemText
//                   primary={<Typography variant="h6" color="primary">{tense.title}</Typography>}
//                 />
//                 {openTense === index ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openTense === index} timeout="auto" unmountOnExit>
//                 <Box sx={{ padding: '16px' }}>
//                   <Typography variant="body1">{tense.rules}</Typography>
//                 </Box>
//               </Collapse>
//             </div>
//           ))}
//         </List>


//         <IconButton
//                   component={Link}
//                   to= 'past-simple-rules'

//                   sx={{
//                     fontSize: 60,
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       transition: "transform 0.3s ease-in-out",
//                     },
//                   }}
//                 >
//                   <Schedule />
//                 </IconButton>
//                 <IconButton
//                   component={Link}
//                   to= 'future-simple-rules'

//                   sx={{
//                     fontSize: 60,
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       transition: "transform 0.3s ease-in-out",
//                     },
//                   }}
//                 >
//                   <Schedule />
//                 </IconButton>
//                 <IconButton
//                   component={Link}
//                   to= 'verb-explanation'

//                   sx={{
//                     fontSize: 60,
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       transition: "transform 0.3s ease-in-out",
//                     },
//                   }}
//                 >
//                   <Schedule />
//                 </IconButton>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default GrammarRules;



import { Link, useParams } from "react-router-dom";
import { Box, Typography, IconButton, Grid, Paper, MenuItem, TextField } from "@mui/material";
import { MdFlip, MdLanguage, MdQuestionAnswer } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";


const GrammarRules = () => {
 
  return (
    <ThemeProvider theme={theme}>
    
     
      
    
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "65vh",
            backgroundColor: "#f3f3e9",
            gap: 2,
            padding: 4,
          }}
        >
          <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>
            Choose Which Time Do You Want To Learn:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to='future-simple-rules'
                     sx={{
                    fontSize: 60,
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <MdFlip />
                </IconButton>
                <Typography variant="h6">עתיד פשוט</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to='verb-explanation'             
                  sx={{
                    fontSize: 60,
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <MdLanguage />
                </IconButton>
                <Typography variant="h6">פועל באנגלית</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to='past-simple-rules'
                  sx={{
                    fontSize: 60,
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <MdQuestionAnswer />
                </IconButton>
                <Typography variant="h6">עבר פשוט</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to='past-simple-rules'


                  sx={{
                    fontSize: 60,
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <FaUserSecret />
                </IconButton>
                <Typography variant="h6">Hangman</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      
    </ThemeProvider>
  );
};

export default GrammarRules;
