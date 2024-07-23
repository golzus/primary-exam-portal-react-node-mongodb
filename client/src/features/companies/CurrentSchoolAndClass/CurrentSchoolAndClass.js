

// import React, { useEffect, useState } from 'react';
// import './currentSchoolAndClass.css'
// import { useGetAllSchoolsQuery, useGetAllClassesQuery } from '../CompaniesApiSlice';
// import useAuth from '../../../hooks/useAuth';
// import { BiSolidSchool } from "react-icons/bi";
// import {chooseSchool,chooseClass}from './currentSchoolAndClassSlice'
// // import {chooseClass}from './currentClassSlice'
// import { useDispatch, useSelector } from 'react-redux';
// const CurrentSchoolAndClass = () => {
//   const { data: Schools, isError, error, isLoading } = useGetAllSchoolsQuery();
//   const {data:classes,isError:classesisError,isLoading:classesIsLoading,error:classesError}=useGetAllClassesQuery()
// //  const  state=useSelector((state)=>state)
// //  console.log(state,"data");
// const dispatch=useDispatch()

//   const [inputValue,setInputValue]= useState("")
//   const handleInputChange =(event)=>{
//   setInputValue(event.target.value)
//   }
//   const handleChangeSchool=(event)=>{
//    dispatch(chooseSchool(event.target.value))
//    setInputValue(event.target.value)
// }
  
//    const handleChangeClass=(event)=>{
//      dispatch(chooseClass(event.target.value))}

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

// console.log(Schools);

//   return (
//    <div className='div-choose-classAndSchool'>
//         <form className='form-choose-classAndSchool'>
//             choose a school and a claas
//      {/* <select name='school' onChange={handleInputChange} id='school'required> */}
//      <select name='school' onChange={handleChangeSchool} id='school'required>

   
//             <  option  name='school' id='school'> ?school</option>
//             {Schools.data.map(school=>{
//                 return <option  value={school._id}>{school.name}</option>

//            })}
        
//         </select>
//          <select name='class' onChange={handleChangeClass}  id='class'required>
//             <option  name='class' id='class'>?class</option>
//             {classes?.data.map(school=>{
//                 return school.school===inputValue&&<option  value={school._id}>{school.name}</option>

//            })}
//         </select>
//         </form>       
//         {/* <BiSolidSchool />        */}
//    </div>
//   );
// };

// export default CurrentSchoolAndClass;



// import React, { useState } from 'react';
// import { useGetAllSchoolsQuery, useGetAllClassesQuery } from '../CompaniesApiSlice';
// import { chooseSchool, chooseClass,nameClass,nameSchool } from './currentSchoolAndClassSlice';
// import { useDispatch } from 'react-redux';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Typography, Box, CircularProgress, Alert } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8b0000', // צבע אדום כהה לצבע הראשי
//     },
//     secondary: {
//       main: '#e91e63', // צבע ורוד לצבע המשני
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Arial',
//       'Helvetica',
//       'sans-serif',
//     ].join(','), // פונטים לשימוש
//   },
// });

// const CurrentSchoolAndClass = () => {
//   const { data: Schools, isError, error, isLoading } = useGetAllSchoolsQuery(); // קבלת נתוני בתי ספר מהשרת
//   const { data: classes, isError: classesIsError, isLoading: classesIsLoading, error: classesError } = useGetAllClassesQuery(); // קבלת נתוני כיתות מהשרת
//   const dispatch = useDispatch(); // הגדרת פונקציית dispatch לעדכון state
//   const [inputValue, setInputValue] = useState(""); // הגדרת state לאחסון הערך הנבחר

//   const handleChangeSchool = (event) => {
//     dispatch(chooseSchool(event.target.value)); // שליחת הערך הנבחר לעדכון state
//     setInputValue(event.target.value); // עדכון הערך הנבחר
//   };

//   const handleChangeClass = (event) => {
//     dispatch(chooseClass(event.target.value)); // שליחת הערך הנבחר לעדכון state
//   };

//   if (isLoading || classesIsLoading) return <CircularProgress color="primary" />; // הצגת עיגול טעינה בעת טעינת הנתונים
//   if (isError || classesIsError) return <Alert severity="error">{JSON.stringify(error || classesError)}</Alert>; // הצגת הודעת שגיאה במקרה של שגיאה בטעינת הנתונים

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline /> {/* עיצוב בסיסי מ-MUI */}
//         <Box
//           sx={{
//             marginTop: '20vh', // מרחק מהחלק העליון של הדף
//             display: 'flex', // הגדרת תצוגה כ-flex
//             flexDirection: 'column', // תצוגה בטור
//             alignItems: 'center', // מרכזית לרוחב
//             backgroundColor: '#f9f9f9', // צבע רקע לבן
//             padding: '20px', // ריפוד
//             borderRadius: '8px', // פינות מעוגלות
//             boxShadow: '0 3px 6px rgba(0,0,0,0.1)', // צל
//           }}
//         >
//           <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//             בחירת בית ספר וכיתה
//           </Typography>
//           <Box component="form" sx={{ width: '100%' }}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="school-label">בית ספר</InputLabel>
//               <Select
//                 labelId="school-label"
//                 id="school"
//                 value={inputValue}
//                 onChange={handleChangeSchool}
//                 label="בית ספר"
//                 required
//               >
//                 <MenuItem value="">
//                   <em>בחר בית ספר</em>
//                 </MenuItem>
//                 {Schools?.data.map((school) => (
//                   <MenuItem key={school._id} value={school._id}>
//                     {school.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="class-label">כיתה</InputLabel>
//               <Select
//                 labelId="class-label"
//                 id="class"
//                 onChange={handleChangeClass}
//                 label="כיתה"
//                 required
//               >
//                 <MenuItem value="">
//                   <em>בחר כיתה</em>
//                 </MenuItem>
//                 {classes?.data
//                   .filter((school) => school.school === inputValue)
//                   .map((classItem) => (
//                     <MenuItem key={classItem._id} value={classItem._id}>
//                       {classItem.name}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default CurrentSchoolAndClass;



