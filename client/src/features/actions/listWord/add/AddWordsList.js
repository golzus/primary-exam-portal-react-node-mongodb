
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import WordSpeaker from "./WordSpeaker";
import { useAddListWordsMutation, useUpdateListWordsMutation } from "../view/ListWordApiSlice";

const AddWordsList = ({ WORDLIST }) => {
  const { company } = useAuth();
  const { _id } = useParams();
  const navigate = useNavigate();
  const [addListWords, { isError: addError, error: addApiError, isSuccess: addSuccess, isLoading: addLoading }] = useAddListWordsMutation();
  const [updateListWords, { isError: updateError, error: updateApiError, isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateListWordsMutation();
  const [seeWords, setSeeWords] = useState(false);
  const [words, setWords] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(true);
  const [countListenToWord, setCountListenToWord] = useState(5);
  const [openDialog, setOpenDialog] = useState(true);

  const { chosenClass } = useSelector((state) => state.schoolAndClass);

  useEffect(() => {
    if (WORDLIST) {
      setWords(WORDLIST.data.test);
    }
  }, [WORDLIST]);

  useEffect(() => {
    if (_id && WORDLIST) {
      setTitle(WORDLIST.data.title);
      setDate(WORDLIST.data.date);
      setActive(WORDLIST.data.active);
      setCountListenToWord(WORDLIST.data.countListenToWord);
      setOpenDialog(false)
    }
  }, [_id, WORDLIST]);

  if (!chosenClass) return <CurrentSchoolAndClass />;

  const handleWordChange = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const addNewRow = () => {
    setWords([...words, { word: "", translate: "", answer: "", correct: false }]);
  };

  const deleteRow = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSubmitSave = (e) => {
    e.preventDefault();
    // Verify that all word fields are filled
    for (let i = 0; i < words.length; i++) {
      if (!words[i].word || !words[i].translate) {
         alert("Please fill out all word and translation fields before saving.");
        return;
      }
    }

    const listObject = {
      test: words,
      class: chosenClass,
      title: title,
      date: date,
      active: active,
      countListenToWord: countListenToWord,
      seeWords:seeWords
    };

    if (_id) {
      listObject._id = _id;
      updateListWords(listObject);
    } else {
      addListWords(listObject);
    }
  };

  const handleInitialDetailsSubmit = () => {
    setOpenDialog(false);
  };

  const playSound = (word) => {
   < WordSpeaker word={word}/>
    // const utterance = new SpeechSynthesisUtterance(word);
    // speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      if (words[index].word && words[index].translate) {
        addNewRow();
      } 
    }
  };

  return (
    <Box className="background-animation" sx={{ width: '100%', maxWidth: '210mm', margin: 'auto', p: 3 }}>
      {/* Dialog for initial details */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Test Details</DialogTitle>
        <DialogContent>
          <TextField
            required
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="date"
            type="date"
            label="Date"
            fullWidth
            variant="outlined"
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />


<FormControl fullWidth variant="outlined" margin="normal" size="small">
                  <InputLabel id="seeWords-label">See Words</InputLabel>
                  <Select
                    labelId="seeWords-label"
                    id="seeWords"
                    name="seeWords"
                    label="See Words"
                    value={seeWords}
                    onChange={(e) => setSeeWords(e.target.value)}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="active-label">Active</InputLabel>
            <Select
              labelId="active-label"
              id="active"
              name="active"
              label="Active"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              <MenuItem value={true}>Enabled</MenuItem>
              <MenuItem value={false}>Disabled</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="countListenToWord"
            type="number"
            label="Number of Times to Play Each Word"
            fullWidth
            variant="outlined"
            margin="normal"
            value={countListenToWord}
            onChange={(e) => setCountListenToWord(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInitialDetailsSubmit} color="primary">
            Start Adding Words
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main form for adding words */}
      <Box p={3} component={Paper} elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {date}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" margin="normal" size="small">
                  <InputLabel id="active-label">Active</InputLabel>
                  <Select
                    labelId="active-label"
                    id="active"
                    name="active"
                    label="Active"
                    value={active}
                    onChange={(e) => setActive(e.target.value === 'true')}
                  >
                    <MenuItem value={true}>Enabled</MenuItem>
                    <MenuItem value={false}>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" margin="normal" size="small">
                  <InputLabel id="seeWords-label">See Words</InputLabel>
                  <Select
                    labelId="seeWords-label"
                    id="seeWords"
                    name="seeWords"
                    label="See Words"
                    value={seeWords}
                    onChange={(e) => setSeeWords(e.target.value)}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
                
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="countListenToWord"
                  type="number"
                  label="Number of Times to Play Each Word"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={countListenToWord}
                  onChange={(e) => setCountListenToWord(e.target.value)}
                />
              </Grid>
            </Grid>


        <form onSubmit={handleSubmitSave}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Word</TableCell>
                <TableCell>Translate</TableCell>
                <TableCell>Play</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                    '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
                  }}
                >
                  <TableCell>
                    <TextField
                      size="small"
                      variant="standard"
                      value={row.word}
                      onChange={(e) => handleWordChange(index, 'word', e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                      sx={{ width: '150px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      variant="standard"
                      value={row.translate}
                      onChange={(e) => handleWordChange(index, 'translate', e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                      sx={{ width: '150px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => playSound(row.word)}>
                      <VolumeUp />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteRow(index)} color="error">
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              { _id ? 'Update List' : 'Save List' }
            </Button>
            <Button onClick={addNewRow} variant="contained" color="secondary" sx={{ ml: 2 }}>
              Add New Row
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddWordsList;




// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Box, Typography, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import WordSpeaker from './WordSpeaker';
// import { useAddListWordsMutation, useUpdateListWordsMutation } from '../view/ListWordApiSlice';
// import CurrentSchoolAndClass from '../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass';
// import { useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import VolumeUp from '@mui/icons-material/VolumeUp';
// import MdDelete from '@mui/icons-material/Delete';
// import useAuth from '../../../../hooks/useAuth';

// const AddWordsList = ({ WORDLIST }) => {
//   const { company } = useAuth();
//   const { _id } = useParams();
//   const navigate = useNavigate();
//   const [addListWords, { isError: addError, error: addApiError, isSuccess: addSuccess, isLoading: addLoading }] = useAddListWordsMutation();
//   const [updateListWords, { isError: updateError, error: updateApiError, isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateListWordsMutation();
//   const [seeWords, setSeeWords] = useState(false);
//   const [words, setWords] = useState([]);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [active, setActive] = useState(true);
//   const [countListenToWord, setCountListenToWord] = useState(5);
//   const [openDialog, setOpenDialog] = useState(true);

//   const { chosenClass } = useSelector((state) => state.schoolAndClass);

//   const translateRefs = useRef([]);

//   useEffect(() => {
//     if (WORDLIST) {
//       setWords(WORDLIST.data.test);
//     }
//   }, [WORDLIST]);

//   useEffect(() => {
//     if (_id && WORDLIST) {
//       setTitle(WORDLIST.data.title);
//       setDate(WORDLIST.data.date);
//       setActive(WORDLIST.data.active);
//       setCountListenToWord(WORDLIST.data.countListenToWord);
//       setOpenDialog(false);
//     }
//   }, [_id, WORDLIST]);

//   if (!chosenClass) return <CurrentSchoolAndClass />;

//   const handleWordChange = (index, field, value) => {
//     const newWords = [...words];
//     newWords[index][field] = value;
//     setWords(newWords);
//   };

//   const addNewRow = () => {
//     setWords([...words, { word: "", translate: "", answer: "", correct: false }]);
//   };

//   const deleteRow = (index) => {
//     setWords(words.filter((_, i) => i !== index));
//   };

//   const handleSubmitSave = (e) => {
//     e.preventDefault();
//     if (!title) {
//       alert("Please enter a title before saving.");
//       return;
//     }
//     for (let i = 0; i < words.length; i++) {
//       if (!words[i].word || !words[i].translate) {
//         alert("Please fill out all word and translation fields before saving.");
//         return;
//       }
//     }

//     const listObject = {
//       test: words,
//       class: chosenClass,
//       title: title,
//       date: date,
//       active: active,
//       countListenToWord: countListenToWord,
//       seeWords: seeWords,
//     };

//     if (_id) {
//       listObject._id = _id;
//       updateListWords(listObject);
//     } else {
//       addListWords(listObject);
//     }
//   };

//   const handleInitialDetailsSubmit = () => {
//     setOpenDialog(false);
//   };

//   const playSound = (word) => {
//     <WordSpeaker word={word} />;
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.key === 'Enter') {
//       if (words[index].word && words[index].translate) {
//         addNewRow();
//       } else if (words[index].word && !words[index].translate) {
//         translateRefs.current[index].focus();
//       } else {
//         alert("Please fill out both word and translation fields before adding a new row.");
//       }
//     }
//   };

//   return (
//     <Box className="background-animation" sx={{ width: '100%', maxWidth: '210mm', margin: 'auto', p: 3 }}>
//       <Box p={3} component={Paper} elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
//         {title ? (
//           <>
//             <Typography variant="h4" align="center" gutterBottom>
//               {title}
//             </Typography>
//             <Typography variant="h6" align="center" gutterBottom>
//               {date}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   required
//                   name="title"
//                   label="Title"
//                   fullWidth
//                   variant="outlined"
//                   margin="normal"
//                   size="small"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   error={!title}  // Show error if title is empty
//                   helperText={!title ? "Title is required" : ""}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   name="date"
//                   type="date"
//                   label="Date"
//                   fullWidth
//                   variant="outlined"
//                   margin="normal"
//                   size="small"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl fullWidth variant="outlined" margin="normal" size="small">
//                   <InputLabel id="seeWords-label">See Words</InputLabel>
//                   <Select
//                     labelId="seeWords-label"
//                     id="seeWords"
//                     name="seeWords"
//                     label="See Words"
//                     value={seeWords}
//                     onChange={(e) => setSeeWords(e.target.value)}
//                   >
//                     <MenuItem value={true}>Yes</MenuItem>
//                     <MenuItem value={false}>No</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl fullWidth variant="outlined" margin="normal" size="small">
//                   <InputLabel id="active-label">Active</InputLabel>
//                   <Select
//                     labelId="active-label"
//                     id="active"
//                     name="active"
//                     label="Active"
//                     value={active}
//                     onChange={(e) => setActive(e.target.value)}
//                   >
//                     <MenuItem value={true}>Enabled</MenuItem>
//                     <MenuItem value={false}>Disabled</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   name="countListenToWord"
//                   type="number"
//                   label="Number of Times to Play Each Word"
//                   fullWidth
//                   variant="outlined"
//                   margin="normal"
//                   size="small"
//                   value={countListenToWord}
//                   onChange={(e) => setCountListenToWord(e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//             <form onSubmit={handleSubmitSave}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Word</TableCell>
//                     <TableCell>Translation</TableCell>
//                     <TableCell>Sound</TableCell>
//                     <TableCell>Delete</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {words.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <TextField
//                           size="small"
//                           variant="standard"
//                           value={row.word}
//                           onChange={(e) => handleWordChange(index, 'word', e.target.value)}
//                           onKeyPress={(e) => handleKeyPress(e, index)}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           size="small"
//                           variant="standard"
//                           value={row.translate}
//                           onChange={(e) => handleWordChange(index, 'translate', e.target.value)}
//                           inputRef={(el) => translateRefs.current[index] = el}
//                           onKeyPress={(e) => handleKeyPress(e, index)}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => playSound(row.word)}>
//                           <VolumeUp />
//                         </IconButton>
//                       </TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => deleteRow(index)}>
//                           <MdDelete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               <Button type="button" onClick={addNewRow} color="primary" variant="contained">
//                 Add Row
//               </Button>
//               <Button type="submit" color="primary" variant="contained" disabled={!title}>
//                 { _id ? "Update" : "Save" }
//               </Button>
//             </form>
//           </>
//         ) : (
//           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//             <DialogTitle>Enter Test Details</DialogTitle>
//             <DialogContent>
//               <TextField
//                 required
//                 name="title"
//                 label="Title"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 size="small"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 error={!title}  // Show error if title is empty
//                 helperText={!title ? "Title is required" : ""}
//               />
//               <TextField
//                 name="date"
//                 type="date"
//                 label="Date"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 size="small"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//               <FormControl fullWidth variant="outlined" margin="normal" size="small">
//                 <InputLabel id="seeWords-label">See Words</InputLabel>
//                 <Select
//                   labelId="seeWords-label"
//                   id="seeWords"
//                   name="seeWords"
//                   label="See Words"
//                   value={seeWords}
//                   onChange={(e) => setSeeWords(e.target.value)}
//                 >
//                   <MenuItem value={true}>Yes</MenuItem>
//                   <MenuItem value={false}>No</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth variant="outlined" margin="normal" size="small">
//                 <InputLabel id="active-label">Active</InputLabel>
//                 <Select
//                   labelId="active-label"
//                   id="active"
//                   name="active"
//                   label="Active"
//                   value={active}
//                   onChange={(e) => setActive(e.target.value)}
//                 >
//                   <MenuItem value={true}>Enabled</MenuItem>
//                   <MenuItem value={false}>Disabled</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 name="countListenToWord"
//                 type="number"
//                 label="Number of Times to Play Each Word"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 size="small"
//                 value={countListenToWord}
//                 onChange={(e) => setCountListenToWord(e.target.value)}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleInitialDetailsSubmit} color="primary">
//                 Start Adding Words
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AddWordsList;
