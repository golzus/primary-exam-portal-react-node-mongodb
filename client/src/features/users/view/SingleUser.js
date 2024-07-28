


// import React, { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
// import { useUpdateUserMutation, useGetAllUsersQuery } from './userApiSlice';
// import "./single-user.css";

// const SingleUser = () => {
//     const { userId } = useParams();
//     const { error, data, isLoading, isError } = useGetAllUsersQuery();
//     const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompaniesQuery();
//     const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (updateSuccess) {
//             navigate("/dash/users");
//         }
//     }, [updateSuccess, navigate]);

//     if (isLoading || companiesLoading) return <h1>Loading...</h1>;
//     if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
//     if (companiesError) return <h1>Error loading companies: {JSON.stringify(companiesError)}</h1>;

//     const user = data?.data?.find(user => user._id === userId);

//     if (!user) return <h1>User not found</h1>;

//     const formSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const userObject = Object.fromEntries(formData.entries());
//         updateUser(userObject);
//     };

//     return (
//         <div className='single-user-container'>
//             <div className='single-user-info'>
//                 <div className='single-user-img-container'>
//                     {user.userName}
//                 </div>
//                 <div className='single-user-form-container'>
//                     <form onSubmit={formSubmit} className='single-user-form'>
//                         <input name='_id' defaultValue={user._id} type='hidden' />
//                         <label>שם יחודי</label>
//                         <input value={user.username} readOnly type='text' name='username' placeholder='הכנס שם יחודי' />
//                         <label>שם פרטי</label>
//                         <input defaultValue={user.fullname} type='text' name='fullname' placeholder='הכנס שם יחודי' />
//                         <label>Company</label>
//                         <select name='company' id='company' required>
//                             {companies?.data ? companies.data.map(company => (
//                                 <option key={company._id} selected={company._id === user.company?._id} value={company._id}>
//                                     {company.name}
//                                 </option>
//                             )) : <option value="">No companies available</option>}
//                         </select>
//                         <label>Roles</label>
//                         <select name='roles' id='roles'>
//                             <option value="Student">הרשאה</option>
//                             <option selected={user.roles === 'Teacher'} value="Teacher">Teacher</option>
//                             <option selected={user.roles === 'Student'} value="Student">Student</option>
//                         </select>
//                         <label>פעיל</label>
//                         <select name='active' id='active'>
//                             <option selected={!user.active} value={false}>לא פעיל</option>
//                             <option selected={user.active} value={true}>פעיל</option>
//                         </select>
//                         <label>מייל</label>
//                         <input defaultValue={user.email} type='email' name='email' placeholder='מייל' />
//                         <button>עדכן</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleUser;



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
import { useUpdateUserMutation, useGetAllUsersQuery, useGetUserByIdMutation } from './userApiSlice';
import { Card, CardContent, Typography, TextField, Button, Box, Grid, MenuItem } from '@mui/material';
import "./single-user.css";
import useAuth from '../../../hooks/useAuth';

const SingleUser = ({notForATeacher}) => {
  const [userId,setUserId]=useState("")
  const { userId:id } = useParams();
  const {roles,_id}=useAuth()
  const [getUserById,{data,isLoading,isError,error,isSuccess}]=useGetUserByIdMutation()
  //if user is student
  useEffect(()=>{
    if(roles==='Student')
      setUserId(_id)
  else
    setUserId(id)
    console.log(_id,"rr");
      console.log(userId,"rol");
      getUserById({_id})
  },[roles])
  // const { error, data, isLoading, isError } = useGetAllUsersQuery();
  // const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompaniesQuery();
  const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (updateSuccess) {
      if(roles==='Teacher'&&!notForATeacher)
      navigate("/dash/users");
    else
    navigate("")
    }
  }, [updateSuccess, navigate]);

  if (isLoading ) return <Typography variant="h4">Loading...</Typography>;
  if (isError||!isSuccess) return <Typography variant="h4">Error: {JSON.stringify(error)}</Typography>;
  // if (companiesError) return <Typography variant="h4">Error loading companies: {JSON.stringify(companiesError)}</Typography>;

  // const user = data?.data?.find(user => user._id === userId);
  const  user=data.data
console.log(user.fullname,"us");
  if (!user) return <Typography variant="h4">User not found</Typography>;
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    updateUser(userObject);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          Edit User
        </Typography>
        <form onSubmit={formSubmit}>
          <input name='_id' defaultValue={user._id} type='hidden' />
          <input name='roles' defaultValue={user.roles} type='hidden' />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                defaultValue={user.username}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                defaultValue={user.fullname}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Company"
                name="company"
                defaultValue={user.company?._id}
              >
                {companies?.data?.map(company => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Role"
                name="roles"
                defaultValue={user.roles}
              >
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </TextField>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Active"
                name="active"
                defaultValue={user.active}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                defaultValue={user.email}
                type="email"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default SingleUser;

