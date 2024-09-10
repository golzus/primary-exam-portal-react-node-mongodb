import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Grid } from '@mui/material'; 
import { useGetListWordsByIdMutation, useGetSingleTestMutation } from '../listWord/view/ListWordApiSlice'; 
import { useParams } from 'react-router-dom'; 
import useAuth from '../../../hooks/useAuth'; 
import LOADING from '../../loadingAnimation/LoadingAnimation';

const MultiChoiceGame = () => {
    const { roles } = useAuth(); // שליפת התפקידים של המשתמש
    const [getSingleTest, testResponse] = useGetSingleTestMutation(); // יצירת משתנה לשליפת מבחן יחיד
    const [getListWordsById, listWordsResponse] = useGetListWordsByIdMutation(); // יצירת משתנה לשליפת רשימת מילים לפי מזהה
    const { _id } = useParams(); // שליפת מזהה מהנתיב
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // שמירה על אינדקס המילה הנוכחית
    const [options, setOptions] = useState([]); // שמירה על אפשרויות הבחירה
    const [score, setScore] = useState(0); // שמירה על הניקוד
    const [feedback, setFeedback] = useState(''); // שמירה על משוב התשובה
    const [isGameOver, setIsGameOver] = useState(false); // שמירה על מצב סיום המשחק

    let isSuccess, isError, isLoading; 
    let words = []; // משתנה לאחסון המילים

    if (roles === 'Teacher') {
        isSuccess = listWordsResponse.isSuccess; // האם השליפה הצליחה (למורה)
        isLoading = listWordsResponse.isLoading; // האם השליפה בטעינה (למורה)
        words = listWordsResponse.data; // אחסון המילים (למורה)
        isError = listWordsResponse.isError; // האם השליפה נכשלה (למורה)
    } else {
        isSuccess = testResponse.isSuccess; // האם השליפה הצליחה (לתלמיד)
        isLoading = testResponse.isLoading; // האם השליפה בטעינה (לתלמיד)
        words = testResponse.data; // אחסון המילים (לתלמיד)
        isError = testResponse.isError; // האם השליפה נכשלה (לתלמיד)
    }

    useEffect(() => {
        if (roles === 'Teacher') {
            getListWordsById({ _id }); // שליפת רשימת מילים לפי מזהה למורה
        } else {
            getSingleTest({ _id }); // שליפת מבחן יחיד לתלמיד
        }
    }, [_id, roles, getListWordsById, getSingleTest]);

    useEffect(() => {
        if (isSuccess && words && words.data) {
            setOptions(generateOptions(words.data.test)); // יצירת אפשרויות בחירה כאשר השליפה מצליחה ויש מילים
        }
    }, [isSuccess, words]);

    const generateOptions = (words) => {
        return words.map(word => {
            const correctOption = word.translate; // שמירה על התרגום הנכון
            const incorrectOptions = words
                .filter(w => w.translate !== correctOption) // סינון התרגומים הלא נכונים
                .sort(() => 0.5 - Math.random()) // ערבוב האפשרויות
                .slice(0, 3) // בחירה שלוש אפשרויות שגויות
                .map(w => w.translate); // מיפוי האפשרויות השגויות לתרגומים
            const allOptions = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random()); // שילוב התרגום הנכון עם השגויים וערבובם
            return { word: word.word, options: allOptions }; // החזרת המילה והאפשרויות
        });
    };

    const handleOptionClick = (selectedOption) => {
        const correctOption = words.data.test[currentWordIndex].translate; // שמירה על התרגום הנכון למילה הנוכחית
        if (selectedOption === correctOption) {
            setScore(score + 1); // עדכון הניקוד במקרה של תשובה נכונה
            setFeedback('נכון!'); // הצגת משוב לתשובה נכונה
        } else {
            setFeedback(`לא נכון. התשובה הנכונה היא: ${correctOption}`); // הצגת משוב לתשובה שגויה
        }

        if (currentWordIndex < words.data.test.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1); // מעבר למילה הבאה
        } else {
            setFeedback(`סיימת את המשחק! הניקוד שלך הוא: ${score + 1}`); // סיום המשחק והצגת הניקוד הסופי
            setIsGameOver(true); // עדכון המצב לסיום המשחק
        }
    };

    if (isLoading) return <LOADING/>// הצגת הודעת טעינה בזמן טעינת הנתונים
    if (isError) return <h1>Error</h1>; // הצגת הודעת שגיאה במקרה של תקלה
    if (!words || words.length === 0) {
        return <Typography variant="h6">אין מילים למשחק.</Typography>; // הצגת הודעה כאשר אין מילים למשחק
    }

    return (
        <Box p={3} textAlign="center">
            <Typography variant="h4" gutterBottom>
                משחק תרגום מרובה בחירות
            </Typography>
            {!isGameOver && (
                <>
                    <Typography variant="h6" gutterBottom>
                        {options[currentWordIndex]?.word} {/* הצגת המילה הנוכחית */}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {options[currentWordIndex]?.options.map((option, index) => (
                            <Grid item xs={6} key={index}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option} {/* הצגת אפשרויות הבחירה */}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h6" mt={2}>
                        {feedback} {/* הצגת המשוב */}
                    </Typography>
                    <Typography variant="h6" mt={2}>
                        ניקוד: {score} {/* הצגת הניקוד */}
                    </Typography>
                </>
            )}
            {isGameOver && (
                <Box mt={3}>
                    <Typography variant="h5" gutterBottom>
                        כל הכבוד! סיימת את המשחק!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                        שחק שוב {/* כפתור להתחלת המשחק מחדש */}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default MultiChoiceGame;
