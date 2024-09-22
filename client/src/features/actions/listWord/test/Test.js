
import React, { useEffect, useState,useRef } from "react";
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
  IconButton,
  Divider,
  Popover
} from "@mui/material";
import { FaLightbulb } from 'react-icons/fa'; // אייקון נוסף של נורה
import { AiOutlineInfoCircle } from 'react-icons/ai'; // אייקון של הדרכה
import useAuth from "../../../../hooks/useAuth";

import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa";
// import WordComparison from "./WordComparison";
import {
  useGetSingleTestMutation,
  useUpdateTestMutation,
} from "../view/ListWordApiSlice";
import useWordComparison from "../../../../hooks/useWordComparison";
// import WordSpeaker from "../add/WordSpeaker";
import useWordSpeaker from "../../../../hooks/useWordSpeaker";
import {  FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import LOADING from "../../../loadingAnimation/LoadingAnimation";
import useFullscreenExam from "../../../../hooks/useFullscreenExam";
import usePopoverInstructions from "../../../../hooks/usePopoverInstructions";

const Test = () => {
  // const { startExam, isExamLocked } = useFullscreenExam();
  // const { handlePopoverOpen, PopoverComponent } = usePopoverInstructions();

    const [selectedSpeed, setSelectedSpeed] = useState(1); // ברירת המחדל למהירות רגילה
  
    const handleSpeedChange = (event) => {
      setSelectedSpeed(Number(event.target.value));
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
  const [checkedTest,setCheckedTest]=useState(false)
  const {roles}=useAuth()
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
//משתנים נצרכים לפופ-ובר
const [anchorEl, setAnchorEl] = useState(null);
const ref = useRef(null); // הגדרת ref לכפתור

const handlePopoverOpen = (event) => {
  setAnchorEl(event.currentTarget); // כאשר לוחצים על הכפתור, הפופאובר יופיע
};

const handlePopoverClose = () => {
  setAnchorEl(null); // סגירת הפופאובר
};

const open = Boolean(anchorEl);


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
      updateTest({ _id: _id, active: false, complete: true,test:null});
    }
  }, [trying, sureStarting, _id, isUpdateSuccess, isError, loading, updateTest]);
  // useEffect(()=>{
  //   if(sureStarting)
  //   startExam()
  // },[sureStarting])
  useEffect(()=>{
    if (checkedTest&&wordList){
      if(!isTrying)
    updateTest({
      _id: _id,
      active: false,
      test: wordList,
      complete: true,
      mark:markStudent
    });}
  },[markStudent,checkedTest,wordList])
  const handleChange = (index, value) => {
    const updatedList = wordList.map((item, i) =>
      i === index
        ? { ...item, answer: value } // Create a new object with the updated answer
        : item
    );
    setWordList(updatedList);
  };
  const handleTeacherChange = (index, value) => {
    const updatedList = wordList.map((item, i) =>
      i === index
        ? {
            ...item,
            anotherTranslate: item.anotherTranslate
              ? `${item.anotherTranslate}, ${value}` // הוספת פסיק והתוכן החדש אם יש כבר תוכן
              : value, // אם אין תוכן קודם, נכניס את הערך החדש ישירות
          }
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
  const handleListen = (index, word) => {
    // Decrement the listen count if greater than zero
    if (listenCounts[index] > 0) {
      const updatedListenCounts = [...listenCounts];
      updatedListenCounts[index] -= 1;
      setListenCounts(updatedListenCounts);
    }
    speakWord(word,selectedSpeed);
  };
  const checkTest = () => {
    setSeeWarning(false);
    const updatedList = wordList?.map((item) => {
      // Split item.translate by comma and trim whitespace if translate exists
      const translationArray = item?.translate 
        ? item.translate.split(',').map(word => word.trim()).filter(word=>word!='')
        : []; // If translate is undefined, use an empty array
    
      // Split item.anotherTranslate by comma and trim whitespace if anotherTranslate exists
      const translationArray2 = item?.anotherTranslate 
    ? item.anotherTranslate
        .split(',')
        .map(word => word.trim())
        .filter(word => word !== '') // סינון מילים ריקות
    : [];
// If anotherTranslate is undefined, use an empty array
    
      // Check if any translation matches the answer
      const isCorrect = translationArray.some(translation => compareWords(translation, item.answer));
      const isCorrect2 = translationArray2.some(translation => compareWords(translation, item.answer));
      // Return updated item with correct field set
      return {
        ...item,
        correct: (isCorrect || isCorrect2)
      };
    });
    
 
    // Update the state or perform any further actions with updatedList
    // e.g., setWordList(updatedList);
  
    setCheckedTest(true)

    const correctAnswers = updatedList.filter((item) => item.correct).length;
    const mark = ((correctAnswers / updatedList.length) * 100)
    const roundMark=mark>0?mark.toFixed(2):0
    setMarkStudent(roundMark);
    setWordList(updatedList);
    setSeeMark(true);

  };
  const handleTeacherClick=()=>{
    checkTest()
  }
  if (sureStarting === false) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        sx={{   padding: '20px',
        borderRadius: '16px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
        overflowY: 'auto',}}
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

  if (isLoading) return <LOADING />;
  if (isError || error)
    return (
      <Typography color="error">
        {error ? error.message : "An error occurred"}
      </Typography>
    );

  return (
    <Box className="background-animation" sx={{   padding: '20px',
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
    overflowY: 'auto',}}>
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
                {roles==='Teacher'&&<TableCell>תשובה נוספת נכונה</TableCell>}

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

                  {roles === 'Teacher' && (
                <TableCell sx={{            backgroundColor: '#f3f3e9',width:'200px'
                  ,}}>
                  <TextField
                    size="small"
                    variant="standard"
                    onChange={(e) => handleTeacherChange(index, e.target.value)}
                    InputProps={{
                      // disableUnderline: true,
                      sx: {
                     
                        // padding: '5px',
                        // borderRadius: '10px',
                      },
                    }}
                    inputProps={{
                      style: {
                        color: '#800020', // צבע הטקסט הפנימי
                      backgroundColor: '#f3f3e9'
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        color: 'white', // צבע הכיתוב בתוך האינפוט
                      },
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          

                
              ))}
            </TableBody>
          </Table>
          {roles==='Teacher' && (
            <Box display="flex" justifyContent="center" sx={{ mt: 2 ,
            }}>
              <Button onClick={handleTeacherClick} variant="contained" color="primary">
                עדכן מילים וציון
              </Button>
            </Box>
          )}
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
                הציון שלך הוא: {markStudent}%
              </Typography>
            </Box>
          )}
        </form>
      </Box>
      <IconButton ref={ref} onClick={handlePopoverOpen}>
        <AiOutlineInfoCircle size={24} />
      </IconButton>   
      {roles === 'Teacher' && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ p: 2, backgroundColor: '#800020', color: '#fff', borderRadius: '8px', maxWidth: '300px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', borderBottom: '2px solid #fff', pb: 1 }}>
              <FaLightbulb style={{ marginRight: '8px', color: '#FFD700' }} /> הוראות
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              אם תרצה להוסיף תשובה, תוסיף בעוד תשובות
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              כדי לוודא שתשובותיך נכונות, נא לעיין ברשימת התשובות המוצגות מתחת לטבלה.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ניתן גם לעדכן את מהירות ההשמעה לפי הצורך, באמצעות הכפתור המתאים.
            </Typography>
          </Box>
        </Popover>
      )}
      <div>
    {/* <IconButton
      onClick={(event) => handlePopoverOpen(event, 'הוראות פה|עוד הוראות פה')}
      sx={{ color: '#9B153B' }}
    >
      <AiOutlineInfoCircle size={30} />הוראות
    </IconButton>
    <PopoverComponent /> */}
  </div>

    </Box>
  );
};

export default Test;
