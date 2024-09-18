import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeleteClassMutation, useGetAllClassesBySchoolMutation } from '../CompaniesApiSlice';
import LOADING from '../../loadingAnimation/LoadingAnimation';
import { Card, CardContent, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';

const SingleClass = () => {
  const { school } = useParams();
  const theme = useTheme(); // Get the current theme

  const [getAllClassesBySchool, { data: classes,  isLoading: classesIsLoading }] = useGetAllClassesBySchoolMutation();
  const [deleteClass, { isSuccess }] = useDeleteClassMutation();

  useEffect(() => {
    getAllClassesBySchool({ school }
    
    );
    
  }, [school]);
useEffect(()=>{
  if(classes)
    console.log(classes,"classes")
},[classes])
  const deleteClick = (class1) => {
    if (window.confirm("בטוח שברצונך למחוק את הכיתה ?")) {
      deleteClass({ _id: class1._id });
    }
  };

  if (classesIsLoading) return <LOADING />;
  if (classes?.data.length===0)  
    return (
      <Box
        sx={{
          maxWidth: '300px',
          margin: 'auto',
          padding: '16px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          borderRadius: '8px',
          textAlign: 'center',
          display: 'flex',            // שימוש ב-flexbox
          justifyContent: 'center',   // ממורכז בציר X
          alignItems: 'center',       // ממורכז בציר Y
          height: '65vh',  
          width:'40vw'            // גובה כדי למרכז את התוכן בציר Y
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          אין כיתות להצגה
        </Typography>
        
      </Box>
    );
    
   
    
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {classes?.data.map((class1) => (
        class1.school === school && (
          <Card key={class1._id} style={{ maxWidth: '300px', backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[3], textAlign: 'center' }}>
            <CardContent>
              <Avatar style={{ backgroundColor: theme.palette.primary.main, margin: '0 auto', width: '60px', height: '60px' }}>
                <ListAltIcon style={{ color: '#fff', fontSize: '30px' }} />
              </Avatar>
              <Typography variant="h6" color="primary" gutterBottom style={{ marginTop: '10px' }}>
                {class1.name}
              </Typography>
              <Link to={`/dash/users/${class1._id}`} style={{ textDecoration: 'none' }}>
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
