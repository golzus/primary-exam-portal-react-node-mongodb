// import {useParams } from "react-router-dom";
// import {
//   useGetListWordsByIdMutation,
//   useUpdateListWordsMutation,
// } from "./ListWordApiSlice";
// import "./singleListWord.css";
// import { useEffect, useState } from "react";
// import useAuth from "../../../../hooks/useAuth";
// import WordSpeaker from "../add/WordSpeaker";
// import ExaminerPage from "../list/ExaminerPage";
// const SingleListWord = () => {
//   const { _id2, roles } = useAuth();
//   const { _id } = useParams();
//   const [
//     updateListWords,
//     { data: updatedData, error, isSuccess: isupdateSuccess, isError },
//   ] = useUpdateListWordsMutation();

//   const [
//     getListWordsById,
//     { isSuccess, data: listWord, isLoading, isError: err },
//   ] = useGetListWordsByIdMutation();
//   useEffect(() => {
//     getListWordsById({ _id });
//   }, []);
//   const [wordList, setWordList] = useState(listWord?.data.test);

//   useEffect(() => {
//     if (isSuccess) {
//       setWordList(listWord.data.test);
//     }
//   }, [isSuccess]);
// //   const navigate = useNavigate();
// //   useEffect(() => {
// //     if (isupdateSuccess) {
// //         navigate("/dash/actions");
// //     }
// // }, [isupdateSuccess]);
//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError || error) return <h1>data.message</h1>;
//   const handleChange2 = (index, field, value) => {
//     const updatedList = [...wordList];
//     //updatedList[index][field]=value
//     setWordList(updatedList);
//     //setWordList(()=>[...wordList,wordList[index][field]=value])
//   };

 
//   const handleChange = (index, field, value) => {
//     const updatedList = [...wordList];
//     const updateListNew = updatedList?.map((e, i) => {
//       if (field === "translate")
//         e = i === index ? { word: e.word, translate: value } : e;
//       if (field === "word")
//         e = i === index ? { word: value, translate: e.translate } : e;
//       return e;
//     });
//     setWordList(updateListNew);
//   };
//   if (!listWord) return <h1>listWord not found</h1>;
//   if (!isupdateSuccess) console.log(error, "data");

//   let count = 0;
//   const formSubmit = (e) => {
//     e.stopPropagation()
//     e.preventDefault();
//     const data = new FormData(e.target);
//     const listObject = Object.fromEntries(data.entries());
//     listObject.company = _id2
//     listObject._id = _id;
//     listObject.test = wordList;
//     updateListWords(listObject);
//   };
//   const funcOver=(()=>{
//     console.log("over");
//   return<h1>"rr"</h1>
//   })
//   return (
//     <div className="formupdatelistword">
//       <ExaminerPage />
//       <form onSubmit={formSubmit} className="print-content">
//         <div className="titles">
//           <input
//             className="inputWordUpdate ss titleListWord"
//             name="title"
//             defaultValue={listWord.data.title}
//           />
//           <input
//             className="inputWordUpdate ss dateListWord"
//             name="date"
//             // defaultValue={listWord.data.date}
//             value={listWord?.data.date.slice(0, 10)}
//             type="date"
//           />
//           <select name="active" id="active" className="if-you-may-do">
//             <option selected={listWord.data.active} value={true}>
//               ניתן לעשות {""}
//             </option>
//             <option selected={!listWord.data.active} value={false}>
//               לא ניתן לעשות {""}{" "}
//             </option>
//           </select>
//           <select name="seeWords" id="seeWords" className="if-you-may-see">
//             <option selected={!listWord.data.seeWords} value={false}>
//               לא ניתן לראות {""}
//             </option>
//             <option selected={listWord.data.seeWords} value={true}>
//               ניתן לראות {""}{" "}
//             </option>
//           </select>
//           <input
//             name="countListenToWord"
//             id="countListenToWord"
//             defaultValue={listWord.data.countListenToWord}
//             type="number"
//           />
//         </div>
//         <table className="users-list-table">
//           <thead>
//             <tr>
//               <th className="inputWordUpdateSmaller">מס'</th>
//               <th className="inputWordUpdateSmaller inputWordUpdateSmallerEar">
//                 {" "}
//                 שמיעה
//               </th>

//               <th className="inputWordUpdate">מילה</th>
//               <th className="inputWordUpdate"> תרגום</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wordList?.map((cat, index) => (
//               <tr key={index}>
//                 <td className="inputWordUpdate inputWordUpdateSmaller" onPointerOver={funcOver}>
//                   {index + 1}.
//                 </td>
//                 <td className="inputWordUpdate inputWordUpdateSmaller inputWordUpdateSmallerEar">
//                   {" "}
//                   <WordSpeaker word={cat.word} />{" "}
//                 </td>
//                 <td className="inputWordUpdate">
//                   <input
//                     name="test"
//                     // className="inputWordUpdate"
//                     defaultValue={cat.word}
//                     onChange={(e) =>
//                       handleChange(index, "word", e.target.value)
//                     }
//                   />
//                   {/* <WordSpeaker word={cat.word} /> */}
//                 </td>

//                 <td className="inputWordUpdate">
//                   <input
//                     // name="test.translate"
//                     // name={index}
//                     // className="inputWordUpdate"
//                     defaultValue={cat.translate}
//                     onChange={(e) =>
//                       handleChange(index, "translate", e.target.value)
//                     }
//                     //  onChange={(e) => handleChange(index, 'translate', e.target.value)}
//                   />
//                 </td>
//                 <td>{/* <WordSpeaker word={cat.word} /> */}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <button type="submit" className="updateList">
//           עדכן
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SingleListWord;

