



import { createTheme } from '@mui/material/styles';  // מייבא את הפונקציה createTheme מ-MUI ליצירת נושא מותאם אישית

// יצירת נושא מותאם אישית באמצעות הפונקציה createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#9B153B',  // מגדיר את הצבע הראשי עבור כל הרכיבים כנושא בורדו
      light: '#ff5252',  // מגדיר גוון בהיר יותר של הצבע הראשי
      dark: '#d50000',  // מגדיר גוון כהה יותר של הצבע הראשי
    },
    secondary: {
      main: '#9B153B',  // מגדיר את הצבע המשני שיהיה זהה לצבע הראשי (בורדו)
    },
  },
  typography: {
    h1: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h1 כבורדו
    },
    h2: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h2 כבורדו
    },
    h3: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h3 כבורדו
    },
    h4: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h4 כבורדו
    },
    h5: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h5 כבורדו
    },
    h6: {
      color: '#9B153B',  // מגדיר את צבע הכותרת h6 כבורדו
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',  // מבטל את גבולות ברירת המחדל של הרכיב
          borderRadius: '8px',  // מגדיר רדיוס פינות עבור הרכיב (קצוות מעוגלים)
          padding: '16px',  // מוסיף מרווח פנימי (padding) סביב הרכיב
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f3f3e9',  // מגדיר צבע רקע עבור כותרות העמודות
            fontWeight: 'bold',  // מגדיר את משקל הטקסט כמודגש (bold)
            color: '#9B153B',  // מגדיר את צבע הטקסט בכותרות כבורדו
          },
          '& .MuiDataGrid-cell': {
            padding: '8px 16px',  // מגדיר מרווח פנימי בתוך תאי ה-DataGrid
            color: '#9B153B',  // מגדיר את צבע הטקסט בתאים כבורדו
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f3f3e9',  // מגדיר צבע רקע עבור החלק התחתון של ה-DataGrid
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',  // מוסיף צל עדין לחלק התחתון
          },
          '& .MuiCheckbox-root': {
            color: '#9B153B',  // מגדיר את צבע תיבת הסימון כבורדו
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#9B153B',  // מגדיר את צבע הגבול של שדה הטקסט כבורדו
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9B153B',  // מגדיר את צבע הגבול במצב ממוקד (focused) כבורדו
            },
          },
          '& .MuiInputAdornment-root': {
            color: '#9B153B',  // מגדיר את צבע רכיבי עיטור שדה הטקסט (adornment) כבורדו
          },
          '& .MuiInputLabel-root': {
            color: '#9B153B',  // מגדיר את צבע התווית של שדה הטקסט כבורדו
            '&.Mui-focused': {
              color: '#9B153B',  // מגדיר את צבע התווית במצב ממוקד כבורדו
            },
          },
          '& .MuiInputBase-input': {
            backgroundColor: '#ffffff',  // מגדיר צבע רקע לבן עבור שדה הקלט
            padding: '8px',  // מוסיף מרווח פנימי לשדה הקלט
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#9B153B',  // מגדיר צבע רקע של הכפתור כבורדו
          color: '#ffffff',  // מגדיר את צבע הטקסט של הכפתור כלבן
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#9B153B',  // מגדיר את צבע האיקונים בכפתור האיקונים כבורדו
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#9B153B',  // מגדיר את צבע הגבול של תאי הטבלה כבורדו
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9B153B',  // מגדיר את צבע הגבול של תיבת הבחירה כבורדו
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9B153B',  // מגדיר את צבע הגבול במצב ממוקד כבורדו
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',  // מגדיר צבע רקע לבן עבור ה-Popover
           
        },
      },
    },
  },
});

export default theme;  // מייצא את הנושא המותאם לשימוש באפליקציה
