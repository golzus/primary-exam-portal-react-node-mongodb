import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'; // ייבוא הנושא שהגדרת
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import useWordSpeaker from '../../hooks/useWordSpeaker';

// נתונים של הפעלים החריגים כולל תרגום לעברית
const irregularVerbs = [
  { id: 1, base: 'be', pastSimple: 'was/were', pastParticiple: 'been', translation: 'להיות' },
  { id: 2, base: 'become', pastSimple: 'became', pastParticiple: 'become', translation: 'להפוך ל' },
  { id: 3, base: 'begin', pastSimple: 'began', pastParticiple: 'begun', translation: 'להתחיל' },
  { id: 4, base: 'break', pastSimple: 'broke', pastParticiple: 'broken', translation: 'לשבור' },
  { id: 5, base: 'bring', pastSimple: 'brought', pastParticiple: 'brought', translation: 'להביא' },
  { id: 6, base: 'buy', pastSimple: 'bought', pastParticiple: 'bought', translation: 'לקנות' },
  { id: 7, base: 'choose', pastSimple: 'chose', pastParticiple: 'chosen', translation: 'לבחור' },
  { id: 8, base: 'come', pastSimple: 'came', pastParticiple: 'come', translation: 'לבוא' },
  { id: 9, base: 'do', pastSimple: 'did', pastParticiple: 'done', translation: 'לעשות' },
  { id: 10, base: 'draw', pastSimple: 'drew', pastParticiple: 'drawn', translation: 'לצייר' },
  { id: 11, base: 'drink', pastSimple: 'drank', pastParticiple: 'drunk', translation: 'לשתות' },
  { id: 12, base: 'drive', pastSimple: 'drove', pastParticiple: 'driven', translation: 'לנהוג' },
  { id: 13, base: 'eat', pastSimple: 'ate', pastParticiple: 'eaten', translation: 'לאכול' },
  { id: 14, base: 'fall', pastSimple: 'fell', pastParticiple: 'fallen', translation: 'ליפול' },
  { id: 15, base: 'feel', pastSimple: 'felt', pastParticiple: 'felt', translation: 'להרגיש' },
  { id: 16, base: 'find', pastSimple: 'found', pastParticiple: 'found', translation: 'למצוא' },
  { id: 17, base: 'fly', pastSimple: 'flew', pastParticiple: 'flown', translation: 'לעוף' },
  { id: 18, base: 'forget', pastSimple: 'forgot', pastParticiple: 'forgotten', translation: 'לשכוח' },
  { id: 19, base: 'get', pastSimple: 'got', pastParticiple: 'gotten', translation: 'לקבל' },
  { id: 20, base: 'give', pastSimple: 'gave', pastParticiple: 'given', translation: 'לתת' },
  { id: 21, base: 'go', pastSimple: 'went', pastParticiple: 'gone', translation: 'ללכת' },
  { id: 22, base: 'grow', pastSimple: 'grew', pastParticiple: 'grown', translation: 'לגדול' },
  { id: 23, base: 'have', pastSimple: 'had', pastParticiple: 'had', translation: 'להיות בעל' },
  { id: 24, base: 'hear', pastSimple: 'heard', pastParticiple: 'heard', translation: 'לשמוע' },
  { id: 25, base: 'hide', pastSimple: 'hid', pastParticiple: 'hidden', translation: 'להחביא' },
  { id: 26, base: 'hit', pastSimple: 'hit', pastParticiple: 'hit', translation: 'להכות' },
  { id: 27, base: 'hold', pastSimple: 'held', pastParticiple: 'held', translation: 'לאחוז' },
  { id: 28, base: 'know', pastSimple: 'knew', pastParticiple: 'known', translation: 'לדעת' },
  { id: 29, base: 'leave', pastSimple: 'left', pastParticiple: 'left', translation: 'לעזוב' },
  { id: 30, base: 'lose', pastSimple: 'lost', pastParticiple: 'lost', translation: 'לאבד' },
  { id: 31, base: 'make', pastSimple: 'made', pastParticiple: 'made', translation: 'לעשות' },
  { id: 32, base: 'mean', pastSimple: 'meant', pastParticiple: 'meant', translation: 'לכוון' },
  { id: 33, base: 'meet', pastSimple: 'met', pastParticiple: 'met', translation: 'להיפגש' },
  { id: 34, base: 'pay', pastSimple: 'paid', pastParticiple: 'paid', translation: 'לשלם' },
  { id: 35, base: 'put', pastSimple: 'put', pastParticiple: 'put', translation: 'לשים' },
  { id: 36, base: 'read', pastSimple: 'read', pastParticiple: 'read', translation: 'לקרוא' },
  { id: 37, base: 'ride', pastSimple: 'rode', pastParticiple: 'ridden', translation: 'לרכוב' },
  { id: 38, base: 'ring', pastSimple: 'rang', pastParticiple: 'rung', translation: 'לצלצל' },
  { id: 39, base: 'run', pastSimple: 'ran', pastParticiple: 'run', translation: 'לרוץ' },
  { id: 40, base: 'say', pastSimple: 'said', pastParticiple: 'said', translation: 'לומר' },
];

// עמודות הטבלה כולל תרגום


function IrregularVerbs() {
  const speakWord=useWordSpeaker()

  const [selectedSpeed,setSelectedSpeed]=useState()
  const handleListen = (index, word) => {
    speakWord(word,selectedSpeed);
  };
const handleSpeedChange = (event) => {
  setSelectedSpeed(Number(event.target.value));

};
const columns = [
  { field: 'translation', headerName: 'המילה בעברית', flex: 1, sortable: true },
  { field: 'base', headerName: 'צורת המילה באופן רגיל', flex: 1, sortable: true },
  { field: 'pastSimple', headerName: 'עבר פשוט', flex: 1, sortable: true },
  { field: 'pastParticiple', headerName: 'עבר סביל', flex: 1, sortable: true },
  {
    field: 'listen', 
    headerName: 'האזן למילה', 
    flex: 0.5, 
    sortable: false,
    renderCell: (params) => {
      const index = params.row.id; // השתמש ב-id של כל שורה כדי לנהל את ההשמעות
      return (
        <IconButton
          onClick={() => handleListen(index, params.row.base)}
          className='wordSpeakerButton'
        >
          <HiOutlineSpeakerWave />
        </IconButton>
      );
    }
  }
];
return (
  <ThemeProvider theme={theme}>
    <Box sx={  { backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
          borderRadius: '10px',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
          height: '68vh', // גובה מוגדר
          overflowY: 'auto', }}>
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
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={irregularVerbs}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div></Box>
  </ThemeProvider>
);
}

export default IrregularVerbs;