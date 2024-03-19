import { createSlice } from "@reduxjs/toolkit";
const schoolAndClassInitState={
    chosenSchool:"",
    chosenClass:""
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
     } 
    }
})
export const {chooseClass,chooseSchool}=currentSchoolAndClassSlice.actions
export default currentSchoolAndClassSlice.reducer