// import React, { useEffect } from 'react'
// import { useGetAllListWordsByClassAndByActiveMutation } from './listWord/view/ListWordApiSlice'
// import useSchoolAndClass from '../../hooks/useSchoolAndClass'
// import CurrentSchoolAndClass from '../companies/CurrentSchoolAndClass/CurrentSchoolAndClass'
// import { Link } from 'react-router-dom'

// const ListWordToDo = () => {
//     const [getAllListWordsByClassAndByActive,{data,error,isLoading}]=useGetAllListWordsByClassAndByActiveMutation()
//     const {chosenClass}=useSchoolAndClass()
//     useEffect(()=>{
//         if(chosenClass)
//         getAllListWordsByClassAndByActive({active:false,chosenClass})
//     },[chosenClass])
//     if(!chosenClass)return <CurrentSchoolAndClass/>

//     if(error)return <h1>error</h1>
//     if(isLoading||!data)return <h1>Loading...</h1>
//     console.log(data.data[0]._id,"data");
//   return (<div>
//     <h1>כמות הבחנים שעליך להפוך ל-ACTIVE:{data.data.length}</h1>

//     <button>
//       <Link
//         to={`/dash/actions/${data.data[0]._id}`}
//         className="users-list-button users-list-view"
//       >
//         {data.data[0].title}
//       </Link>
//     </button>
//     </div>
//   )
// }

// export default ListWordToDo

import React, { useEffect, useState } from "react";
import { useGetAllListWordsByClassAndByActiveMutation } from "./listWord/view/ListWordApiSlice";
import useSchoolAndClass from "../../hooks/useSchoolAndClass";
import CurrentSchoolAndClass from "../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

const ListWordToDo = ({ onNumChange }) => {
  const [getAllListWordsByClassAndByActive, { data, error, isLoading }] =
    useGetAllListWordsByClassAndByActiveMutation();
  const { chosenClass } = useSchoolAndClass();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (chosenClass) {
      getAllListWordsByClassAndByActive({ active: false, chosenClass });
    }
  }, [chosenClass]);

  useEffect(() => {
    if (data) {
      const count = data.data.length;
      setItemCount(count);
      if (onNumChange) {
        onNumChange(count);
      }
    }
  }, [data]);

  if (!chosenClass)
    return <Typography variant="h5">עליך לבחור בית ספר וכיתה.</Typography>;

  if (isLoading) return <CircularProgress />; // הצגת לולאת טעינה
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>; // טיפול בשגיאות

  return (
    <Box
      sx={{
        width: "20VW",
        p: 2,
        m: "auto",
        mt: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {itemCount === 0 ? (
        <Typography variant="h5">הידד עשית את כל המבחנים!</Typography>
      ) : (
        <>
          <Typography variant="h5">
            כמות הבחנים שעליך לעדכן: {itemCount}
          </Typography>
          <Stack spacing={2} sx={{ width: "100%" }}>
            {data.data.map((item) => (
              <Button
                key={item._id}
                component={Link}
                to={`/dash/actions/${item._id}`}
                variant="contained"
                color="primary"
                sx={{ width: "100%", textAlign: "center", overflow: "hidden" }}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
  return 2;
};

export default ListWordToDo;
