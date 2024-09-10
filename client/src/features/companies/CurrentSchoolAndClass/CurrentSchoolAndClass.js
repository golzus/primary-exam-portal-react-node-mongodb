
import React, { useEffect, useState } from 'react';
import { useGetAllSchoolsByTeacherMutation, useGetAllClassesBySchoolMutation } from '../CompaniesApiSlice';
import { chooseSchool, chooseClass, nameClass, nameSchool } from './currentSchoolAndClassSlice';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Typography, Box, CircularProgress, Alert } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import theme from '../../../theme'
import LOADING from '../../loadingAnimation/LoadingAnimation';

const CurrentSchoolAndClass = () => {
  const [getAllSchoolsByTeacher, { data: Schools, isError, error, isLoading }] = useGetAllSchoolsByTeacherMutation();
  const [getAllClassesBySchool, { data: classes, isError: classesIsError, isLoading: classesIsLoading, error: classesError }] = useGetAllClassesBySchoolMutation();
  const dispatch = useDispatch();
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const { _id } = useAuth();

  useEffect(() => {
    getAllSchoolsByTeacher({ teacher: _id });
  }, [_id, getAllSchoolsByTeacher]);

  useEffect(() => {
    if (selectedSchoolId) {
      getAllClassesBySchool({ school: selectedSchoolId });
    }
  }, [selectedSchoolId, getAllClassesBySchool]);

  const handleChangeSchool = (event) => {
    const selectedSchoolId = event.target.value;
    const selectedSchool = Schools.data.find(school => school._id === selectedSchoolId);
    dispatch(chooseSchool(selectedSchoolId));
    dispatch(nameSchool(selectedSchool.name));
    setSelectedSchoolId(selectedSchoolId);
    console.log('Selected School:', selectedSchool.name);
  };

  const handleChangeClass = (event) => {
    const selectedClassId = event.target.value;
    const selectedClass = classes.data.find(classItem => classItem._id === selectedClassId);
    dispatch(chooseClass(selectedClassId));
    dispatch(nameClass(selectedClass.name));
    setSelectedClassId(selectedClassId);
    console.log('Selected Class:', selectedClass.name);
  };

  if (isLoading || classesIsLoading) return<LOADING/>
  if (isError || classesIsError) return <Alert severity="error">{JSON.stringify(error || classesError)}</Alert>;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // backgroundColor: '#f3f3e9', // Use the beige color from your theme
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            בחירת בית ספר וכיתה
          </Typography>
          <Box component="form" sx={{ width: '100%' }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="school-label">בית ספר</InputLabel>
              <Select
                labelId="school-label"
                id="school"
                value={selectedSchoolId}
                onChange={handleChangeSchool}
                label="בית ספר"
                required
              >
                <MenuItem value="">
                  <em>בחר בית ספר</em>
                </MenuItem>
                {Schools?.data?.map((school) => (
                  <MenuItem key={school._id} value={school._id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="class-label">כיתה</InputLabel>
              <Select
                labelId="class-label"
                id="class"
                value={selectedClassId}
                onChange={handleChangeClass}
                label="כיתה"
                required
              >
                <MenuItem value="">
                  <em>בחר כיתה</em>
                </MenuItem>
                {classes?.data
                  .filter((classItem) => classItem.school === selectedSchoolId)
                  .map((classItem) => (
                    <MenuItem key={classItem._id} value={classItem._id}>
                      {classItem.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CurrentSchoolAndClass;









