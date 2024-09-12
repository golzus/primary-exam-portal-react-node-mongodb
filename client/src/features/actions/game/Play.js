import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, IconButton, Grid, Paper, MenuItem, TextField } from "@mui/material";
import { MdFlip, MdLanguage, MdQuestionAnswer } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { useGetAllTestsMutation } from "../listWord/view/ListWordApiSlice";
import useAuth from "../../../hooks/useAuth";
import LOADING from "../../loadingAnimation/LoadingAnimation";

const Play = () => {
  const { _id } = useParams();
  
  const [selectedId, setSelectedId] = useState("");

 
  const [getAllTests, { error, data, isLoading }] = useGetAllTestsMutation();
  const { _id: user } = useAuth();
 
useEffect(()=>{
 console.log(selectedId,"id"); 
},[selectedId])

  useEffect(() => {
      getAllTests({ user });
    // if (data) {
    //   console.log(data, "data");
    //   if (data.data.length > 0) {
    //     setSelectedId(data.data[0].title); // הגדרת ערך ברירת מחדל שהוא הראשון ברשימה
    //   }
    // }
  }, []);

  const handleInputChange = (event) => {
    setSelectedId(event.target.value);
  };
 
if((error||isLoading||!data))return<LOADING/>
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                        {(!_id&&!selectedId)&&  <Typography variant="h6" sx={{ color: theme.palette.primary.main,alignItems:'center' }}>
         בחר מבחן שעם המילים האילו אתה רוצה לשחק
          </Typography>}
          {(_id||selectedId)&&  <Typography variant="h6" sx={{ color: theme.palette.primary.main,alignItems:'center' }}>
       כדי לשחק עם מילים של מבחן אחר הנך יכול לבחור מבחן אחר מתוך הרשימה
          </Typography>}
          </Box>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="מבחן"
            name="_id"
            value={selectedId}
            onChange={handleInputChange}
          >
            {data?.data?.map((test) => (
              <MenuItem key={test._id} value={test._id}>
                {test.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      
    
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            backgroundColor:'#f3f3e9',
            // backgroundColor: "#f3f3e9",
            gap: 2,
            padding: 4,
            backgroundColor: '#ffffff',  // צבע רקע לבן
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינהz
           

           
          }}
        >
          <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>
            Choose Your Game
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to={selectedId&&!_id ? `${selectedId}/memory` :selectedId&&_id?`/dash/play/${selectedId}/memory`: "memory"}
                  disabled={!_id&&!selectedId}
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
                <Typography variant="h6">Memory Game</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to={selectedId&&!_id ? `${selectedId}/multi-choice` :selectedId&&_id?`/dash/play/${selectedId}/multi-choice`: "multi-choice"}
                  disabled={!_id&&!selectedId}


               
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
                <Typography variant="h6">Multi-Choice</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to={selectedId&&!_id ? `${selectedId}/wordgame` :selectedId&&_id?`/dash/play/${selectedId}/wordgame`: "wordgame"}
                  disabled={!_id&&!selectedId}

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
                <Typography variant="h6">Word Game</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to={selectedId&&!_id ? `${selectedId}/hangman` :selectedId&&_id?`/dash/play/${selectedId}/hangman`: "hangman"}
                  disabled={!_id&&!selectedId}


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

export default Play;
