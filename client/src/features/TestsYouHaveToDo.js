import React, { useEffect } from "react";
import { useGetTestByClassAndUserMutation } from "./actions/listWord/view/ListWordApiSlice";
import useAuth from "../hooks/useAuth";
import { Typography, Button, CircularProgress, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

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
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          טוען נתונים...
        </Typography>
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
          height: '100vh',
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

      {tests.length === 0 ? (
        <Typography variant="body1">
          הידד, אין לך מבחנים!!
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          {tests.map((test) => (
            <Button
              key={test._id}
              component={Link}
              to={`/dash/test/true/${test._id}`}
              variant="contained"
              color="primary"
              sx={{ width: '100%', textAlign: 'center', overflow: 'hidden' }}
            >
              {test.title}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TestsYouHaveToDo;
