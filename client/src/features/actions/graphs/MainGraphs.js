

import React from 'react';
import Plot from 'react-plotly.js';
import ScoreCharts from './ScoreCharts';
import './MainGraphs.css'
import LineChart from './lineData';
// צבעים בורדו בגוונים שונים
const colors = [
  '#9B153B',  // בורדו כהה
  '#C63D5D',  // גוון בורדו בינוני
  '#E64A7B',  // גוון בורדו בהיר
  '#F7A6B2',  // גוון בורדו בהיר מאוד
  '#FFB3B3',  // ורוד בורדו מאוד בהיר
];

const initialData = [
  { test: "Math", mark: 90 },
  { test: "English", mark: 85 },
  { test: "Science", mark: 88 },
  { test: "History", mark: 78 },
  { test: "Geography", mark: 92 },
];

// 1. גרף עמודות של ציונים לפי בוחן
const barData = [
  {
    x: initialData.map(item => item.test),
    y: initialData.map(item => item.mark),
    type: 'bar',
    marker: { color: colors[0] },
  },
];

// 2. גרף קווים של התקדמות ציונים לאורך זמן
const lineData = [
  {
    x: initialData.map(item => item.test),
    y: initialData.map(item => item.mark),
    type: 'line',
    marker: { color: colors[1] },
  },
];

// 3. גרף עוגה של חלוקה לאחוזים של ציונים לפי רמות
const pieData = [
  {
    labels: initialData.map(item => item.test),
    values: initialData.map(item => item.mark),
    type: 'pie',
    marker: { colors },
  },
];

// 4. גרף עמודות עם השוואה בין תלמידות בבוחן מסוים
const groupedBarData = [
  {
    x: initialData.map(item => item.test),
    y: [80, 90, 85, 70, 92],  // ציונים של תלמידות שונות
    type: 'bar',
    name: 'Student A',
    marker: { color: colors[2] },
  },
  {
    x: initialData.map(item => item.test),
    y: [75, 85, 80, 65, 88],  // ציונים של תלמידות נוספות
    type: 'bar',
    name: 'Student B',
    marker: { color: colors[3] },
  },
];

// 5. גרף עוגה של אחוזי הציונים מכלל הבחנים
const pieTotalData = [
  {
    labels: initialData.map(item => item.test),
    values: initialData.map(item => item.mark),
    type: 'pie',
    marker: { colors },
  },
];

const MainGraphs = () => {
  return (
    <div className='graphsContent'>
        {/* <div className='headers'><h1>average</h1><h1>num</h1><h1>what you are</h1></div> */}
        <div>  <ScoreCharts   /></div>
    <div className='graphs'>
  

      {/* גרף עמודות של ציונים לפי בוחן */}
      <Plot
        className='chart'
        data={barData}
        layout={{
          title: 'ציונים לפי בוחן',
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f3f3f3',
          height: 300, /* גובה של 40% מגובה החלון */
    width: 300


        }}
      />
      {/* גרף קווים של התקדמות ציונים לאורך זמן */}
      <Plot
        className='chart'
        data={lineData}
        layout={{
          title: 'התקדמות ציונים לאורך זמן',
        
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f3f3f3',
        }}
      />
      {/* גרף עוגה של חלוקה לאחוזים של ציונים לפי רמות */}
      <Plot
         className='chart'
        data={pieData}
        layout={{
          title: 'חלוקה לפי רמות ציונים',
          height: 300, /* גובה של 40% מגובה החלון */
          width: 300,
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f3f3f3',
        }}
      />
      {/* גרף עמודות עם השוואה בין תלמידות בבוחן מסוים */}
      {/* <Plot
         className='chart'
        data={groupedBarData}
        layout={{
          title: 'השוואה בין תלמידות בבוחן מסוים',
         
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f3f3f3',
        }}
      /> */}
      {/* גרף עוגה של אחוזי הציונים מכלל הבחנים */}
      {/* <Plot
         className='chart'
        data={pieTotalData}
        layout={{
          title: 'אחוזי ציונים מכלל הבחנים',
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f3f3f3',
        }}
      /> */}
    
    </div>
  
    </div>
  );
}

export default MainGraphs;
