import { useEffect } from "react";

const useExamFullscreen = (lockExam) => {

  useEffect(() => {
    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        const confirmExit = window.confirm(
          "יצאת ממסך מלא. אם לא תחזור עכשיו, הבחינה תנעל. האם אתה רוצה לחזור למסך מלא?"
        );
        if (!confirmExit) {
          alert("הבחינה ננעלה.");
          lockExam();  // פונקציה לנעילת הבחינה
        } else {
          openFullscreen(); // חזרה למסך מלא
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenExit);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
    };
  }, [lockExam]);

  // פונקציה שנקראת כשמתחילים את הבחינה
  const startExam = () => {
    const confirmStart = window.confirm(
      "האם אתה בטוח שתרצה להתחיל את הבחינה במצב מסך מלא? יציאה ממסך מלא תנעל את הבחינה."
    );
    if (confirmStart) {
      openFullscreen(); // מעבר למסך מלא
    } else {
      alert("הבחינה לא התחילה.");
    }
  };

  // פונקציה שמעבירה את הדף למסך מלא
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

  return startExam;
};

export default useExamFullscreen;
