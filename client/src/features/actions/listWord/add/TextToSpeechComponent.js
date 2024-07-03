import React, { useState } from 'react';

const TextToSpeechComponent = () => {
    const [inputWord, setInputWord] = useState('');
    
    const handleInputChange = (e) => {
        setInputWord(e.target.value);
    };

    const handleClick = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        
        const msg = new SpeechSynthesisUtterance();
        msg.voice = voices.find(voice => voice.lang === 'en-US' && voice.name === 'Google US English');
        msg.text = inputWord;
        
        synth.speak(msg);
    };

    return (
        <div>
            <h1>Word Reader</h1>
            <p>Enter a word to be read:</p>
            <input type="text" value={inputWord} onChange={handleInputChange} />
            <button onClick={handleClick}>Read Word</button>

            <h2>Documentation:</h2>
            <p>1. Enter a word in the input field.</p>
            <p>2. Click the "Read Word" button to hear the word spoken out loud.</p>
        </div>
    );
};

export default TextToSpeechComponent;


