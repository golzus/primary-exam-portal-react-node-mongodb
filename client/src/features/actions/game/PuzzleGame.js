import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import LOADING from '../../loadingAnimation/LoadingAnimation';

// פונקציה לערבוב המילים
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const PuzzleGame = () => {
  const { roles } = useAuth();
  const [getSingleTest, testResponse] = useGetSingleTestMutation();
  const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
  const { _id } = useParams();
  const [words, setWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [userOrder, setUserOrder] = useState([]);

  // Handle the fetch of words based on role
  useEffect(() => {
    if (roles === 'Teacher') {
      getListWordsById({ _id });
    } else {
      getSingleTest({ _id });
    }
  }, [_id, roles, getListWordsById, getSingleTest]);

  // Process response data
  useEffect(() => {
    if (roles === 'Teacher') {
      if (listWordsResponse.isSuccess && listWordsResponse.data) {
        setWords(listWordsResponse.data);
      }
    } else {
      if (testResponse.isSuccess && testResponse.data) {
        setWords(testResponse.data);
      }
    }
  }, [listWordsResponse, testResponse, roles]);

  // Shuffle words when they are available
  useEffect(() => {
    if (words.length > 0) {
      const wordsArray = words.map(word => word.word);
      setShuffledWords(shuffleArray([...wordsArray]));
      setUserOrder(shuffleArray([...wordsArray]));
    }
  }, [words]);

  // Handle changing the word order
  const handleChange = (index, newOrder) => {
    const newOrderArray = [...userOrder];
    newOrderArray.splice(index, 1, newOrder);
    setUserOrder(newOrderArray);
  };

  // Handle form submission
  const handleSubmit = () => {
    const correctOrder = words.map(word => word.word);
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      alert('נכון! סידרת את המילים בסדר הנכון.');
    } else {
      alert(`לא נכון. הסדר הנכון הוא: ${correctOrder.join(', ')}`);
    }
  };

  if (isLoading) return <LOADING/>;
  if (isError) return <h1>error</h1>;
  if (!words || words.length === 0) {
    return <Typography variant="h6">אין מילים למשחק.</Typography>;
  }

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>
        משחק חידות
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {userOrder.map((word, index) => (
          <Button
            key={index}
            onClick={() => handleChange(index, prompt('הכנס מילה חדשה', word))}
            sx={{ mb: 1, width: 200 }}
          >
            {word}
          </Button>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        בדוק פתרון
      </Button>
    </Box>
  );
};

export default PuzzleGame;
