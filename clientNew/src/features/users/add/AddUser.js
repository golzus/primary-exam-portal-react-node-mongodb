import { useEffect } from 'react';
import React from 'react'
import "./add-user.css"
import {useAddUserMutation}from '../view/userApiSlice'
import { useGetAllClassesQuery, useGetAllSchoolsQuery}from '../../companies/CompaniesApiSlice'
import { useNavigate } from 'react-router-dom'
import {useState} from "react"
   



const AddUser = () => {
    const {data:classes,isError:classesisError,isLoading:classesIsLoading,error:classesError}=useGetAllClassesQuery()
if(classes)console.log(classes);

    const [inputValue,setInputValue]= useState("")
    const handleInputChange =(event)=>{
    setInputValue(event.target.value)
    }
    const [addUser,{ isError, error, isSuccess,data, isLoading }]=useAddUserMutation()
    const {data:schools,errorschoolsisError,error:schoolsErrorData,isLoading:schoolsisLoading}=useGetAllSchoolsQuery()

const navigate = useNavigate();

useEffect(() => {
    if (isSuccess) {
        navigate("/dash/users");
    }
}, [isSuccess]);
const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    addUser(userObject);
};
if (isLoading||schoolsisLoading|classesIsLoading) return <h1>Loading...</h1>;
if (isError||schoolsErrorData||classesError) return <h1>Error: {JSON.stringify(error)}</h1>;

    return (
        
        <div className='add-user-container'>
            <form onSubmit={formSubmit} className='add-user-form'>
                <input
                    type='text'
                    required
                    name='username'
                    placeholder='שם יחודי' />
                <input
                    type='text'
                    required
                    name='password'
                    placeholder='סיסמה' />
                <input
                    type='text'
                    required
                    name='fullname'
                    placeholder='שם פרטי' />

                {/* <select required name='company' id='company'>
                    <option value=""> בחר סוג</option>
                    <option value="OM">עסק מורשה</option>

                    <option value="OP"> עסק פטור</option>
                    <option value="AM"> עמותה</option>
                    <option value="CM"> חברה</option>
                    <option value="SYS"> מערכת</option>
                </select> */}
        <select name='school' onChange={handleInputChange}  id='school'required>
            <option  name='school' id='school'>?school</option>
            {schools.data.map(school=>{
                return <option  value={school._id}>{school.name}</option>

           })}
        </select>
        <select name='class'  id='class'required>
            <option  name='class' id='class'>?class</option>
            {classes?.data.map(school=>{
                return school.school===inputValue&&<option  value={school._id}>{school.name}</option>

           })}
        </select>
        <select  name='roles' id='roles'>
        <option value={"Student"}>
            הרשאה
        </option>
        <option value={"Teacher"}>Teacher</option>
        <option value={"Student"}>Student</option>

        </select>
                <select name='active' id='active'>
                    <option value={true}> פעיל? </option>
                    <option value={false}> לא פעיל </option>
                    <option value={true}> פעיל</option>

                </select>
                <input
                    type='email'
                    name='email'
                    placeholder='email' />

                <button type='submit'> שלח</button>
            </form>
        </div>)
}

export default AddUser