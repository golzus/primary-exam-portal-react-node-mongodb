

import React, { useEffect, useState } from 'react';
import './currentSchoolAndClass.css'
import { useGetAllSchoolsQuery, useGetAllClassesQuery } from '../CompaniesApiSlice';
import useAuth from '../../../hooks/useAuth';
import { BiSolidSchool } from "react-icons/bi";
import {chooseSchool,chooseClass}from './currentSchoolAndClassSlice'
// import {chooseClass}from './currentClassSlice'
import { useDispatch, useSelector } from 'react-redux';
const CurrentSchoolAndClass = () => {
  const { data: Schools, isError, error, isLoading } = useGetAllSchoolsQuery();
  const {data:classes,isError:classesisError,isLoading:classesIsLoading,error:classesError}=useGetAllClassesQuery()
//  const  state=useSelector((state)=>state)
//  console.log(state,"data");
const dispatch=useDispatch()

  const [inputValue,setInputValue]= useState("")
  const handleInputChange =(event)=>{
  setInputValue(event.target.value)
  }
  const handleChangeSchool=(event)=>{
   dispatch(chooseSchool(event.target.value))
   setInputValue(event.target.value)
}
  
   const handleChangeClass=(event)=>{
     dispatch(chooseClass(event.target.value))}

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

console.log(Schools);

  return (
   <div className='div-choose-classAndSchool'>
        <form className='form-choose-classAndSchool'>
            choose a school and a claas
     {/* <select name='school' onChange={handleInputChange} id='school'required> */}
     <select name='school' onChange={handleChangeSchool} id='school'required>

   
            <  option  name='school' id='school'> ?school</option>
            {Schools.data.map(school=>{
                return <option  value={school._id}>{school.name}</option>

           })}
        
        </select>
         <select name='class' onChange={handleChangeClass}  id='class'required>
            <option  name='class' id='class'>?class</option>
            {classes?.data.map(school=>{
                return school.school===inputValue&&<option  value={school._id}>{school.name}</option>

           })}
        </select>
        </form>       
        {/* <BiSolidSchool />        */}
   </div>
  );
};

export default CurrentSchoolAndClass;
