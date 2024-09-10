import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import LOADING from '../../loadingAnimation/LoadingAnimation';

const MemoryGame = () => {
  const { roles } = useAuth();
  const [getSingleTest, testResponse] = useGetSingleTestMutation();
  const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation();
  const { _id } = useParams();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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
      const newCards = generateCards(words.data.test);
      setCards(newCards);
    }
  }, [isSuccess, words]);

  const generateCards = (words) => {
    const wordCards = words.map(word => ({ type: 'word', text: word.word, id: word.word }));
    const translateCards = words.map(word => ({ type: 'translate', text: word.translate, id: word.word }));
    const allCards = [...wordCards, ...translateCards].sort(() => 0.5 - Math.random());
    return allCards;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].id === newFlippedCards[1].id && newFlippedCards[0].type !== newFlippedCards[1].type) {
        setMatchedCards([...matchedCards, newFlippedCards[0].id]);
        setScore(score + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }

    if (matchedCards.length + 1 === words.data.test.length) {
      setTimeout(() => setIsGameOver(true), 1000);
    }
  };

  if (isLoading) return <LOADING/>
  if (isError) return <h1>Error</h1>;
  if (!words || words.length === 0) {
    return <Typography variant="h6">אין מילים למשחק.</Typography>;
  }

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" gutterBottom>
        משחק זיכרון
      </Typography>
      <Typography variant="h6" gutterBottom>
        ניקוד: {score}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Card
              onClick={() => handleCardClick(card)}
              style={{
                backgroundColor: flippedCards.includes(card) || matchedCards.includes(card.id) ? '#f5f5f5' : '#9B153B',
                color: flippedCards.includes(card) || matchedCards.includes(card.id) ? '#000' : '#fff',
                cursor: 'pointer'
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={  flippedCards.includes(card) || matchedCards.includes(card.id)?{ color:'#9B153B' }:{color:'#ffffff'}}>
                  {flippedCards.includes(card) || matchedCards.includes(card.id) ? card.text : '?'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isGameOver && (
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            כל הכבוד! סיימת את המשחק!
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            שחק שוב
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MemoryGame;
