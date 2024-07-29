// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
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
//   CircularProgress,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import {
//   useGetSingleTestMutation,
//   useUpdateTestMutation,
// } from "../view/ListWordApiSlice";
// import WordComparison from "./WordComparison";
// import useAuth from "../../../../hooks/useAuth";
// import WordSpeaker from "../add/WordSpeaker";

// const Test = () => {
//   const { company, roles } = useAuth();
//   const [markStudent, setMarkStudent] = useState(0);
//   const [seeMark, setSeeMark] = useState(false);
//   const [seeWarning, setSeeWarning] = useState(false);
//   const [sureStarting, setSureStarting] = useState(false);
//   const [wordList, setWordList] = useState([]);
//   const { _id } = useParams();
//   const [
//     updateTest,
//     {
//       data: updatedData,
//       error,
//       isSuccess: isupdateSuccess,
//       isError,
//       isLoading: loading,
//     },
//   ] = useUpdateTestMutation();
//   const [
//     getSingleTest,
//     { isSuccess, data: listWord, isLoading, isError: err },
//   ] = useGetSingleTestMutation();

//   useEffect(() => {
//     getSingleTest({ _id });
//   }, [_id]);

//   useEffect(() => {
//     if (isSuccess) {
//       setWordList(listWord.data.test);
//     }
//   }, [isSuccess, listWord]);

//   useEffect(() => {
//     if (sureStarting) {
//       updateTest({ _id: _id, active: false });
//     }
//   }, [sureStarting, _id, isupdateSuccess, isError, loading, updateTest]);

//   const handleChange = (index, value) => {
//     const updatedList = wordList.map((item, i) =>
//       i === index
//         ? { ...item, answer: value } // Create a new object with the updated answer
//         : item
//     );
//     setWordList(updatedList);
//   };

//   const handleWantsStart = () => {
//     setSureStarting(true);
//   };

//   const handleSubmit = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setSeeWarning(true);
//   };

//   const handleWarningClose = () => {
//     setSeeWarning(false);
//   };

//   const updateWordList = (index, isCorrect) => {
//     setWordList((prevList) =>
//       prevList.map((item, i) =>
//         i === index ? { ...item, correct: isCorrect } : item
//       )
//     );
//   };

//   const handleResult = (index, isCorrect) => {
//     updateWordList(index, isCorrect);
//   };

//   const compareAnswers = () => {
//     wordList.forEach((item, index) => {
//       <WordComparison
//         inputWord={item.answer}
//         correctAnswer={item.translate}
//         onResult={(isCorrect) => handleResult(index, isCorrect)}
//       />;
//     });
//   };

//   const checkTest = (e) => {
//     setSeeWarning(false);
//     const updatedList = wordList.map((item) => ({
//       ...item,
//       correct: item.translate === item.answer, // Check if the answer is correct
//     }));

//     const correctAnswers = updatedList.filter((item) => item.correct).length;
//     const mark = (correctAnswers / updatedList.length) * 100;
//     setMarkStudent(mark);
//     setWordList(updatedList);
//     console.log("Updated List with User Answers: ", updatedList);

//     const updateWordList = (index, isCorrect) => {
//       setWordList((prevList) =>
//         prevList.map((item, i) =>
//           i === index ? { ...item, correct: isCorrect } : item
//         )
//       );
//     };

//     const handleResult = (index, isCorrect) => {
//       updateWordList(index, isCorrect);
//     };

//     const compareAnswers = () => {
//       updatedList.forEach((item, index) => {
//         <WordComparison
//           inputWord={item.answer}
//           correctAnswer={item.translate}
//           onResult={(isCorrect) => handleResult(index, isCorrect)}
//         />;
//       });
//     };

//     compareAnswers();
//     updateTest({ _id: _id, active: false, test: updatedList });
//     setSeeMark(true);
//   };

//   if (sureStarting === false) {
//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         textAlign="center"
//       >
//         <Typography variant="h6">
//           האם הינך בטוח שברצונך להתחיל את הבוחן?
//           <br />
//           לא ניתן לעשות זאת פעם נוספת!
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleWantsStart}
//           sx={{ mt: 2 }}
//         >
//           המשך
//         </Button>
//       </Box>
//     );
//   }

//   if (isLoading) return <CircularProgress />;
//   if (isError || error)
//     return (
//       <Typography color="error">
//         {error ? error.message : "An error occurred"}
//       </Typography>
//     );

