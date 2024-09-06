import React, { useEffect, useState } from "react";
import { useGetAllListWordsByClassAndByActiveMutation } from "./listWord/view/ListWordApiSlice";
import useSchoolAndClass from "../../hooks/useSchoolAndClass";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

const ListWordToDo = ({ onNumChange }) => {
  const [getAllListWordsByClassAndByActive, { data, error, isLoading }] =
    useGetAllListWordsByClassAndByActiveMutation();
  const { chosenClass } = useSchoolAndClass();
  const [itemCount, setItemCount] = useState(0);
  const { roles } = useAuth();

  useEffect(() => {
    if (chosenClass) {
      getAllListWordsByClassAndByActive({ active: false, chosenClass });
    }
  }, [chosenClass, getAllListWordsByClassAndByActive, chosenClass]);

  useEffect(() => {
    if (data) {
      const count = data.data.length;
      setItemCount(count);
      if (onNumChange) {
        onNumChange(count);
      }
    }
  }, [data, onNumChange]);

  if (!chosenClass && roles === 'Teacher') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh',width:'20vw' }}>
        <Typography variant="h5">אין התראות</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh',width:'20vw' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>טוען נתונים...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',   height: '20vh',
      width: '20vw' }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "20vw",
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
        <Typography variant="h5">הידד! עדכנת את כל המבחנים!</Typography>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            כמות הבחנים שעליך לעדכן: {itemCount}
          </Typography>
          <Stack spacing={2} sx={{ width: "100%" }}>
            {data.data.map((item) => (
              <Button
                key={item._id}
                component={Link}
                to={`/dash/${item._id}`}
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
};

export default ListWordToDo;
