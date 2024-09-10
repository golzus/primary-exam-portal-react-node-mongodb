


import React, { useEffect, useState } from 'react';
import { useAddUserMutation } from '../view/userApiSlice';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography } from '@mui/material';
import useSchoolAndClass from '../../../hooks/useSchoolAndClass';
import CurrentSchoolAndClass from '../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass';

const AddUserForm = ({ setShowThankYou, setOpenModal }) => {
  const [addUser, { isError, error, isSuccess, isLoading }] = useAddUserMutation();
  //בדיקה האם המורה בחרה כיתה וב''ס ואם לא אפשרות לבחירה
const { chosenClass, chosenSchool } = useSchoolAndClass();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    school: chosenSchool,
    class: chosenClass,
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
    console.log(formData,"formData");
    addUser(formData);
  };


if(!chosenClass)
return <CurrentSchoolAndClass/>

  

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
      {/* <FormControl required fullWidth>
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
      <TextField
  id='school'
  type='hidden'
  name='school'
  value={chosenSchool}
/>
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
      </FormControl> */}
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
          {/* <MenuItem value='Teacher'>Teacher</MenuItem> */}
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
