import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useGetAllTestsMutation } from '../listWord/view/ListWordApiSlice';
import ScoreCharts from './ScoreCharts';
import useAuth from '../../../hooks/useAuth';

const colors = ['#9B153B', '#C63D5D', '#E64A7B', '#F7A6B2', '#FFB3B3'];

const MainGraphs = () => {
  const {_id:user}=useAuth()
  const [getAllTests] = useGetAllTestsMutation();
  const [testData, setTestData] = useState([]);

  // Fetch tests data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTests({ user }).unwrap();
        if (!response.error) {
          setTestData(response.data);
          console.log(response.data,"data");
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    };

    fetchData();
  }, [getAllTests]);

  // Prepare data for the charts based on testData
 // הוספנו בדיקה של מערך הנתונים לפני השרטוט
const barData = [
  {
    x: testData.map(item => item.title || "Test"), // שימוש ב-title עבור שם המבחן
    y: testData.map(item => item.mark || 0), // במידה ו-mark חסר, קובע ל-0
    type: 'bar',
    marker: { color: colors[0] },
  },
];

const lineData = [
  {
    x: testData.map(item => item.title || "Test"),
    y: testData.map(item => item.mark || 0),
    type: 'line',
    marker: { color: colors[1] },
  },
];

const pieData = [
  {
    labels: testData.map(item => item.title || "Test"),
    values: testData.map(item => item.mark || 0),
    type: 'pie',
    marker: { colors },
  },
];


  return (
    <div className='graphsContent'>
      <Box sx={{
        height: '68vh',
        width: '50w',
        margin: 'auto',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
      }}>
        <div><ScoreCharts /></div>
        <div className='graphs'>
          <Plot
            className='chart'
            data={barData}
            layout={{
              title: 'ציונים לפי בוחן',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
          <Plot
            className='chart'
            data={lineData}
            layout={{
              title: 'התקדמות ציונים לאורך זמן',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
          <Plot
            className='chart'
            data={pieData}
            layout={{
              title: 'חלוקה לפי רמות ציונים',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default MainGraphs;






// import { Box } from '@mui/material';


// import React from 'react';
// import Plot from 'react-plotly.js';
// import ScoreCharts from './ScoreCharts';
// // import './MainGraphs.css'
// // import LineChart from './lineData';
// // צבעים בורדו בגוונים שונים
// const colors = [
//   '#9B153B',  // בורדו כהה
//   '#C63D5D',  // גוון בורדו בינוני
//   '#E64A7B',  // גוון בורדו בהיר
//   '#F7A6B2',  // גוון בורדו בהיר מאוד
//   '#FFB3B3',  // ורוד בורדו מאוד בהיר
// ];

// const initialData = [
//   { test: "Math", mark: 90 },
//   { test: "English", mark: 85 },
//   { test: "Science", mark: 88 },
//   { test: "History", mark: 78 },
//   { test: "Geography", mark: 92 },
// ];

// // 1. גרף עמודות של ציונים לפי בוחן
// const barData = [
//   {
//     x: initialData.map(item => item.test),
//     y: initialData.map(item => item.mark),
//     type: 'bar',
//     marker: { color: colors[0] },
//   },
// ];

// // 2. גרף קווים של התקדמות ציונים לאורך זמן
// const lineData = [
//   {
//     x: initialData.map(item => item.test),
//     y: initialData.map(item => item.mark),
//     type: 'line',
//     marker: { color: colors[1] },
//   },
// ];

// // 3. גרף עוגה של חלוקה לאחוזים של ציונים לפי רמות
// const pieData = [
//   {
//     labels: initialData.map(item => item.test),
//     values: initialData.map(item => item.mark),
//     type: 'pie',
//     marker: { colors },
//   },
// ];

// // 4. גרף עמודות עם השוואה בין תלמידות בבוחן מסוים
// const groupedBarData = [
//   {
//     x: initialData.map(item => item.test),
//     y: [80, 90, 85, 70, 92],  // ציונים של תלמידות שונות
//     type: 'bar',
//     name: 'Student A',
//     marker: { color: colors[2] },
//   },
//   {
//     x: initialData.map(item => item.test),
//     y: [75, 85, 80, 65, 88],  // ציונים של תלמידות נוספות
//     type: 'bar',
//     name: 'Student B',
//     marker: { color: colors[3] },
//   },
// ];

// // 5. גרף עוגה של אחוזי הציונים מכלל הבחנים
// const pieTotalData = [
//   {
//     labels: initialData.map(item => item.test),
//     values: initialData.map(item => item.mark),
//     type: 'pie',
//     marker: { colors },
//   },
// ];

// const MainGraphs = () => {
//   return (
//     <div className='graphsContent'>
//       <Box sx={{   height: '68vh', 
//       width:'50w',
//           margin: 'auto',
//           backgroundColor: '#ffffff',  // צבע רקע לבן
//           padding: '20px',
//           borderRadius: '16px',
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
//           overflowY: 'auto',}}>
//         {/* <div className='headers'><h1>average</h1><h1>num</h1><h1>what you are</h1></div> */}
//         <div>  <ScoreCharts   /></div>
//     <div className='graphs'>
  

//       {/* גרף עמודות של ציונים לפי בוחן */}
//       <Plot
//         className='chart'
//         data={barData}
//         layout={{
//           title: 'ציונים לפי בוחן',
//           paper_bgcolor: '#ffffff',
//           plot_bgcolor: '#f3f3f3',



          
//           height: 350, /* גובה של 40% מגובה החלון */
//     width: 400


//         }}
//       />
//       {/* גרף קווים של התקדמות ציונים לאורך זמן */}
//       <Plot
//         className='chart'
//         data={lineData}
//         layout={{
//           title: 'התקדמות ציונים לאורך זמן',
//           height: 350, /* גובה של 40% מגובה החלון */
//           width: 400,
//           paper_bgcolor: '#ffffff',
//           plot_bgcolor: '#f3f3f3',
//         }}
//       />
//       {/* גרף עוגה של חלוקה לאחוזים של ציונים לפי רמות */}
//       <Plot
//          className='chart'
//         data={pieData}
//         layout={{
//           title: 'חלוקה לפי רמות ציונים',
//           height: 350, /* גובה של 40% מגובה החלון */
//           width: 400,
//           paper_bgcolor: '#ffffff',
//           plot_bgcolor: '#f3f3f3',
//         }}
//       />
//       {/* גרף עמודות עם השוואה בין תלמידות בבוחן מסוים */}
//       {/* <Plot
//          className='chart'
//         data={groupedBarData}
//         layout={{
//           title: 'השוואה בין תלמידות בבוחן מסוים',
         
//           paper_bgcolor: '#ffffff',
//           plot_bgcolor: '#f3f3f3',
//         }}
//       /> */}
//       {/* גרף עוגה של אחוזי הציונים מכלל הבחנים */}
//       {/* <Plot
//          className='chart'
//         data={pieTotalData}
//         layout={{
//           title: 'אחוזי ציונים מכלל הבחנים',
//           paper_bgcolor: '#ffffff',
//           plot_bgcolor: '#f3f3f3',
//         }}
//       /> */}
    
//     </div>
//     </Box>
//     </div>
//   );
// }

// export default MainGraphs;
