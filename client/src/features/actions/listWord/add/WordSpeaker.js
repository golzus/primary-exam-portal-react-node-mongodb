// import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { HiOutlineSpeakerWave } from "react-icons/hi2";
// import { IconButton } from '@mui/material';

// const WordSpeaker = ({ word }) => {
//   const { speak } = useSpeechSynthesis();

//   const handleClick = (e) => {
//     e.stopPropagation();
//     const voices = window.speechSynthesis.getVoices();
//     const voice = voices.find(voice => voice.name === 'Google US English Female'); // השתמש בשם המדויק של הקול שאת רוצה להשתמש בו
//     speak({ text: word, voice });
//   };

//   return (
//     <IconButton onClick={handleClick} className='wordSpeakerButton'>
//       <HiOutlineSpeakerWave />
//     </IconButton>
//   );
// };

// export default WordSpeaker;

// import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { HiOutlineSpeakerWave } from "react-icons/hi2";
// import { IconButton } from '@mui/material';

// const WordSpeaker = ({ word }) => {
//   const { speak } = useSpeechSynthesis();

//   const handleClick = (e) => {
//     e.stopPropagation();
//     const voices = window.speechSynthesis.getVoices();

//     // Try to find a US English female voice (priority)
//     const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Female'));

//     // Fallback to any US English voice
//     const fallbackVoice = voices.find(voice => voice.lang === 'en-US');

//     const voice = preferredVoice || fallbackVoice;

//     if (voice) {
//       speak({ text: word, voice });
//     } else {
//       console.warn('No US English voice found');
//     }
//   };

//   return (
//     <IconButton onClick={handleClick} className='wordSpeakerButton'>
//       <HiOutlineSpeakerWave />
//     </IconButton>
//   );
// };

// export default WordSpeaker;


import React from 'react';
import { Speech } from 'react-speech';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IconButton } from '@mui/material';

const WordSpeaker = ({ word }) => {

  // פונקציית handleClick תהיה אחראית לניהול ההקראה דרך Speech
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <IconButton onClick={handleClick} className='wordSpeakerButton'>
      <HiOutlineSpeakerWave />
      {/* הקומפוננטה של Speech תטפל בהקראה של המילה */}
      <Speech 
        text={word}
        voice="Google UK English Female" // ניתן לשנות לקול המועדף עליך
        rate="1" // מהירות ההקראה
        pitch="1" // גובה הצליל
        volume="1" // עוצמת הקול
      />
    </IconButton>
  );
};

export default WordSpeaker;
