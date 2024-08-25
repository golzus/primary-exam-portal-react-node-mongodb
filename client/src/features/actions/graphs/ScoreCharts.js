import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useTheme, Typography, Select, MenuItem, Box } from '@mui/material'; // ייבוא רכיבי MUI
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';

// נתוני דוגמה
const initialData = {
  Math: [
    { student: "Student A", mark: 95 },
    { student: "Student B", mark: 85 },
    { student: "Student C", mark: 90 },
    { student: "Student D", mark: 70 },
  ],
  English: [
    { student: "Student A", mark: 88 },
    { student: "Student B", mark: 90 },
    { student: "Student C", mark: 85 },
    { student: "Student D", mark: 80 },
  ],
};

// הגדרת קטגוריות ציונים
const categorizeMarks = (marks) => {
  return marks.map(mark => {
    if (mark >= 90) return 'מעולה';
    if (mark >= 80) return 'טוב מאוד';
    if (mark >= 70) return 'טוב';
    if (mark >= 60) return 'כמעט טוב';
    return 'נכשל';
  });
};

// קבלת הקטגוריה של ציון מסוים
const getCategory = (mark) => {
  if (mark >= 90) return 'מעולה';
  if (mark >= 80) return 'טוב מאוד';
  if (mark >= 70) return 'טוב';
  if (mark >= 60) return 'כמעט טוב';
  return 'נכשל';
};

// חישוב סטטיסטיקות ציונים
const calculateStatistics = (data, studentMark) => {
  const marks = data.map(item => item.mark); // חישוב הציונים
  const total = marks.length; // מספר הציונים
  const mean = marks.reduce((acc, mark) => acc + mark, 0) / total; // ממוצע
  const stdDev = Math.sqrt(marks.map(mark => Math.pow(mark - mean, 2)).reduce((acc, val) => acc + val, 0) / total); // סטיית תקן

  const sortedMarks = [...marks].sort((a, b) => b - a); // מיון ציונים מהגבוה לנמוך
  const rank = sortedMarks.indexOf(studentMark) + 1; // דירוג הציון

  return {
    mean,
    stdDev,
    rank,
  };
};

const ScoreCharts = () => {
  const [selectedTest, setSelectedTest] = useState(Object.keys(initialData)[0]); // בוחן נבחר
  const [studentMark, setStudentMark] = useState(0); // ציון התלמידה
  const [chartData, setChartData] = useState([]); // נתוני גרף עמודות
  const [statistics, setStatistics] = useState({ mean: 0, stdDev: 0, rank: 0 }); // סטטיסטיקות
  const [category, setCategory] = useState(''); // קטגוריה של ציון התלמידה

  const theme = useTheme(); // שימוש בנושא MUI הנוכחי

  // עדכון הגרפים וסטטיסטיקות כאשר הבחירה משתנה
  useEffect(() => {
    const data = initialData[selectedTest]; // נתוני הבוחן הנבחר
    const studentData = data.find(item => item.student === "Student A"); // חיפוש ציון התלמידה

    if (studentData) {
      setStudentMark(studentData.mark); // עדכון ציון התלמידה
      setCategory(getCategory(studentData.mark)); // עדכון קטגוריה
    }

    // קיטלוג הציונים לקטגוריות
    const categorizedMarks = categorizeMarks(data.map(item => item.mark));
    const categories = ['מעולה', 'טוב מאוד', 'טוב', 'כמעט טוב', 'נכשל'];
    const counts = categories.map(category => categorizedMarks.filter(c => c === category).length); // ספירת ציונים לפי קטגוריות

    setChartData([
      {
        x: categories,
        y: counts,
        type: 'bar',
        marker: { color: theme.palette.primary.main }, // צבע עמודות מהנושא
      },
    ]);

    // חישוב סטטיסטיקות
    const stats = calculateStatistics(data, studentMark);
    setStatistics(stats);
  }, [selectedTest, theme.palette.primary.main]);

  // פונקציה לטיפול בשינוי הבחירה בבוחן
  const handleTestChange = (event) => {
    setSelectedTest(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={2}>
        <Box ml={2} color={theme.palette.primary.main} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "rows",
          // backgroundColor: "#9B153B",
        }}>
          {/* הצגת הקטגוריה והציון של התלמידה */}
          <Typography variant="h6" >
            {category} - ציונך: {studentMark}
          </Typography>
          <Typography variant="h6">
            ממוצע: {statistics.mean.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            סטיית תקן: {statistics.stdDev.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            דירוג: {statistics.rank} מתוך {initialData[selectedTest].length}
          </Typography>
        </Box>

        {/* גרף עמודות של התפלגות ציונים */}
        <Box display="flex" alignItems="center" mt={2}>
          <Plot
            className='chart avgChart'
            data={chartData}
            layout={{
              title: `התפלגות ציונים עבור ${selectedTest}`,
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
            
            }}
          />

        </Box>
        {/* בחירת הבוחן */}
        <Select
              value={selectedTest}
              onChange={handleTestChange}
              variant="outlined"
    
            >
              {Object.keys(initialData).map(test => (
                <MenuItem key={test} value={test}>{test}</MenuItem>
              ))}
            </Select>
      </Box>
    </ThemeProvider>
  );
}

export default ScoreCharts;





