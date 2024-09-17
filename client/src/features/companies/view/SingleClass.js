import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeleteClassMutation, useGetAllClassesBySchoolMutation } from '../CompaniesApiSlice';
import LOADING from '../../loadingAnimation/LoadingAnimation';
import { Card, CardContent, Typography, Button, IconButton, CardHeader, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import { useTheme } from '@mui/material/styles';

const SingleClass = () => {
  const { school } = useParams();
  const theme = useTheme(); // Get the current theme

  const [getAllClassesBySchool, { data: classes, isError: classesisError, isLoading: classesIsLoading, error: classesError }] = useGetAllClassesBySchoolMutation();
  const [deleteClass, { isSuccess }] = useDeleteClassMutation();

  useEffect(() => {
    getAllClassesBySchool({ school });
  }, [school]);

  const deleteClick = (class1) => {
    if (window.confirm("בטוח שברצונך למחוק את הכיתה ?")) {
      deleteClass({ _id: class1._id });
    }
  };

  if (classesIsLoading) return <LOADING />;
  if (!classes?.data) return <Typography variant="h6" color="error">אין כיתות להצגה</Typography>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {classes?.data.map((class1) => (
        class1.school === school && (
          <Card key={class1._id} style={{ maxWidth: '300px', backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[3], textAlign: 'center' }}>
            <CardContent>
              <Avatar style={{ backgroundColor: theme.palette.primary.main, margin: '0 auto', width: '60px', height: '60px' }}>
                <SchoolIcon style={{ color: '#fff', fontSize: '30px' }} />
              </Avatar>
              <Typography variant="h6" color="primary" gutterBottom style={{ marginTop: '10px' }}>
                {class1.name}
              </Typography>
              <Link to={`/dash/users`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                  לצפייה בכל בנות הכיתה
                </Button>
              </Link>
            </CardContent>
            <CardContent style={{ display: 'flex',alignItems:'center', justifyContent: 'center', padding: '16px' }}>
              <IconButton
                onClick={() => deleteClick(class1)}
                aria-label="delete"
                color="secondary"
                style={{ marginTop: '10px' }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        )
      ))}
    </div>
  );
};

export default SingleClass;
