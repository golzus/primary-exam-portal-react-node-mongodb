import { useEffect, useState } from "react";

const useWordSpeaker = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    // פונקציה לטעינת קולות
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      // מציאת קול נשי באנגלית אמריקאית
      const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Female'));
      // fallback לקול אמריקאי אחר אם קול נשי לא זמין
      const fallbackVoice = voices.find(voice => voice.lang === 'en-US');
      setVoice(preferredVoice || fallbackVoice);
    };

    // טוען את הקולות כשמתאפשר
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // הפונקציה שמוקראת מהמילה עם פרמטר למהירות
  const speakWord = (word, rate = 1) => {
    if (voice && word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = voice;
      utterance.rate = rate; // מהירות השמעה
      utterance.pitch = 1;
      utterance.volume = 1;

      speechSynthesis.speak(utterance);
    } else if (!voice) {
      console.error("Voice not loaded yet or not found!");
    }
  };

  // מחזיר את הפונקציה
  return speakWord;
};

export default useWordSpeaker;
