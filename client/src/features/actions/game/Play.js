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
  const [getAllTests, { error, data, isLoading }] = useGetAllTestsMutation();
  const { _id: user } = useAuth();
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (!_id) {
      getAllTests({ user });
    }
    if (data) {
      console.log(data, "data");
      if (data.data.length > 0) {
        setSelectedId(data.data[0].title); // הגדרת ערך ברירת מחדל שהוא הראשון ברשימה
      }
    }
  }, [_id, data, getAllTests, user]);

  const handleInputChange = (event) => {
    setSelectedId(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      {!_id && data && (
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="_id"
            name="_id"
            value={selectedId}
            onChange={handleInputChange}
          >
            {data.data.map((test) => (
              <MenuItem key={test._id} value={test.title}>
                {test.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}

      {_id && (
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
                  to="memory"
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
                  to="multi-choice"
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
                  to="wordgame"
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
                  to="hangman"
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
