
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import Speech from 'react-speech';


import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa";
// import WordComparison from "./WordComparison";
import {
  useGetSingleTestMutation,
  useUpdateTestMutation,
} from "../view/ListWordApiSlice";
import useWordComparison from "../../../../hooks/useWordComparison";
import WordSpeaker from "../add/WordSpeaker";
import useWordSpeaker from "../../../../hooks/useWordSpeaker";
import {  FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Test = () => {


  
    const [selectedSpeed, setSelectedSpeed] = useState(1); // ברירת המחדל למהירות רגילה
  
    const handleSpeedChange = (event) => {
      setSelectedSpeed(Number(event.target.value));
    };
  
    const handleSpeakClick = () => {
      speakWord("identify", selectedSpeed);
    };



  const compareWords = useWordComparison();
  const [markStudent, setMarkStudent] = useState(0);
  const [seeMark, setSeeMark] = useState(false);
  const [seeWarning, setSeeWarning] = useState(false);
  const [sureStarting, setSureStarting] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [listenCounts, setListenCounts] = useState([]);
  const { _id } = useParams();
  const { trying } = useParams()
  const isTrying = trying === "true";

  const [
    updateTest,
    {
      data: updatedData,
      error,
      isSuccess: isUpdateSuccess,
      isError,
      isLoading: loading,
    },
  ] = useUpdateTestMutation();
  const [
    getSingleTest,
    { isSuccess, data: listWord, isLoading, isError: err },
  ] = useGetSingleTestMutation();

  useEffect(() => {
    getSingleTest({ _id });
  }, [_id]);
  useEffect(() => {
    if (listWord) {
      if (listWord.data.complete&&!isTrying) {
        setSeeMark(true);
        setSureStarting(true);
        setMarkStudent(listWord.data.mark)
      }

      // setSureStarting(true);
    }
  }, [listWord]);
  useEffect(() => {
    if (isSuccess) {
      // Set the word list
      if(!isTrying)
      setWordList(listWord.data.test);
      else {
        const listTrying = listWord.data.test.map((item) => ({
          word: item.word,
          translate: item.translate,
          correct: false,
          answer: ""
        }));
        setWordList(listTrying);
      }
      // Initialize listen counts with the correct size and values
      const initialListenCounts = new Array(listWord.data.test.length).fill(
        listWord.data.countListenToWord
      );
      setListenCounts(initialListenCounts);
    }
  }, [isSuccess, listWord],wordList);
  const speakWord=useWordSpeaker()

  useEffect(() => {
    if (isTrying) {
      setSureStarting(true);
    }
    if (sureStarting && !isTrying) {
      updateTest({ _id: _id, active: false, complete: true });
    }
  }, [trying, sureStarting, _id, isUpdateSuccess, isError, loading, updateTest]);

  const handleChange = (index, value) => {
    const updatedList = wordList.map((item, i) =>
      i === index
        ? { ...item, answer: value } // Create a new object with the updated answer
        : item
    );
    setWordList(updatedList);
  };

  const handleWantsStart = () => {
    setSureStarting(true);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isTrying === false)
      setSeeWarning(true);
    else {
      setSeeWarning(false);
      setSeeMark(true)
      checkTest()
    }

  };

  const handleWarningClose = () => {
    setSeeWarning(false);
  };

  const updateWordList = (index, isCorrect) => {
    setWordList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, correct: isCorrect } : item
      )
    );
  };

  // const handleResult = (index, isCorrect) => {
  //   updateWordList(index, isCorrect);
  // };



  const handleListen = (index, word) => {

    // Decrement the listen count if greater than zero
    if (listenCounts[index] > 0) {
      const updatedListenCounts = [...listenCounts];
      updatedListenCounts[index] -= 1;
      setListenCounts(updatedListenCounts);
    }
    speakWord(word,selectedSpeed);

    // e.stopPropagation();
    const voices = window.speechSynthesis.getVoices();

    // Try to find a US English female voice (priority)
    const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Female'));

    // Fallback to any US English voice
    const fallbackVoice = voices.find(voice => voice.lang === 'en-US');

    const voice = preferredVoice || fallbackVoice;

    if (voice) {
     <Speech
        text={word}
        voice="Google UK English Female" // ניתן לשנות לקול המועדף עליך
        rate="1" // מהירות ההקראה
        pitch="1" // גובה הצליל
        volume="1" // עוצמת הקול
      />  

    } else {
      console.warn('No US English voice found');
    }



  };
   // const checkTest = (e) => {
  //   setSeeWarning(false);
  //   const updatedList = wordList.map((item) => ({
  //     ...item,
  //     correct:compareWords(item.translate , item.answer)
  //     // Check if the answer is correct

  //   }));

  const checkTest = (e) => {
    setSeeWarning(false);
  
    const updatedList = wordList.map((item) => {
      // Split item.translate by comma and trim whitespace
      const translationArray = item.translate
        .split(',')
        .map(word => word.trim());
  
      // Check if any translation matches the answer
      const isCorrect = translationArray.some(translation => compareWords(translation, item.answer));
  
      // Return updated item with correct field set
      return {
        ...item,
        correct: isCorrect
      };
    });
  
    // Update the state or perform any further actions with updatedList
    // e.g., setWordList(updatedList);
  
  

    const correctAnswers = updatedList.filter((item) => item.correct).length;
    const mark = (correctAnswers / updatedList.length) * 100;
    setMarkStudent(mark);
    setWordList(updatedList);
    if (!trying)
      updateTest({
        _id: _id,
        active: false,
        test: updatedList,
        complete: true,
        mark
      });
    setSeeMark(true);
  };

  if (sureStarting === false) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h6">
          האם הינך בטוח שברצונך להתחיל את הבוחן?
          <br />
          לא ניתן לעשות זאת פעם נוספת!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWantsStart}
          sx={{ mt: 2 }}
        >
          המשך
        </Button>
        <Button
          component={Link} // הופך את הכפתור ללינק
          to="/dash/actions" // כתובת היעד
          variant="contained"
          color="primary"
          onClick={handleWantsStart}
          sx={{ mt: 2 }}
        >
          חזור
        </Button>
      </Box>
    );
  }

  if (isLoading) return <CircularProgress />;
  if (isError || error)
    return (
      <Typography color="error">
        {error ? error.message : "An error occurred"}
      </Typography>
    );

  return (
    <Box className="background-animation">
      <Box
        p={3}
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >



<FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="speed-select-label">בחר מהירות השמעה</InputLabel>
        <Select
          labelId="speed-select-label"
          id="speed-select"
          value={selectedSpeed}
          onChange={handleSpeedChange}
          label="בחר מהירות השמעה"
        >
          <MenuItem value={0.5}>0.5x (איטי יותר)</MenuItem>
          <MenuItem value={0.75}>0.75x (איטי)</MenuItem>
          <MenuItem value={1}>1x (רגיל)</MenuItem>
          <MenuItem value={1.25}>1.25x (מהיר)</MenuItem>
          <MenuItem value={1.5}>1.5x (מהיר יותר)</MenuItem>
        </Select>
      </FormControl>



        <Typography variant="h4" gutterBottom>
          {listWord?.data.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {/* {listWord?.data.date.slice(0, 10)} */}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* כאשר הבוחן עשוי- מביא את התשובות של התלמידה והציון */}   <form onSubmit={handleSubmit}>
          <Table>
            <TableHead>
              <TableRow>
                {seeMark && <TableCell>סימון</TableCell>}
                <TableCell>מס'</TableCell>
                {!seeMark && <TableCell>כמות השמעות</TableCell>}
                {listWord?.data.seeWords && <TableCell>מילה</TableCell>}
                <TableCell>תשובה</TableCell>
                {seeMark && <TableCell>תשובה נכונה</TableCell>}
                <TableCell>השמעה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wordList?.map((cat, index) => (
                <TableRow key={index}>
                  {seeMark && (
                    <TableCell>
                      {cat.correct ? <FaCheck /> : <FaTimes />}
                    </TableCell>
                  )}
                  <TableCell>{index + 1}.</TableCell>
                  {!seeMark && <TableCell>{listenCounts[index]}</TableCell>}

                  {listWord?.data.seeWords && (
                    <TableCell>
                      <Box name="test">{cat.word}</Box>
                    </TableCell>
                  )}

                  {!seeMark && (
                    <TableCell>
                      <TextField
                        size="small"
                        variant="standard"
                        onChange={(e) => handleChange(index, e.target.value)}
                        sx={{
                          width: "100px",
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "#1976d2",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#1976d2",
                          },
                        }}
                      />
                    </TableCell>
                  )}
                  {seeMark && (
                    <TableCell>
                      <Box name="test">{cat.answer}</Box>
                    </TableCell>
                  )}
                  {seeMark && <TableCell>{cat.translate}</TableCell>}


                  <TableCell>
                    <IconButton onClick={() => handleListen(index, cat.word)}
                      className='wordSpeakerButton'
                      disabled={listenCounts[index] === 0} // Disable if no listens left
                    >
                      <HiOutlineSpeakerWave />
                    </IconButton>
                  </TableCell>



                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!seeMark && (
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                הגש
              </Button>
            </Box>
          )}
          {seeWarning && (
            <Box mt={3} textAlign="center">
              <Typography variant="contained" sx={{ color: "maroon", mb: 2 }}>
                האם הינך בטוח שברצונך להגיש?
                <br />
                לא יהיה אפשרות לעשות את הבוחן פעם נוספת!
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={checkTest}
                  sx={{ mr: 1 }}
                >
                  כן
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleWarningClose}
                >
                  לא
                </Button>
              </Box>
            </Box>
          )}
          {seeMark && (
            <Box mt={3} textAlign="center">
              <Typography variant="h6">
                הציון שלך הוא: {markStudent.toFixed(2)}%
              </Typography>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Test;
