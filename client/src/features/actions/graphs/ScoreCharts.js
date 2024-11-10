import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useTheme, Typography, Select, MenuItem, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useGetAlltestsByListWordIdMutation, useGetAllTestsMutation } from '../listWord/view/ListWordApiSlice';
import useAuth from '../../../hooks/useAuth';

const categorizeMarks = (marks) => {
  return marks.map(mark => {
    if (mark >= 90) return 'מעולה';
    if (mark >= 80) return 'טוב מאוד';
    if (mark >= 70) return 'טוב';
    if (mark >= 60) return 'כמעט טוב';
    return 'נכשל';
  });
};

const getCategory = (mark) => {
  if (mark >= 90) return 'מעולה';
  if (mark >= 80) return 'טוב מאוד';
  if (mark >= 70) return 'טוב';
  if (mark >= 60) return 'כמעט טוב';
  return 'נכשל';
};

const calculateStatistics = (data, studentMark) => {
  const marks = data.map(item => item.mark);
  const total = marks.length;
  const mean = marks.reduce((acc, mark) => acc + mark, 0) / total;
  const stdDev = Math.sqrt(marks.map(mark => Math.pow(mark - mean, 2)).reduce((acc, val) => acc + val, 0) / total);

  const sortedMarks = [...marks].sort((a, b) => b - a);
  const rank = sortedMarks.indexOf(studentMark) + 1;

  return {
    mean,
    stdDev,
    rank,
  };
};

