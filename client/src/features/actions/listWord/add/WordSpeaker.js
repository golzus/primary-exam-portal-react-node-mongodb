import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
const WordSpeaker = ({ word }) => {
  const { speak } = useSpeechSynthesis();

  const handleClick = () => {
    speak({ text: word });
  };

  return (
     <button onClick={handleClick}><HiOutlineSpeakerWave /></button>

  );
};

export default WordSpeaker;



