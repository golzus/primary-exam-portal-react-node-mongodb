import React from 'react';
import Plot from 'react-plotly.js';
import { Box } from '@mui/material';

// הנתונים שלך כאן - תוכל לשים את הנתונים שלך בתצורת JSON מתאימה או לטעון אותם מקובץ
const lineData = [
  {
    x: ['0-10', '11-20', '21-30', '31-40', '41-50'],
    y: [5, 10, 15, 20, 25], // נתוני 'man'
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Man',
    marker: { color: 'blue' },
  },
  {
    x: ['0-10', '11-20', '21-30', '31-40', '41-50'],
    y: [4, 8, 12, 18, 22], // נתוני 'woman'
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Woman',
    marker: { color: 'pink' },
  },
  {
    x: ['0-10', '11-20', '21-30', '31-40', '41-50'],
    y: [3, 6, 9, 15, 20], // נתוני 'child'
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Child',
    marker: { color: 'green' },
  }
];

const LineChart = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Plot
        data={lineData}
        layout={{
          title: {
            text: "Classification of people by age ranges",
            x: 0.5, // מרכז את הכותרת על ציר ה-X
            xanchor: 'center',
            y: 1.1, // מיקום אנכי של הכותרת
            yanchor: 'top',
            font: {
              size: 15,
              color: 'white',
            },
          },
          paper_bgcolor: '#34495e',
          plot_bgcolor: '#34495e',
          font: {
            color: 'white',
          },
          margin: {
            l: 5,
            r: 5,
            t: 5, // להוסיף מקום לכותרת
            b: 5,
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
