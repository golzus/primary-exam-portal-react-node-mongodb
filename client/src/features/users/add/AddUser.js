// import { useEffect } from 'react';
// import React from 'react'
// import "./add-user.css"
// import {useAddUserMutation}from '../view/userApiSlice'
// import { useGetAllClassesQuery, useGetAllSchoolsQuery}from '../../companies/CompaniesApiSlice'
// import { useNavigate } from 'react-router-dom'
// import {useState} from "react"
   



// const AddUser = () => {
//     const {data:classes,isError:classesisError,isLoading:classesIsLoading,error:classesError}=useGetAllClassesQuery()
// if(classes)console.log(classes);

//     const [inputValue,setInputValue]= useState("")
//     const handleInputChange =(event)=>{
//     setInputValue(event.target.value)
//     }
//     const [addUser,{ isError, error, isSuccess,data, isLoading }]=useAddUserMutation()
//     const {data:schools,errorschoolsisError,error:schoolsErrorData,isLoading:schoolsisLoading}=useGetAllSchoolsQuery()

// const navigate = useNavigate();

// useEffect(() => {
//     if (isSuccess) {
//         navigate("/dash/users");
//     }
// }, [isSuccess]);
// const formSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const userObject = Object.fromEntries(formData.entries());
//     addUser(userObject);
// };
// if (isLoading||schoolsisLoading|classesIsLoading) return <h1>Loading...</h1>;
// if (isError||schoolsErrorData||classesError) return <h1>Error: {JSON.stringify(error)}</h1>;

//     return (
        
//         <div className='add-user-container'>
//             <form onSubmit={formSubmit} className='add-user-form'>
//                 <input
//                     type='text'
//                     required
//                     name='username'
//                     placeholder='שם יחודי' />
//                 <input
//                     type='text'
//                     required
//                     name='password'
//                     placeholder='סיסמה' />
//                 <input
//                     type='text'
//                     required
//                     name='fullname'
//                     placeholder='שם פרטי' />

//                 {/* <select required name='company' id='company'>
//                     <option value=""> בחר סוג</option>
//                     <option value="OM">עסק מורשה</option>

//                     <option value="OP"> עסק פטור</option>
//                     <option value="AM"> עמותה</option>
//                     <option value="CM"> חברה</option>
//                     <option value="SYS"> מערכת</option>
//                 </select> */}
//         <select name='school' onChange={handleInputChange}  id='school'required>
//             <option  name='school' id='school'>?school</option>
//             {schools.data.map(school=>{
//                 return <option  value={school._id}>{school.name}</option>

//            })}
//         </select>
//         <select name='class'  id='class'required>
//             <option  name='class' id='class'>?class</option>
//             {classes?.data.map(school=>{
//                 return school.school===inputValue&&<option  value={school._id}>{school.name}</option>

//            })}
//         </select>
//         <select  name='roles' id='roles'>
//         <option value={"Student"}>
//             הרשאה
//         </option>
//         <option value={"Teacher"}>Teacher</option>
//         <option value={"Student"}>Student</option>

//         </select>
//                 <select name='active' id='active'>
//                     <option value={true}> פעיל? </option>
//                     <option value={false}> לא פעיל </option>
//                     <option value={true}> פעיל</option>

//                 </select>
//                 <input
//                     type='email'
//                     name='email'
//                     placeholder='email' />

//                 <button type='submit'> שלח</button>
//             </form>
//         </div>)
// }

// export default AddUser



import React, { useEffect, useState } from 'react';
import { useAddUserMutation } from '../view/userApiSlice';
import { useGetAllClassesQuery, useGetAllSchoolsQuery } from '../../companies/CompaniesApiSlice';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography } from '@mui/material';

const AddUserForm = ({ setShowThankYou, setOpenModal }) => {
  const { data: classes, isError: classesIsError, isLoading: classesIsLoading, error: classesError } = useGetAllClassesQuery();
  const { data: schools, isError: schoolsIsError, isLoading: schoolsIsLoading, error: schoolsErrorData } = useGetAllSchoolsQuery();
  const [addUser, { isError, error, isSuccess, isLoading }] = useAddUserMutation();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    school: '',
    class: '',
    roles: 'Student',
    active: true,
    email: ''
  });

  useEffect(() => {
    if (isSuccess) {
      setShowThankYou(true);
      setOpenModal(false);
    }
  }, [isSuccess]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'school') {
      setInputValue(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser(formData);
  };

  if (classesIsLoading || schoolsIsLoading) return <CircularProgress />;

  if (classesIsError || schoolsIsError) return <Typography color="error">Error: {classesError || schoolsErrorData}</Typography>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        required
        name='username'
        label='שם משתמש'
        placeholder='שם משתמש'
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextField
        required
        name='password'
        label='סיסמה'
        type='password'
        placeholder='סיסמה'
        value={formData.password}
        onChange={handleInputChange}
      />
      <TextField
        required
        name='fullname'
        label='שם מלא'
        placeholder='שם מלא'
        value={formData.fullname}
        onChange={handleInputChange}
      />
      <FormControl required fullWidth>
        <InputLabel id='school-label'>בית ספר</InputLabel>
        <Select
          id='school'
          name='school'
          labelId='school-label'
          value={formData.school}
          onChange={handleInputChange}
          label='בית ספר'
        >
          <MenuItem value="" disabled>בחר בית ספר</MenuItem>
          {schools?.data?.map(school => (
            <MenuItem key={school._id} value={school._id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required fullWidth>
        <InputLabel id='class-label'>כיתה</InputLabel>
        <Select
          id='class'
          name='class'
          labelId='class-label'
          value={formData.class}
          onChange={handleInputChange}
          label='כיתה'
        >
          <MenuItem value="" disabled>בחר כיתה</MenuItem>
          {classes?.data?.filter(cls => cls.school === inputValue).map(cls => (
            <MenuItem key={cls._id} value={cls._id}>
              {cls.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required fullWidth>
        <InputLabel id='roles-label'>הרשאה</InputLabel>
        <Select
          id='roles'
          name='roles'
          labelId='roles-label'
          value={formData.roles}
          onChange={handleInputChange}
          label='הרשאה'
        >
          <MenuItem value='Student'>Student</MenuItem>
          <MenuItem value='Teacher'>Teacher</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='active-label'>פעיל</InputLabel>
        <Select
          id='active'
          name='active'
          labelId='active-label'
          value={formData.active}
          onChange={handleInputChange}
          label='פעיל'
        >
          <MenuItem value={true}>כן</MenuItem>
          <MenuItem value={false}>לא</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        name='email'
        label='אימייל'
        type='email'
        placeholder='אימייל'
        value={formData.email}
        onChange={handleInputChange}
      />
      <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
        {isLoading ? 'ממתין...' : 'שלח'}
      </Button>
      {isError && <Typography color='error'>שגיאה: {error.message}</Typography>}
    </form>
  );
};

export default AddUserForm;
