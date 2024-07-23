
// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import  { useEffect } from 'react';
// import{useGetAllCompaniesQuery}from '../../companies/CompaniesApiSlice'
// import "./single-user.css"
// import{useUpdateUserMutation,useGetAllUsersQuery}from './userApiSlice'
// const SingleUser = () => {
//     const { userId } = useParams(); // Destructure companyId from useParams

//     const {error,data,isLoading,isError}=useGetAllUsersQuery()
//     const {data:companies,error:companiesError,error:companiesErrorData,isLoading:companiesLoading}=useGetAllCompaniesQuery()
//     const [updateUser,{error:updateError,isSuccess:updateSuccess,data:dataError}]=useUpdateUserMutation()
//    console.log(updateError);
//     const navigate=useNavigate()
//     useEffect(() => {
//         if (updateSuccess) {
//             navigate("/dash/users");
//         }
//     }, [updateSuccess]); if (isLoading||companiesLoading)
//     return <h1>Loading...</h1>;
// if (isError)
//     return <h1>Error: {JSON.stringify(error)}</h1>;


//     const user = data.data.find(comp => comp._id === userId);
  
//     if (!user)
//         return <h1>user not found</h1>;
//     const formSubmit=(e)=>{
//         e.preventDefault()
//         const data =new FormData(e.target)
//         const userObject=Object.fromEntries(data.entries())
//       console.log(userObject);
//       updateUser(userObject)
//      }
    
//     return (
//         <div className='single-user-container'>
//         <div className='single-user-info'>
// <div className='single-user-img-container'> 
         
//              {user.userName}
// </div>
// <div className='single-user-form-container'>
//     <form onSubmit={formSubmit} className='single-user-form'>
//     <input name='_id' defaultValue={user._id} type='hidden'/>

//         <label> שם יחודי</label>
//         <input value={user.username}readOnly={true} type='text' name='username'placeholder='הכנס שם יחודי'/>
//         <label> שם פרטי</label>
//         <input  defaultValue={user.fullname} type='text' name='fullname'placeholder='הכנס שם יחודי'/>
      
//         {/* <label>משתמש של חברה </label>
//         <select required name='type' id='type'>
//             <option selected={user.company==='OM'} value="OM" > עוסק מורשה </option>
//             <option selected={user.type==='OP'} value="OP" >  עסוק פטור</option>
//             <option selected={user.type==='AM'} value="AM" > עמותה </option>
//             <option selected={user.type==='CM'} value="CM" > חברה </option>
//             <option selected={user.type==='SYS'} value="SYS" > מערכת</option>
//         </select> */}
//         <label>company</label>
//         <select name='company' id='company'required>
//             {companies.data.map(company=>{
//                 return <option selected={company._id===user.company?._id} value={company._id}>{company.name}</option>
//             })}
//         </select>
//         <select name='roles' id='roles'>
//         <option value={"Student"}>
//             הרשאה
//         </option>
//         <option selected={user.roles==='Teacher'} value={"Teacher"}>Teacher</option>
//         <option selected={user.roles==='Student'} value={"Student"}>Student</option>

//         </select>
//         <label>פעיל</label>
//         <select name='active' id='active'>
//         <option selected={!user.active} value={false}> לא פעיל {""}</option>
//         <option selected={user.active} value={true}> פעיל {""} </option>

//     </select>
//     <label> מייל</label>
//         <input defaultValue={user.email} type='email' name='email'placeholder='מייל  '/>
      
// <button> עדכן</button>
//     </form>
// </div>
//         </div>
//         </div>
//     )
// }

// export default SingleUser


// import React, { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
// import { useUpdateUserMutation, useGetAllUsersQuery } from './userApiSlice';
// import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography } from '@mui/material';

// const SingleUser = () => {
//     const { userId } = useParams();
//     const navigate = useNavigate();

//     const { data, isLoading, isError, error } = useGetAllUsersQuery();
//     const { data: companies, isLoading: companiesLoading, isError: companiesIsError, error: companiesError } = useGetAllCompaniesQuery();
//     const [updateUser, { isSuccess, error: updateError }] = useUpdateUserMutation();

//     useEffect(() => {
//         if (isSuccess) {
//             navigate("/dash/users");
//         }
//     }, [isSuccess, navigate]);

//     if (isLoading || companiesLoading) return <CircularProgress />;
//     if (isError || companiesIsError) return <Typography color="error">Error: {error?.message || companiesError?.message}</Typography>;

//     const user = data?.data?.find(user => user._id === userId);

//     if (!user) return <Typography variant="h6">User not found</Typography>;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const userObject = Object.fromEntries(formData.entries());

//         console.log('Submitting:', userObject); // לוגים של הנתונים לפני שליחה