import React, { useState } from 'react';
import { useGetAllSchoolsQuery, useGetAllClassesQuery } from '../CompaniesApiSlice';
import { chooseSchool, chooseClass, nameClass, nameSchool } from './currentSchoolAndClassSlice';
import { useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Typography, Box, CircularProgress, Alert } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8b0000', // צבע אדום כהה לצבע הראשי
    },
    secondary: {
      main: '#e91e63', // צבע ורוד לצבע המשני
    },
  },
  typography: {
    fontFamily: [
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','), // פונטים לשימוש
  },
});

const CurrentSchoolAndClass = () => {
  const { data: Schools, isError, error, isLoading } = useGetAllSchoolsQuery(); // קבלת נתוני בתי ספר מהשרת
  const { data: classes, isError: classesIsError, isLoading: classesIsLoading, error: classesError } = useGetAllClassesQuery(); // קבלת נתוני כיתות מהשרת
  const dispatch = useDispatch(); // הגדרת פונקציית dispatch לעדכון state
  const [selectedSchoolId, setSelectedSchoolId] = useState(""); // הגדרת state לאחסון הערך הנבחר של בית הספר
  const [selectedClassId, setSelectedClassId] = useState(""); // הגדרת state לאחסון הערך הנבחר של הכיתה

  const handleChangeSchool = (event) => {
    const selectedSchoolId = event.target.value;
    const selectedSchool = Schools.data.find(school => school._id === selectedSchoolId);
    dispatch(chooseSchool(selectedSchoolId)); // שליחת הערך הנבחר לעדכון state
    dispatch(nameSchool(selectedSchool.name)); // שליחת שם בית הספר לעדכון state
    setSelectedSchoolId(selectedSchoolId); // עדכון הערך הנבחר
    console.log('Selected School:', selectedSchool.name); // הדפסת שם בית הספר
  };

  const handleChangeClass = (event) => {
    const selectedClassId = event.target.value;
    const selectedClass = classes.data.find(classItem => classItem._id === selectedClassId);
    dispatch(chooseClass(selectedClassId)); // שליחת הערך הנבחר לעדכון state
    dispatch(nameClass(selectedClass.name)); // שליחת שם הכיתה לעדכון state
    setSelectedClassId(selectedClassId); // עדכון הערך הנבחר
    console.log('Selected Class:', selectedClass.name); // הדפסת שם הכיתה
  };

  if (isLoading || classesIsLoading) return <CircularProgress color="primary" />; // הצגת עיגול טעינה בעת טעינת הנתונים
  if (isError || classesIsError) return <Alert severity="error">{JSON.stringify(error || classesError)}</Alert>; // הצגת הודעת שגיאה במקרה של שגיאה בטעינת הנתונים

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> {/* עיצוב בסיסי מ-MUI */}
        <Box
          sx={{
            marginTop: '20vh', // מרחק מהחלק העליון של הדף
            display: 'flex', // הגדרת תצוגה כ-flex
            flexDirection: 'column', // תצוגה בטור
            alignItems: 'center', // מרכזית לרוחב
            backgroundColor: '#f9f9f9', // צבע רקע לבן
            padding: '20px', // ריפוד
            borderRadius: '8px', // פינות מעוגלות
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)', // צל
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            בחירת בית ספר וכיתה
          </Typography>
          <Box component="form" sx={{ width: '100%' }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="school-label">בית ספר</InputLabel>
              <Select
                labelId="school-label"
                id="school"
                value={selectedSchoolId}
                onChange={handleChangeSchool}
                label="בית ספר"
                required
              >
                <MenuItem value="">
                  <em>בחר בית ספר</em>
                </MenuItem>
                {Schools?.data.map((school) => (
                  <MenuItem key={school._id} value={school._id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="class-label">כיתה</InputLabel>
              <Select
                labelId="class-label"
                id="class"
                value={selectedClassId}
                onChange={handleChangeClass}
                label="כיתה"
                required
              >
                <MenuItem value="">
                  <em>בחר כיתה</em>
                </MenuItem>
                {classes?.data
                  .filter((classItem) => classItem.school === selectedSchoolId)
                  .map((classItem) => (
                    <MenuItem key={classItem._id} value={classItem._id}>
                      {classItem.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CurrentSchoolAndClass;