//   return (
//     <Box className="background-animation">
//       <Box
//         p={3}
//         component={Paper}
//         elevation={3}
//         sx={{
//           maxWidth: "900px",
//           margin: "auto",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           {listWord?.data.title}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           {/* {listWord?.data.date.slice(0, 10)} */}
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         <form onSubmit={handleSubmit}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {seeMark && <TableCell>סימון</TableCell>}
//                 <TableCell>מס'</TableCell>
//                 {listWord?.data.seeWords && <TableCell>מילה</TableCell>}
//                 <TableCell>תרגום</TableCell>
//                 {seeMark && <TableCell>תשובה נכונה</TableCell>}
//                 <TableCell>השמעה</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {wordList?.map((cat, index) => (
//                 <TableRow key={index}>
//                   {seeMark && (
//                     <TableCell>
//                       {cat.correct ? <FaCheck /> : <FaTimes />}
//                     </TableCell>
//                   )}
//                   <TableCell>{index + 1}.</TableCell>
//                   {listWord?.data.seeWords && (
//                     <TableCell>
//                       <Box name="test">{cat.word}</Box>
//                     </TableCell>
//                   )}
//                   <TableCell>
//                     <TextField
//                       size="small"
//                       variant="standard"
//                       onChange={(e) => handleChange(index, e.target.value)}
//                       sx={{
//                         width: "100px",
//                         "& .MuiInput-underline:before": {
//                           borderBottomColor: "#1976d2",
//                         },
//                         "& .MuiInput-underline:after": {
//                           borderBottomColor: "#1976d2",
//                         },
//                       }}
//                     />
//                   </TableCell>
//                   {seeMark && <TableCell>{cat.translate}</TableCell>}
//                   <TableCell>
//                     <WordSpeaker word={cat.word} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {!seeMark && (
//             <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
//               <Button type="submit" variant="contained" color="primary">
//                 הגש
//               </Button>
//             </Box>
//           )}
//           {seeWarning && (
//             <Box mt={3} textAlign="center">
//               <Typography variant="body1">
//                 האם הינך בטוח שברצונך להגיש?
//                 <br />
//                 לא יהיה אפשרות לעשות את הבוחן פעם נוספת!
//               </Typography>
//               <Box mt={2}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={checkTest}
//                   sx={{ mr: 1 }}
//                 >
//                   כן
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleWarningClose}
//                 >
//                   לא
//                 </Button>
//               </Box>
//             </Box>
//           )}
//           {seeMark && (
//             <Box mt={3} textAlign="center">
//               <Typography variant="h6">
//                 הציון שלך: {Math.round(markStudent)}%
//               </Typography>
//               {/* <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate("/some/path")} // Update the path as needed
//                 sx={{ mt: 2 }}
//               >
//                 חזור לדף הבית
//               </Button> */}
//             </Box>
//           )}
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Test;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { FaCheck, FaTimes } from "react-icons/fa";
import WordComparison from "./WordComparison";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";
import {
  useGetSingleTestMutation,
  useUpdateTestMutation,
} from "../view/ListWordApiSlice";

const Test = () => {
  const { company, roles } = useAuth();
  const [markStudent, setMarkStudent] = useState(0);
  const [seeMark, setSeeMark] = useState(false);
  const [seeWarning, setSeeWarning] = useState(false);
  const [sureStarting, setSureStarting] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [listenCounts, setListenCounts] = useState([]);
  const { _id } = useParams();
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
    if (listWord)
      if (!listWord.data.active) {
        setSeeMark(true);
        setSureStarting(true);
      }
  }, [listWord]);
  useEffect(() => {
    if (isSuccess) {
      // Set the word list
      setWordList(listWord.data.test);

      // Initialize listen counts with the correct size and values
      const initialListenCounts = new Array(listWord.data.test.length).fill(
        listWord.data.countListenToWord
      );
      setListenCounts(initialListenCounts);
    }
  }, [isSuccess, listWord]);

  useEffect(() => {
    if (sureStarting) {
      updateTest({ _id: _id, active: false });
    }
  }, [sureStarting, _id, isUpdateSuccess, isError, loading, updateTest]);

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
    setSeeWarning(true);
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

  const handleResult = (index, isCorrect) => {
    updateWordList(index, isCorrect);
  };

  const compareAnswers = () => {
    wordList.forEach((item, index) => {
      <WordComparison
        inputWord={item.answer}
        correctAnswer={item.translate}
        onResult={(isCorrect) => handleResult(index, isCorrect)}
      />;
    });
  };

  const handleListen = (index) => {
    // Decrement the listen count if greater than zero
    if (listenCounts[index] > 0) {
      const updatedListenCounts = [...listenCounts];
      updatedListenCounts[index] -= 1;
      setListenCounts(updatedListenCounts);
    }
  };

  const checkTest = (e) => {
    setSeeWarning(false);
    const updatedList = wordList.map((item) => ({
      ...item,
      correct: item.translate === item.answer, // Check if the answer is correct
    }));

    const correctAnswers = updatedList.filter((item) => item.correct).length;
    const mark = (correctAnswers / updatedList.length) * 100;
    setMarkStudent(mark);
    setWordList(updatedList);
    console.log("Updated List with User Answers: ", updatedList);

    updateTest({
      _id: _id,
      active: false,
      test: updatedList,
      mark: markStudent,
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
        <Typography variant="h4" gutterBottom>
          {listWord?.data.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {/* {listWord?.data.date.slice(0, 10)} */}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmit}>
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
                    <IconButton
                      onClick={() => handleListen(index)}
                      disabled={listenCounts[index] === 0} // Disable if no listens left
                    >
                      <WordSpeaker word={cat.word} />
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
