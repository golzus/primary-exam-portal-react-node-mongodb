import React, { useEffect } from "react";
import { useGetTestByClassAndUserMutation } from "./actions/listWord/view/ListWordApiSlice";
import useAuth from "../hooks/useAuth";
import { Typography, Button, CircularProgress, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import LOADING from "./loadingAnimation/LoadingAnimation";

const TestsYouHaveToDo = () => {
  const [getTestByClassAndUser, { isError, data, error, isLoading }] =
    useGetTestByClassAndUserMutation();
  const { _id: user } = useAuth();

  useEffect(() => {
    if (user) {
      getTestByClassAndUser({ user });
    }
  }, [getTestByClassAndUser, user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          width: '20vw'
        }}
      >
      <LOADING/>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          width: '20vw'
        }}
      >
        <Typography color="error" variant="h6">
          Error: {error?.message || 'An error occurred'}
        </Typography>
      </Box>
    );
  }

  const tests = data.data;

  return (
    <Box
      sx={{
        width: '20vw',
        p: 2,
        m: 'auto',
        mt: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        כמות הבחנים שעליך לעשות: {tests.length}
      </Typography>

    
    
        <Stack spacing={2} sx={{ width: '100%' }}>
   
{tests.map((test) => (
  <Button
    key={test._id}
    component={test.active ? Link : 'div'}
    to={test.active ? `/dash/test/false/${test._id}` : undefined}
   
    variant="contained"
    color="primary"
    sx={{ width: '100%', textAlign: 'center', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{test.title}</Typography>
      {!test.active && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
          <LockIcon sx={{ color: '#ff5252' }} />
          <Typography variant="caption" sx={{ marginLeft: 0.5 }}>
            - עדיין לא זמין
          </Typography>
        </Box>
      )}
    </Stack>
  </Button>
))}

        </Stack>
    
    </Box>
  );
};

export default TestsYouHaveToDo;