//         updateUser(userObject)
//             .unwrap() // .unwrap() מצפה שהפונקציה תחזיר Promise ונתניה לסטטוס של הצלחה/שגיאה
//             .catch(err => {
//                 console.error('Update failed', err); // לוגים של שגיאות עדכון
//             });
//     };

//     return (
//         <div className='single-user-container'>
//             <div className='single-user-info'>
//                 <div className='single-user-img-container'>
//                     <Typography variant="h5">{user.username}</Typography>
//                 </div>
//                 <div className='single-user-form-container'>
//                     <form onSubmit={handleSubmit} className='single-user-form'>
//                         <input name='_id' defaultValue={user._id} type='hidden' />
                        
//                         <TextField
//                             fullWidth
//                             label='שם יחודי'
//                             value={user.username}
//                             InputProps={{ readOnly: true }}
//                         />
//                         <TextField
//                             fullWidth
//                             label='שם פרטי'
//                             defaultValue={user.fullname}
//                             name='fullname'
//                         />
//                         <FormControl fullWidth>
//                             <InputLabel id='company-label'>חברה</InputLabel>
//                             <Select
//                                 id='company'
//                                 name='company'
//                                 labelId='company-label'
//                                 defaultValue={user.company?._id || ''}
//                                 required
//                             >
//                                 {companies?.data?.map(company => (
//                                     <MenuItem key={company._id} value={company._id}>
//                                         {company.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <FormControl fullWidth>
//                             <InputLabel id='roles-label'>הרשאה</InputLabel>
//                             <Select
//                                 id='roles'
//                                 name='roles'
//                                 labelId='roles-label'
//                                 defaultValue={user.roles || 'Student'}
//                             >
//                                 <MenuItem value='Student'>Student</MenuItem>
//                                 <MenuItem value='Teacher'>Teacher</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl fullWidth>
//                             <InputLabel id='active-label'>פעיל</InputLabel>
//                             <Select
//                                 id='active'
//                                 name='active'
//                                 labelId='active-label'
//                                 defaultValue={user.active ? true : false}
//                             >
//                                 <MenuItem value={true}>פעיל</MenuItem>
//                                 <MenuItem value={false}>לא פעיל</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <TextField
//                             fullWidth
//                             label='מייל'
//                             type='email'
//                             defaultValue={user.email}
//                             name='email'
//                         />
//                         <Button type='submit' variant='contained' color='primary'>
//                             עדכן
//                         </Button>
//                         {updateError && <Typography color='error'>שגיאה: {updateError.message}</Typography>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleUser;


import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
import { useUpdateUserMutation, useGetAllUsersQuery } from './userApiSlice';
import "./single-user.css";

const SingleUser = () => {
    const { userId } = useParams();
    const { error, data, isLoading, isError } = useGetAllUsersQuery();
    const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompaniesQuery();
    const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (updateSuccess) {
            navigate("/dash/users");
        }
    }, [updateSuccess, navigate]);

    if (isLoading || companiesLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
    if (companiesError) return <h1>Error loading companies: {JSON.stringify(companiesError)}</h1>;

    const user = data?.data?.find(user => user._id === userId);

    if (!user) return <h1>User not found</h1>;

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        updateUser(userObject);
    };

    return (
        <div className='single-user-container'>
            <div className='single-user-info'>
                <div className='single-user-img-container'>
                    {user.userName}
                </div>
                <div className='single-user-form-container'>
                    <form onSubmit={formSubmit} className='single-user-form'>
                        <input name='_id' defaultValue={user._id} type='hidden' />
                        <label>שם יחודי</label>
                        <input value={user.username} readOnly type='text' name='username' placeholder='הכנס שם יחודי' />
                        <label>שם פרטי</label>
                        <input defaultValue={user.fullname} type='text' name='fullname' placeholder='הכנס שם יחודי' />
                        <label>Company</label>
                        <select name='company' id='company' required>
                            {companies?.data ? companies.data.map(company => (
                                <option key={company._id} selected={company._id === user.company?._id} value={company._id}>
                                    {company.name}
                                </option>
                            )) : <option value="">No companies available</option>}
                        </select>
                        <label>Roles</label>
                        <select name='roles' id='roles'>
                            <option value="Student">הרשאה</option>
                            <option selected={user.roles === 'Teacher'} value="Teacher">Teacher</option>
                            <option selected={user.roles === 'Student'} value="Student">Student</option>
                        </select>
                        <label>פעיל</label>
                        <select name='active' id='active'>
                            <option selected={!user.active} value={false}>לא פעיל</option>
                            <option selected={user.active} value={true}>פעיל</option>
                        </select>
                        <label>מייל</label>
                        <input defaultValue={user.email} type='email' name='email' placeholder='מייל' />
                        <button>עדכן</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleUser;
