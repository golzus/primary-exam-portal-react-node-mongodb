

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateUserMutation, useGetAllUsersQuery, useGetUserByIdMutation } from './userApiSlice';
import { Card, CardContent, Typography, TextField, Button, Box, Grid, MenuItem, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./single-user.css";
import useAuth from '../../../hooks/useAuth';
import LOADING from '../../loadingAnimation/LoadingAnimation';

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

  if (isLoading) return<LOADING/>;
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
            <Grid item xs={12} sm={6}  style={{ display: notForATeacher || roles === 'Student' ? 'none' : 'block' }}>
  <TextField
    type={notForATeacher || roles === 'Student' ? 'hidden' : 'select'}
    fullWidth
    label={!(notForATeacher || roles === 'Student') ? "Active" : ""}
    name="active"
    defaultValue={user.active}
  >
    {!(notForATeacher || roles === 'Student') && (
      <>
        <MenuItem value="true">Active</MenuItem>
        <MenuItem value="false">Inactive</MenuItem>
      </>
    )}
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
              // disabled={isUpdating}
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
