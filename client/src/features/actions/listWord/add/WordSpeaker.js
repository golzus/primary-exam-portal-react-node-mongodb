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



import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IconButton } from '@mui/material';

const WordSpeaker = ({ word }) => {
  const { speak } = useSpeechSynthesis();

  const handleClick = (e) => {
    e.stopPropagation();
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.name === 'Google US English Female');
    speak({ text: word, voice });
  };

  return (
    <IconButton onClick={handleClick} className='wordSpeakerButton'>
      <HiOutlineSpeakerWave />
    </IconButton>
  );
};

export default WordSpeaker;
