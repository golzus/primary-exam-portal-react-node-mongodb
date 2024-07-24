





// import React, { useState } from "react";
// import { useAddListWordsMutation } from "../view/ListWordApiSlice";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../../hooks/useAuth";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TextField,
//   Paper,
//   IconButton,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from "@mui/material";
// import { VolumeUp } from "@mui/icons-material";
// import { MdDelete } from "react-icons/md";
// import { useSelector } from "react-redux";
// import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";

// const AddWordsList = () => {
//   const { company } = useAuth();
//   const [addListWords, { isError, error, isSuccess, isLoading, data }] = useAddListWordsMutation();
//   const navigate = useNavigate();

//   const [words, setWords] = useState([{ word: "", translate: "", answer: "", correct: false }]);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [active, setActive] = useState(true);
//   const [countListenToWord, setCountListenToWord] = useState(5);
//   const [openDialog, setOpenDialog] = useState(true);

//   const { chosenClass } = useSelector((state) => state.schoolAndClass);

//   if (!chosenClass) return <CurrentSchoolAndClass />;

//   if (isLoading) return <Typography variant="h6" align="center">Loading...</Typography>;

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
//     const formData = new FormData(e.target);
//     const listObject = Object.fromEntries(formData.entries());
//     listObject.test = words;
//     listObject.class = chosenClass;
//     listObject.title = title;
//     listObject.date = date;
//     listObject.active = active;
//     listObject.countListenToWord = countListenToWord;
//     addListWords(listObject);
//   };

//   const handleInitialDetailsSubmit = () => {
//     setOpenDialog(false);
//   };

//   const playSound = (word) => {
//     const utterance = new SpeechSynthesisUtterance(word);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <Box className="background-animation" sx={{ width: '100%', maxWidth: '210mm', margin: 'auto', p: 3 }}>
//       {/* Dialog for initial details */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Enter Test Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             name="title"
//             label="Title"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextField
//             name="date"
//             type="date"
//             label="Date"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel id="active-label">Active</InputLabel>
//             <Select
//               labelId="active-label"
//               id="active"
//               name="active"
//               label="Active"
//               value={active}
//               onChange={(e) => setActive(e.target.value)}
//             >
//               <MenuItem value={true}>Enabled</MenuItem>
//               <MenuItem value={false}>Disabled</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             name="countListenToWord"
//             type="number"
//             label="Number of Times to Play Each Word"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             value={countListenToWord}
//             onChange={(e) => setCountListenToWord(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleInitialDetailsSubmit} color="primary">
//             Start Adding Words
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Main form for adding words */}
//       <Box p={3} component={Paper} elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="h6" align="center" gutterBottom>
//           {date}
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         <form onSubmit={handleSubmitSave}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Word</TableCell>
//                 <TableCell>Translate</TableCell>
//                 <TableCell>Play</TableCell>
//                 <TableCell>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {words.map((row, index) => (
//                 <TableRow
//                   key={index}
//                   sx={{
//                     '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
//                     '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
//                   }}
//                 >
//                   <TableCell>
//                     <TextField
//                       size="small"
//                       variant="standard"
//                       value={row.word}
//                       onChange={(e) => handleWordChange(index, 'word', e.target.value)}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           e.preventDefault();
//                           addNewRow();
//                         }
//                       }}
//                       sx={{ width: '150px' }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       size="small"
//                       variant="standard"
//                       value={row.translate}
//                       onChange={(e) => handleWordChange(index, 'translate', e.target.value)}
//                       sx={{ width: '150px' }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => playSound(row.word)}>
//                       <VolumeUp />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => deleteRow(index)} color="error">
//                       <MdDelete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
//             <Button type="submit" variant="contained" color="primary">Save List</Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default AddWordsList;





import React, { useState } from "react";
import { useAddListWordsMutation } from "../view/ListWordApiSlice";
import { useNavigate } from "react-router-dom";
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
  MenuItem
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import WordSpeaker from "./WordSpeaker"; // Import the WordSpeaker component

const AddWordsList = () => {
  const { company } = useAuth();
  const [addListWords, { isError, error, isSuccess, isLoading, data }] = useAddListWordsMutation();
  const navigate = useNavigate();

  const [words, setWords] = useState([{ word: "", translate: "", answer: "", correct: false }]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(true);
  const [countListenToWord, setCountListenToWord] = useState(5);
  const [openDialog, setOpenDialog] = useState(true);

  const { chosenClass } = useSelector((state) => state.schoolAndClass);

  if (!chosenClass) return <CurrentSchoolAndClass />;

  if (isLoading) return <Typography variant="h6" align="center">Loading...</Typography>;

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
    const formData = new FormData(e.target);
    const listObject = Object.fromEntries(formData.entries());
    listObject.test = words;
    listObject.class = chosenClass;
    listObject.title = title;
    listObject.date = date;
    listObject.active = active;
    listObject.countListenToWord = countListenToWord;
    addListWords(listObject);
  };

  const handleInitialDetailsSubmit = () => {
    setOpenDialog(false);
  };

  const playSound = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      if (words[index].word && words[index].translate) {
        addNewRow();
      } else {
        alert("Please fill out both word and translation fields before adding a new row.");
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
            <Button type="submit" variant="contained" color="primary">Save List</Button>
            <Button onClick={addNewRow} variant="contained" color="secondary" sx={{ ml: 2 }}>Add New Row</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddWordsList;
  