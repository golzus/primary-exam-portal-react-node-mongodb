
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  // CircularProgress,
  Grid,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import { useAddListWordsMutation, useUpdateListWordsMutation } from "../view/ListWordApiSlice";
import useWordSpeaker from "../../../../hooks/useWordSpeaker";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
const AddWordsList = ({ WORDLIST }) => {
  // const { company } = useAuth();
  const { _id } = useParams();
  // const navigate = useNavigate();
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
  const [buttonText, setButtonText] = useState("SAVE TEST")
  const [buttonUpdate, setButtonUpdate] = useState("UPDATE TEST")
  const [seeWarningActive,setSeeWarningActive]=useState(false)
  const navigate = useNavigate()
  const [okActive,setOkActive]=useState(false)
  const speakWord = useWordSpeaker()
  useEffect(() => {
    if (WORDLIST) {
      setWords(WORDLIST.data.test);
    }
  }, [WORDLIST]);
  useEffect(() => {
    if (addSuccess) {
      setButtonText(<><CheckCircleIcon /> Successfully Added</>);
      setTimeout(() => {
        setButtonText("SAVE TEST");

        navigate("/dash/wordsList");
      }, 2000);
    }
  }, [addSuccess])
  useEffect(() => {
    if (updateLoading) {
      setButtonUpdate('....Updating')
    }
    if (updateSuccess) {
      setButtonUpdate(<><CheckCircleIcon />Successfully Update</>)
      setTimeout(() => {
        setButtonUpdate('UPDATE TEST')
        navigate("/dash/wordsList");

      }, 2000);
    }
  }, [updateSuccess, updateLoading])
  useEffect(() => {
    if (_id && WORDLIST) {
      setTitle(WORDLIST.data.title);

      setDate(WORDLIST.data.date?.toString().slice(0, 10));
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

if(okActive||!active){
    setButtonText("Adding......");
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
      seeWords: seeWords
    };

    if (_id) {
      listObject._id = _id;
      updateListWords(listObject);
    } else {
      addListWords(listObject);
    }}
 else
    setSeeWarningActive(true)
  };
const backToFuncSubmit=(e)=>{
  setOkActive(true)
  setSeeWarningActive(false)
   handleSubmitSave(e)
}
  const handleInitialDetailsSubmit = () => {
    setOpenDialog(false);
  };
  const handleWarningClose=()=>{
    setSeeWarningActive(false)
  }

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      if (words[index].word && words[index].translate) {
        addNewRow();
      }
    }
  };



  const handleListen = (word) => {
    speakWord(word)
  }

  return (
    <Box className="background-animation" sx={{
      width: '100%', maxWidth: '210mm', margin: 'auto', p: 3, padding: '20px',
      borderRadius: '16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
      overflowY: 'auto',
    }}>
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
            // label="Date"
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
            <InputLabel id="active-label">Status</InputLabel>
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
              <InputLabel id="active-label">Status</InputLabel>
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
                    <IconButton onClick={() => handleListen(row.word)}
                      className='wordSpeakerButton'
                    >
                      <HiOutlineSpeakerWave />
                    </IconButton>

                    {/* <IconButton onClick={() => playSound(row.word)}>
                      <VolumeUp />
                    </IconButton> */}
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
              {_id ? buttonUpdate : buttonText}
            </Button>
            <Button onClick={addNewRow} variant="contained" color="secondary" sx={{ ml: 2 }}>
              Add New Row
            </Button>
          </Box>
        </form>
        {seeWarningActive&& (
            <Box mt={3} textAlign="center">
              <Typography variant="contained" sx={{ color: "maroon", mb: 2 }}>
                עשית את הבוחן כ-active לאחר מכן אין אפשרות לעשות שינויים בבוחן!
                <br />
האם הינך בטוח בכך?
              </Typography>
              <Box mt={2}>
                <Button
                type="submit"
                  variant="contained"
                  color="primary"
                  onClick={backToFuncSubmit}
                  sx={{ mr: 1 }}
                >
                  כן
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                   onClick={handleWarningClose}
                >
                  חזרה
                </Button>
              </Box>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default AddWordsList;





