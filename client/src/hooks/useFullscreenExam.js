import { useEffect, useState } from "react";

// Hook לניהול מסך מלא במהלך הבחינה
const useFullscreenExam = () => {
  const [isExamLocked, setExamLocked] = useState(false); // מצב שמעקב האם הבחינה ננעלה

  // פונקציה לפתיחת מסך מלא
  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  // פונקציה לנעילת הבחינה (כשהמשתמש יוצא ממסך מלא)
  const lockExam = () => {
    setExamLocked(true); // הבחינה ננעלה
    alert("הבחינה ננעלה. לא ניתן להמשיך.");
  };

  // פונקציה שמתרחשת כשמשתמש יוצא ממסך מלא
  const handleFullscreenExit = () => {
    let confirmExit = window.confirm("יצאת ממסך מלא. אם תמשיך הבחינה תינעל ולא תוכל להמשיך. האם אתה בטוח שברצונך לצאת?");
    
    if (!confirmExit) {
      // אם המשתמש בוחר להישאר בבחינה, מחזירים אותו למסך מלא
      openFullscreen();
    } else {
      // אם המשתמש בוחר לצאת, נועלים את הבחינה
      lockExam();
    }
  };

  // שימוש ב- useEffect כדי להאזין לשינויים במצב מסך מלא
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleFullscreenExit();
      }
    };

    // מאזינים לשינוי במצב מסך מלא
    document.addEventListener('fullscreenchange', onFullscreenChange);

    // מנקים את המאזין כשמתנתקים
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  // פונקציה להתחיל את הבחינה
  const startExam = () => {
    const proceed = window.confirm("שים לב: יציאה ממסך מלא במהלך הבחינה תנעל את הבחינה ולא תוכל להמשיך. האם אתה מוכן להתחיל?");
    if (proceed) {
      openFullscreen();
    } else {
      alert("הבחינה לא התחילה. כשתהיה מוכן, התחל שוב.");
    }
  };

  // מחזירים את שלושת הפונקציות
  return {
    startExam,
    openFullscreen,
    isExamLocked
  };
};

export default useFullscreenExam;
