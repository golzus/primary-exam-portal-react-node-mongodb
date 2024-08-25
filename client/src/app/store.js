// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authReducer from "../features/auth/authSlice"
import currentSchoolAndClassSlice from "../features/companies/CurrentSchoolAndClass/currentSchoolAndClassSlice";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        schoolAndClass:currentSchoolAndClassSlice,
    },
       
    
    middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
    devTools: false//לא שלכוח לשנות בהמשך לfalse


   
    
});

export default store; 

// import { configureStore } from "@reduxjs/toolkit";
// import apiSlice from "./apiSlice";
// import authReducer from "../features/auth/authSlice"

// // הגדרת האתחול הראשוני של המצב
// const initialState = {
//   school: '', // שם בית הספר
//   classroom: '' // שם הכיתה
// };

// // יצירת רדיוסר עבור אובייקט שמכיל את שם בית הספר ואת שם הכיתה
// const schoolClassroomReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_SCHOOL':
//       return {
//         ...state,
//         school: action.payload
//       };
//     case 'SET_CLASSROOM':
//       return {
//         ...state,
//         classroom: action.payload
//       };
//     default:
//       return state;
//   }
// };

// // יצירת החנות הראשית
// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth:authReducer,
//         schoolClassroom: schoolClassroomReducer // הוספת הרדיוסר של אובייקט שמכיל את שם בית הספר ואת שם הכיתה
//     },
//     middleware: (defaultMiddleware) =>
//     defaultMiddleware().concat(apiSlice.middleware),
//     devTools: true //לא שלכוח לשנות בהמשך לfalse
// });

// export default store; 
