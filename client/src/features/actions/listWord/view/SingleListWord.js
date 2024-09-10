import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation
} from './ListWordApiSlice';
import useAuth from '../../../../hooks/useAuth';
import WordSpeaker from '../add/WordSpeaker';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper, IconButton, Divider, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { VolumeUp } from '@mui/icons-material';
import AddWordsList from '../add/AddWordsList';
import LOADING from '../../../loadingAnimation/LoadingAnimation';

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

  if (isLoading) return <LOADING/>
  if (isError || err) return <Typography variant="h6" align="center">Error: {error?.data?.message || 'Something went wrong!'}</Typography>;
return <AddWordsList WORDLIST={listWord}/>
  return (
    <Box sx={{ width: '100%', maxWidth: '210mm', margin: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" align="center" gutterBottom>{listWord?.data?.title || 'Loading title...'}</Typography>
        <Typography variant="h6" align="center" gutterBottom>{listWord?.data?.date?.slice(0, 10) || 'Loading date...'}</Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmitUpdate}>
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined" margin="normal" size="small">
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
                    onChange={(e) => setSeeWords(e.target.value === 'true')}
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

export default SingleListWord
