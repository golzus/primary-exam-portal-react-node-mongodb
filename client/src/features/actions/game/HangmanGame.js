import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import LOADING from '../../loadingAnimation/LoadingAnimation';

const HangmanGame = () => {
  const { roles } = useAuth();
  const [getSingleTest, testResponse] = useGetSingleTestMutation();
  const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
  const { _id } = useParams();
  const [word, setWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');

  let isSuccess, isError, isLoading;
  let words = [];

  if (roles === 'Teacher') {
    isSuccess = listWordsResponse.isSuccess;
    isLoading = listWordsResponse.isLoading;
    words = listWordsResponse.data;
    isError = listWordsResponse.isError;
  } else {
    isSuccess = testResponse.isSuccess;
    isLoading = testResponse.isLoading;
    words = testResponse.data;
    isError = testResponse.isError;
  }

  useEffect(() => {
    if (roles === 'Teacher') {
      getListWordsById({ _id });
    } else {
      getSingleTest({ _id });
    }
  }, [_id, roles, getListWordsById, getSingleTest]);

  useEffect(() => {
    if (isSuccess && words && words.data) {
      const selectedWord = words.data.test[Math.floor(Math.random() * words.data.test.length)].word;
      setWord(selectedWord);
      setMaskedWord('_'.repeat(selectedWord.length));
    }
  }, [isSuccess, words]);

  const handleGuess = () => {
    if (userGuess.length !== 1) {
      setFeedback('נא להכניס רק אות אחת בכל פעם.');
      return;
    }
    if (guessedLetters.includes(userGuess)) {
      setFeedback('כבר ניחשת את האות הזו.');
      return;
    }

    setGuessedLetters([...guessedLetters, userGuess]);

    if (word.includes(userGuess)) {
      const newMaskedWord = maskedWord.split('').map((char, index) => (
        word[index] === userGuess ? userGuess : char
      )).join('');
      setMaskedWord(newMaskedWord);

      if (newMaskedWord === word) {
        setIsGameOver(true);
        setFeedback('ניצחת! הצלחת לנחש את המילה.');
      }
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);

      if (incorrectGuesses + 1 === 6) {
        setIsGameOver(true);
        setFeedback(`הפסדת! המילה הייתה: ${word}`);
      } else {
        setFeedback(`ניחוש שגוי. יש לך עוד ${6 - (incorrectGuesses + 1)} ניחושים.`);
      }
    }

    setUserGuess('');
  };

  if (isLoading) return <LOADING/>
  if (isError) return <h1>Error</h1>;
  if (!words || words.length === 0) {
    return <Typography variant="h6">אין מילים למשחק.</Typography>;
  }

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>
        משחק תלות
      </Typography>
      <Typography variant="h6" gutterBottom>
        {maskedWord}
      </Typography>
      <TextField
        label="הכנס אות"
        variant="outlined"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        fullWidth
        margin="normal"
        disabled={isGameOver}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGuess}
        disabled={isGameOver}
      >
        נחש
      </Button>
      <Typography variant="h6" mt={2}>
        {feedback}
      </Typography>
      <Typography variant="h6" mt={2}>
        ניחושים שגויים: {incorrectGuesses} מתוך 6
      </Typography>
      {isGameOver && (
        <Button variant="contained" color="secondary" onClick={() => window.location.reload()}>
          התחל משחק חדש
        </Button>
      )}
    </Box>
  );
};

export default HangmanGame;
