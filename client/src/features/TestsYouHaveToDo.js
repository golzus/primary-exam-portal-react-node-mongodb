// import React, { useEffect } from "react";
// import { useGetTestByClassAndUserMutation } from "./actions/listWord/view/ListWordApiSlice";
// import useAuth from "../hooks/useAuth";
// import { IconButton, Tooltip } from "@mui/material";
// import { Link } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility"; // Added icon for viewing
// const TestsYouHaveToDo = () => {
//   const [getTestByClassAndUser, { isError, data, error, isLoading }] =
//     useGetTestByClassAndUserMutation();
//   const { _id: user } = useAuth();
//   useEffect(() => {
//     getTestByClassAndUser({ user });
//   }, []);
//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError || !data) return <h1>error</h1>;
//   let count = 0;
//   return (
//     <div>
//       <h1>כמות הבחנים שעליך לעשות:{data.data.length}</h1>

//       <button>
//         <Link
//           to={`/dash/actions/test/66a592699ee0087032567d4a`}
//           className="users-list-button users-list-view"
//         >
//           {data.data[count++].date}
//         </Link>
//       </button>

//       {data.data.map((test) => {
//         <Link
//           to={`/dash/actions/test/${test._id}`}
//           className="users-list-button users-list-view"
//         >
//           <Tooltip title="View">
//             <IconButton aria-label="view">
//               <VisibilityIcon />
//               <h1>hh</h1>
//             </IconButton>
//           </Tooltip>
//         </Link>;
//       })}
//       {/* {data.data.map((test)=>({  
// test           }))} */}
//     </div>
//   );
// };

// export default TestsYouHaveToDo;


import React, { useEffect } from "react";
import { useGetTestByClassAndUserMutation } from "./actions/listWord/view/ListWordApiSlice";
import useAuth from "../hooks/useAuth";
import { IconButton, Tooltip, Typography, Button, CircularProgress, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon for viewing

const TestsYouHaveToDo = () => {
  const [getTestByClassAndUser, { isError, data, error, isLoading }] =
    useGetTestByClassAndUserMutation();
  const { _id: user } = useAuth();

  useEffect(() => {
    getTestByClassAndUser({ user });
  }, [getTestByClassAndUser, user]);

  if (isLoading) return <CircularProgress />; // Show a spinner while loading
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
