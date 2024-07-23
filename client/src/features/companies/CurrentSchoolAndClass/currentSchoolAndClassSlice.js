import { createSlice } from "@reduxjs/toolkit";
const schoolAndClassInitState={
    chosenSchool:"",
    chosenClass:"",
    chosenNameSchool:"",
     chosenNameClass:""
}
const currentSchoolAndClassSlice=createSlice({
    name:"currentSchoolAndClass",
    initialState:schoolAndClassInitState,
    reducers:{
     chooseSchool:(state,action)=>{
       state.chosenSchool=action.payload 
     } ,
     chooseClass:(state,action)=>{
        state.chosenClass=action.payload
     } ,
     nameSchool:(state,action)=>{
      state.chosenNameSchool=action.payload
   } ,
     nameClass:(state,action)=>{
      state.chosenNameClass=action.payload
   } 
    }
})
export const {chooseClass,chooseSchool,nameSchool,nameClass}=currentSchoolAndClassSlice.actions
export default currentSchoolAndClassSlice.reducer