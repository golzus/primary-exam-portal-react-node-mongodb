


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
// import { useUpdateUserMutation, useGetAllUsersQuery, useGetUserByIdMutation } from './userApiSlice';
// import { Card, CardContent, Typography, TextField, Button, Box, Grid, MenuItem } from '@mui/material';
// import "./single-user.css";
// import useAuth from '../../../hooks/useAuth';

// const SingleUser = ({notForATeacher}) => {
//   const [userId,setUserId]=useState("")
//   const { userId:id } = useParams();
//   const {roles,_id}=useAuth()
//   const [getUserById,{data,isLoading,isError,error,isSuccess}]=useGetUserByIdMutation()
//   //if user is student
//   useEffect(()=>{
//     if(roles==='Student')
//       setUserId(_id)
//   else if(notForATeacher)
//     setUserId(_id)
//   else 
//   setUserId(id)
// console.log(userId,"uu");
//       getUserById({_id:userId})
//   },[userId])
//   // const { error, data, isLoading, isError } = useGetAllUsersQuery();
//   // const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompaniesQuery();
//   const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (updateSuccess) {
//       if(roles==='Teacher'&&!notForATeacher)
//       navigate("/dash/users");
//     else
//     navigate("")
//     }
//   }, [updateSuccess, navigate]);

//   if (isLoading ) return <Typography variant="h4">Loading...</Typography>;
//   if (isError||!isSuccess) return <Typography variant="h4">Error: {JSON.stringify(error)}</Typography>;
//   // if (companiesError) return <Typography variant="h4">Error loading companies: {JSON.stringify(companiesError)}</Typography>;

//   // const user = data?.data?.find(user => user._id === userId);
//   const  user=data.data
// console.log(user.fullname,"us");
//   if (!user) return <Typography variant="h4">User not found</Typography>;
//   const formSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const userObject = Object.fromEntries(formData.entries());
//     updateUser(userObject);
//   };

//   return (
//     <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
//           Edit User
//         </Typography>
//         <form onSubmit={formSubmit}>
//           <input name='_id' defaultValue={user._id} type='hidden' />
//           <input name='roles' defaultValue={user.roles} type='hidden' />

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 defaultValue={user.username}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="fullname"
//                 defaultValue={user.fullname}
//               />
//             </Grid>
        
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Active"
//                 name="active"
//                 defaultValue={user.active}
//               >
//                 <MenuItem value="true">Active</MenuItem>
//                 <MenuItem value="false">Inactive</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 defaultValue={user.email}
//                 type="email"
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary">
//               Update
//             </Button>
//           </Box>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default SingleUser;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
import { useUpdateUserMutation, useGetAllUsersQuery, useGetUserByIdMutation } from './userApiSlice';
import { Card, CardContent, Typography, TextField, Button, Box, Grid, MenuItem, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./single-user.css";
import useAuth from '../../../hooks/useAuth';

const SingleUser = ({notForATeacher}) => {
  const [userId,setUserId] = useState("");
  const { userId: id } = useParams();
  const { roles, _id } = useAuth();
  const [getUserById, { data, isLoading, isError, error, isSuccess }] = useGetUserByIdMutation();
  const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Update");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (roles === 'Student' || notForATeacher) {
      setUserId(_id);
    } else {
      setUserId(id);
    }
    getUserById({ _id: userId });
  }, [userId]);

  useEffect(() => {
    if (updateSuccess) {
      setButtonText(<><CheckCircleIcon /> התעדכן</>);
      setTimeout(() => {
        setButtonText("Update");
        if (roles === 'Teacher' && !notForATeacher) {
          navigate("/dash/users");
        } else {
          navigate("");
        }
      }, 2000);
      setIsUpdating(false);
    }
  }, [updateSuccess, navigate]);

  const formSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setButtonText("מתעדכן...");
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    updateUser(userObject);
  };

  if (isLoading) return <Typography variant="h4">Loading...</Typography>;
  if (isError || !isSuccess) return <Typography variant="h4">Error: {JSON.stringify(error)}</Typography>;
  
  const user = data.data;
  if (!user) return <Typography variant="h4">User not found</Typography>;

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
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isUpdating}
            >
              {isUpdating ? <><CircularProgress size={24} sx={{ marginRight: 1 }} /> {buttonText}</> : buttonText}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default SingleUser;