const ScoreCharts = () => {
  const [selectedTest, setSelectedTest] = useState(null); // בוחרים מבחן מסוים
  const [studentMark, setStudentMark] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [statistics, setStatistics] = useState({ mean: 0, stdDev: 0, rank: 0 });
  const [category, setCategory] = useState('');
  const theme = useTheme();
  const { _id: user } = useAuth();
  const [fetchTestsByListWordId] = useGetAlltestsByListWordIdMutation();
  const [fetchTestsByUserId, { data }] = useGetAllTestsMutation();

  // קבלת רשימת המבחנים לפי מזהה משתמש
  useEffect(() => {
    fetchTestsByUserId({ user });
    if (data) console.log(data, "gdssdfg");
  }, [data]);

  // פעולה לפניית מידע על מבחן ספציפי
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTestsByListWordId({ _id: selectedTest }).unwrap();
        const data = result.data || [];

        const studentData = data.find(item => item.student === "Student A");
        if (studentData) {
          setStudentMark(studentData.mark);
          setCategory(getCategory(studentData.mark));
        }

        const categorizedMarks = categorizeMarks(data.map(item => item.mark));
        const categories = ['מעולה', 'טוב מאוד', 'טוב', 'כמעט טוב', 'נכשל'];
        const counts = categories.map(category => categorizedMarks.filter(c => c === category).length);

        setChartData([
          {
            x: categories,
            y: counts,
            type: 'bar',
            marker: { color: theme.palette.primary.main },
          },
        ]);

        const stats = calculateStatistics(data, studentMark);
        setStatistics(stats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedTest) {
      fetchData();
    }
  }, [selectedTest, theme.palette.primary.main, fetchTestsByListWordId]);

  // עדכון מבחן נבחר
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
          flexDirection: "row",
        }}>
          <Typography variant="h6">
            {category} - ציונך: {studentMark}
          </Typography>
          <Typography variant="h6">
            ממוצע: {statistics.mean.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            סטיית תקן: {statistics.stdDev.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            דירוג: {statistics.rank}
          </Typography>
          <Box className="select-container" mt={2}>
            <Select
              value={selectedTest || ""}
              onChange={handleTestChange}
              variant="outlined"
              sx={{ width: 200 }}
              displayEmpty
            >
              <MenuItem value="" disabled>בחר מבחן</MenuItem>
              {/* הצגת רשימת המבחנים */}
              {data && data.data.map((test, index) => (
                <MenuItem key={index} value={test.listWord}>
                  {test.title} - {new Date(test.date).toLocaleDateString()}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box className="chart-container" mt={2}>
          <Plot
            className='chart'
            data={chartData}
            layout={{
              title: `התפלגות ציונים עבור ${selectedTest}`,
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 200,
              width: 800,
              margin: { t: 40, b: 40, l: 40, r: 40 },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ScoreCharts;




// import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import { useTheme, Typography, Select, MenuItem, Box } from '@mui/material'; // ייבוא רכיבי MUI
// import { ThemeProvider } from '@mui/material/styles';
// // import './ScoreCharts.css'; // ייבוא קובץ ה-CSS

// const initialData = {
//   Math: [
//     { student: "Student A", mark: 95 },
//     { student: "Student B", mark: 85 },
//     { student: "Student C", mark: 90 },
//     { student: "Student D", mark: 70 },
//   ],
//   English: [
//     { student: "Student A", mark: 88 },
//     { student: "Student B", mark: 90 },
//     { student: "Student C", mark: 85 },
//     { student: "Student D", mark: 80 },
//   ],
// };

// const categorizeMarks = (marks) => {
//   return marks.map(mark => {
//     if (mark >= 90) return 'מעולה';
//     if (mark >= 80) return 'טוב מאוד';
//     if (mark >= 70) return 'טוב';
//     if (mark >= 60) return 'כמעט טוב';
//     return 'נכשל';
//   });
// };

// const getCategory = (mark) => {
//   if (mark >= 90) return 'מעולה';
//   if (mark >= 80) return 'טוב מאוד';
//   if (mark >= 70) return 'טוב';
//   if (mark >= 60) return 'כמעט טוב';
//   return 'נכשל';
// };

// const calculateStatistics = (data, studentMark) => {
//   const marks = data.map(item => item.mark);
//   const total = marks.length;
//   const mean = marks.reduce((acc, mark) => acc + mark, 0) / total;
//   const stdDev = Math.sqrt(marks.map(mark => Math.pow(mark - mean, 2)).reduce((acc, val) => acc + val, 0) / total);

//   const sortedMarks = [...marks].sort((a, b) => b - a);
//   const rank = sortedMarks.indexOf(studentMark) + 1;

//   return {
//     mean,
//     stdDev,
//     rank,
//   };
// };

// const ScoreCharts = () => {
//   const [selectedTest, setSelectedTest] = useState(Object.keys(initialData)[0]);
//   const [studentMark, setStudentMark] = useState(0);
//   const [chartData, setChartData] = useState([]);
//   const [statistics, setStatistics] = useState({ mean: 0, stdDev: 0, rank: 0 });
//   const [category, setCategory] = useState('');

//   const theme = useTheme();

//   useEffect(() => {
//     const data = initialData[selectedTest];
//     const studentData = data.find(item => item.student === "Student A");

//     if (studentData) {
//       setStudentMark(studentData.mark);
//       setCategory(getCategory(studentData.mark));
//     }

//     const categorizedMarks = categorizeMarks(data.map(item => item.mark));
//     const categories = ['מעולה', 'טוב מאוד', 'טוב', 'כמעט טוב', 'נכשל'];
//     const counts = categories.map(category => categorizedMarks.filter(c => c === category).length);

//     setChartData([
//       {
//         x: categories,
//         y: counts,
//         type: 'bar',
//         marker: { color: theme.palette.primary.main },
//       },
//     ]);

//     const stats = calculateStatistics(data, studentMark);
//     setStatistics(stats);
//   }, [selectedTest, theme.palette.primary.main]);

//   const handleTestChange = (event) => {
//     setSelectedTest(event.target.value);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box p={2}>
//         <Box ml={2} color={theme.palette.primary.main} sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: "row",
//         }}>
//           <Typography variant="h6">
//             {category} - ציונך: {studentMark}
//           </Typography>
//           <Typography variant="h6">
//             ממוצע: {statistics.mean.toFixed(2)}
//           </Typography>
//           <Typography variant="h6">
//             סטיית תקן: {statistics.stdDev.toFixed(2)}
//           </Typography>
//           <Typography variant="h6">
//             דירוג: {statistics.rank} מתוך {initialData[selectedTest].length}
//           </Typography>
//           <Box className="select-container" mt={2}>
//           <Select
//             value={selectedTest}
//             onChange={handleTestChange}
//             variant="outlined"
//             sx={{ width: 200 }}
//           >
//             {Object.keys(initialData).map(test => (
//               <MenuItem key={test} value={test}>{test}</MenuItem>
//             ))}
//           </Select>
//         </Box>
//         </Box>

//         <Box className="chart-container" mt={2}>
//           <Plot
//             className='chart'
//             data={chartData}
//             layout={{
//               title: `התפלגות ציונים עבור ${selectedTest}`,
//               paper_bgcolor: '#ffffff',
//               plot_bgcolor: '#f3f3f3',
//               height: 200, /* גובה של 40% מגובה החלון */
//               width:800,
//               margin: { t: 40, b: 40, l: 40, r: 40 }, // הוספת מרווחים סביב הגרף
//             }}
//           />
//         </Box>

//         {/* <Box className="select-container" mt={2}>
//           <Select
//             value={selectedTest}
//             onChange={handleTestChange}
//             variant="outlined"
//             sx={{ width: 200 }}
//           >
//             {Object.keys(initialData).map(test => (
//               <MenuItem key={test} value={test}>{test}</MenuItem>
//             ))}
//           </Select>
//         </Box> */}

//       </Box>
//     </ThemeProvider>
//   );
// }

// export default ScoreCharts;



