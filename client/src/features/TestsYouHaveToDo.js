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
    getTestByClassAndUser({ user });
  }, [getTestByClassAndUser, user]);

  if (isLoading) return <><CircularProgress />loading...</>; // Show a spinner while loading
  if (isError || !data) return <Typography color="error">Error: {error?.message || 'An error occurred'}</Typography>; // Improved error handling

  const tests = data.data;

  return (
    <Box
      sx={{
        width: '20VW',
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

      {tests.length ===0 ? (
        <Typography variant="body1" color="textSecondary">
          הידד, אין לך מבחנים!!
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          {tests.map((test) => (
            <Button
                key={test._id}
                component={Link}
                to={`/dash/test/${test._id}`}
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