// // import React, { useState } from 'react';
// // import WordSpeaker from './WordSpeaker';

// // const App = () => {
// //   const [wordList, setWordList] = useState([
// //     { word: 'apple', translate: 'תפוח' },
// //     { word: 'banana', translate: 'בננה' },
// //     // ניתן להוסיף ערכים נוספים לרשימה
// //   ]);

// //   const handleChange = (index, field, value) => {
// //     const updatedList = [...wordList];
// //     updatedList[index][field] = value;
// //     setWordList(updatedList);
// //   };

// //   const handleSave = () => {
// //     console.log(wordList);
// //     // כאן ניתן לעבד את המידע המעודכן, לשמור אותו בשרת, וכו'
// //   };

// //   return (
// //     <div>
// //       <table>
// //         <tbody>
// //           {wordList.map((cat, index) => (
// //             <tr key={index}>
// //               <td>{index + 1}.</td>
// //               <td>
// //                 <input
// //                   name="test"
// //                   className="inputWordUpdate"
// //                   value={cat.word}
// //                   onChange={(e) => handleChange(index, 'word', e.target.value)}
// //                 />
// //               </td>
// //               <td>
// //                 <WordSpeaker word={cat.word} />
// //               </td>
// //               <td>
// //                 <input
// //                   name="test.translate"
// //                   className="inputWordUpdate"
// //                   value={cat.translate}
// //                   onChange={(e) => handleChange(index, 'translate', e.target.value)}
// //                 />
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       <button onClick={handleSave}>שמור שינויים</button>
// //     </div>
// //   );
// // };

// // export default App;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation
} from './ListWordApiSlice';
import useAuth from '../../../../hooks/useAuth';
import WordSpeaker from '../add/WordSpeaker';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper, IconButton, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { VolumeUp } from '@mui/icons-material';

const SingleListWord = () => {
  const { _id2 } = useAuth();
  const { _id } = useParams();
  const [updateListWords, { isError, error, isSuccess: isUpdateSuccess, data: updatedData }] = useUpdateListWordsMutation();
  const [getListWordsById, { isSuccess, data: listWord, isLoading, isError: err }] = useGetListWordsByIdMutation();
  const navigate = useNavigate();

  const [wordList, setWordList] = useState([]);
  const [active, setActive] = useState(true);
  const [seeWords, setSeeWords] = useState(false);
  const [countListenToWord, setCountListenToWord] = useState(5);

  useEffect(() => {
    getListWordsById({ _id });
  }, [_id]);

  useEffect(() => {
    if (isSuccess && listWord) {
      setActive(listWord.data.active);
      setSeeWords(listWord.data.seeWords);
      setCountListenToWord(listWord.data.countListenToWord);
      setWordList(listWord.data.test.map(({ word, translate }) => ({ word, translate })));
    }
  }, [isSuccess, listWord]);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate('/dash/actions');
    }
  }, [isUpdateSuccess]);

  const handleWordChange = (index, field, value) => {
    const updatedList = [...wordList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setWordList(updatedList);
  };

  const addNewRow = () => {
    setWordList([...wordList, { word: '', translate: '' }]);
  };

  const deleteRow = (index) => {
    setWordList(wordList.filter((_, i) => i !== index));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const listObject = {
      _id,
      company: _id2,
      title: listWord?.data?.title, // אין אפשרות לשנות את הכותרת
      date: listWord?.data?.date,   // אין אפשרות לשנות את התאריך
      active,
      seeWords,
      countListenToWord,
      test: wordList
    };
    updateListWords(listObject);
  };

  const playSound = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  if (isLoading) return <Typography variant="h6" align="center">Loading...</Typography>;
  if (isError || err) return <Typography variant="h6" align="center">Error: {error?.data?.message || 'Something went wrong!'}</Typography>;

  return (
    <Box sx={{ width: '100%', maxWidth: '210mm', margin: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" align="center" gutterBottom>{listWord?.data?.title || 'Loading title...'}</Typography>
        <Typography variant="h6" align="center" gutterBottom>{listWord?.data?.date?.slice(0, 10) || 'Loading date...'}</Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmitUpdate}>
          <Box p={3}>
            {/* שדות לשינוי סטטוס הפעילות ויכולת לראות את המילים */}
            <FormControl fullWidth variant="outlined" margin="normal">
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
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="seeWords-label">See Words</InputLabel>
              <Select
                labelId="seeWords-label"
                id="seeWords"
                name="seeWords"
                label="See Words"
                value={seeWords}
                onChange={(e) => setSeeWords(e.target.value === 'true')}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
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
                {wordList.map((row, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, '&:nth-of-type(odd)': { backgroundColor: '#ffffff' } }}>
                    <TableCell>
                      <TextField
                        size="small"
                        variant="standard"
                        value={row.word}
                        onChange={(e) => handleWordChange(index, 'word', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addNewRow();
                          }
                        }}
                        sx={{ width: '150px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        variant="standard"
                        value={row.translate}
                        onChange={(e) => handleWordChange(index, 'translate', e.target.value)}
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
              <Button onClick={addNewRow} variant="contained" color="secondary">Add New Row</Button>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">Update List</Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SingleListWord;
