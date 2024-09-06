import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, IconButton, Grid, Paper, MenuItem, TextField } from "@mui/material";
import { MdFlip, MdLanguage, MdQuestionAnswer } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { useGetAllTestsMutation } from "../listWord/view/ListWordApiSlice";
import useAuth from "../../../hooks/useAuth";

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
  if(!_id)
  if(!selectedId) return(
  <Grid item xs={12} sm={6}>
  <TextField
    select
    fullWidth
    label="מבחן"
    name="id"
    value={selectedId}
    onChange={handleInputChange}
  >
    {data?.data?.map((test) => (
      <MenuItem key={test._id} value={test._id}>
        {test.title}
      </MenuItem>
    ))}
  </TextField>
</Grid>)
if((error||isLoading||!data))return <h1>loading...</h1>
  return (
    <ThemeProvider theme={theme}>
       
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
      
      {(selectedId||_id)&& (
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
            Choose Your Game
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Paper elevation={4} sx={{ padding: 2, textAlign: "center" }}>
                <IconButton
                  component={Link}
                  to={selectedId&&!_id ? `${selectedId}/memory` :selectedId&&_id?`/dash/play/${selectedId}/memory`: "memory"}

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
      )}
    </ThemeProvider>
  );
};

export default Play;
