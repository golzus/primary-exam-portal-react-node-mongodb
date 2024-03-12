// import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { HiOutlineSpeakerWave } from "react-icons/hi2";
// const WordSpeaker = ({ word }) => {
//   const { speak } = useSpeechSynthesis();

//   const handleClick = () => {
//     speak({ text: word });
//   };

//   return (
//      <button onClick={handleClick}><HiOutlineSpeakerWave className='wordSpeakerButton' /></button>

//   );
// };

// export default WordSpeaker;



import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const WordSpeaker = ({ word }) => {
  const { speak } = useSpeechSynthesis();

  const handleClick = () => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.name === 'Google UK English Female'); // השתמש בשם המדויק של הקול שאת רוצה להשתמש בו
    speak({ text: word, voice });
  };

  return (
     <button onClick={handleClick}><HiOutlineSpeakerWave className='wordSpeakerButton' /></button>
  );
};

export default WordSpeaker;



