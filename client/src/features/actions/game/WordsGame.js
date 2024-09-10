// import React, { useEffect, useState } from 'react';
// import { Button, TextField, Typography, Box } from '@mui/material';
// import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice';
// import { useParams } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import theme from '../../../theme';
// const WordsGame = () => {
//     const {roles}=useAuth()
//     const [getSingleTest,testResponse] = useGetSingleTestMutation();
//     const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
//     const { _id } = useParams();
//     let isSuccess,isError,isLoading
//     let words=[]
//     if(roles==='Teacher'){
//        isSuccess=listWordsResponse.isSuccess;
//        isLoading=listWordsResponse.isLoading;
//       words=listWordsResponse.data;
//       isError=listWordsResponse.isError
//     }
//     else{
//       isSuccess=testResponse.isSuccess;
//       isLoading=testResponse.isLoading
//       words=testResponse.data;
//       isError=testResponse.isError ;
//     }
//     useEffect(() => {
//       if(roles==='Teacher')
//       getListWordsById({ _id });
//     else
//     getSingleTest({_id})
//     }, [_id]);
  
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');

//   const handleSubmit = () => {
//     const correctTranslate = words[currentWordIndex].translate;
//     if (userAnswer.trim().toLowerCase() === correctTranslate.trim().toLowerCase()) {
//       setScore(score + 1);
//       setFeedback('נכון!');
//     } else {
//       setFeedback(`לא נכון. התשובה הנכונה היא: ${correctTranslate}`);
//     }

//     // Move to next word or reset
//     if (currentWordIndex < words.length - 1) {
//       setCurrentWordIndex(currentWordIndex + 1);
//     } else {
//       setFeedback(`סיימת את המשחק! הניקוד שלך הוא: ${score + 1}`);
//     }
//     // Clear input field
//     setUserAnswer('');
//   };
// if(isLoading)return <h1>Loading...</h1>
// if(isError)return <h1>error</h1>
// if (!words || words.length === 0) {
//     return <Typography variant="h6">אין מילים למשחק.</Typography>;
//   }
//   words=words.data.test
//   return (
//     <Box p={3} textAlign="center">
//       <Typography variant="h4" gutterBottom>
//         תרגול מילים
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         {words[currentWordIndex]?.WORD}
//       </Typography>
//       <TextField
//         label="הכנס תרגום"
//         variant="outlined"
//         value={userAnswer}
//         onChange={(e) => setUserAnswer(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         שלח
//       </Button>
//       <Typography variant="h6" mt={2}>
//         {feedback}
//       </Typography>
//       <Typography variant="h6" mt={2}>
//         ניקוד: {score}
//       </Typography>
//     </Box>
//   );
// };

// export default WordsGame;



import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import theme from '../../../theme';
import LOADING from '../../loadingAnimation/LoadingAnimation';

const WordGame = () => {
        const {roles}=useAuth()
        const [currentWordIndex, setCurrentWordIndex] = useState(0);
        const [userAnswer, setUserAnswer] = useState('');
        const [score, setScore] = useState(0);
        const [feedback, setFeedback] = useState('');
    const [getSingleTest,testResponse] = useGetSingleTestMutation();
    const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
    const { _id } = useParams();
    let isSuccess,isError,isLoading
    let words=[]
    if(roles==='Teacher'){
       isSuccess=listWordsResponse.isSuccess;
       isLoading=listWordsResponse.isLoading;
      words=listWordsResponse.data;
      isError=listWordsResponse.isError
    }
    else{
      isSuccess=testResponse.isSuccess;
      isLoading=testResponse.isLoading
      words=testResponse.data;
      isError=testResponse.isError ;
    }
    useEffect(() => {
      if(roles==='Teacher')
      getListWordsById({ _id });
    else
    getSingleTest({_id})
    }, [_id]);
  if (!words || words.length === 0) {
    return <Typography variant="h6">אין מילים למשחק.</Typography>;
  }

 

  const handleSubmit = () => {
    if (words[currentWordIndex]) {
      const correctTranslate = words[currentWordIndex].translate;
      if (userAnswer.trim().toLowerCase() === correctTranslate.trim().toLowerCase()) {
        setScore(score + 1);
        setFeedback('נכון!');
      } else {
        setFeedback(`לא נכון. התשובה הנכונה היא: ${correctTranslate}`);
      }

      // Move to next word or reset
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setFeedback(`סיימת את המשחק! הניקוד שלך הוא: ${score + 1}`);
      }

      // Clear input field
      setUserAnswer('');
    }
  };
  if(isLoading)return <LOADING/>
  if(isError)return <h1>error</h1>
  if (!words || words.length === 0) {
      return <Typography variant="h6">אין מילים למשחק.</Typography>;
    }
    words=words.data.test
  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>
        תרגול מילים
      </Typography>
      <Typography variant="h6" gutterBottom>
        {words[currentWordIndex]?.word}
      </Typography>
      <TextField
        label="הכנס תרגום"
        variant="outlined"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        שלח
      </Button>
      <Typography variant="h6" mt={2}>
        {feedback}
      </Typography>
      <Typography variant="h6" mt={2}>
        ניקוד: {score}
      </Typography>
    </Box>
  );
};

export default WordGame;
