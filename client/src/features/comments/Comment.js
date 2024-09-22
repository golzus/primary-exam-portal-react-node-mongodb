import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, Divider, Paper, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useGetAllCommentsByTestIdQuery, useCreateMessageMutation, useMarkResponseAsReadMutation } from './commentsApiSlice';
import useAuth from '../../hooks/useAuth';

const Comments = ({ quizzes }) => {
  const [comment, setComment] = useState('');
  const [messages,setMessages]=useState()
  const [response, setResponse] = useState('');
  const { test_id } = useParams(); // שימוש ב-testId מה-URL
  const { title } = useParams();
  const { data, refetch } = useGetAllCommentsByTestIdQuery({ testId: test_id });
  const [createMessage,{error}] = useCreateMessageMutation();
  const [markResponseAsRead] = useMarkResponseAsReadMutation();
  const {_id,roles}=useAuth()
  const toggleMessageReadStatus = async (messageId, responseIndex) => {
    try {
      await markResponseAsRead({ messageId, responseIndex });
      refetch(); // רענון הנתונים לאחר שינוי הסטטוס
    } catch (error) {
      console.error('Error marking response as read:', error);
    }
  };
  useEffect(()=>{
    if(data){
     setMessages(data.data[0].responses)
    }
    // messages 
  },[data])

  const handleSendComment = async () => {
    if (comment.trim()) {
      try {
        await createMessage({ userId:_id ,testId: test_id, text: comment, type: 'Student' });
        setComment('');
        refetch(); // רענון הנתונים לאחר שליחת ההודעה
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };
if(error)console.log(error,"messageResponse.error");
  const handleSendResponse = async () => {
    if (response.trim()) {
      try {
        await createMessage({ testId: test_id, text: response, type: 'Teacher' });
        setResponse('');
        refetch(); // רענון הנתונים לאחר שליחת התגובה
      } catch (error) {
        console.error('Error sending response:', error);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        height: '75vh',
        width: '65vw',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main', marginBottom: '20px', alignSelf: 'center' }}>
          Teacher-Student Chat
        </Typography>
        {title && (
          <Typography variant="h6" sx={{ color: 'primary.main', marginBottom: '20px', alignSelf: 'center' }}>
            {title}
          </Typography>
        )}
   <List sx={{ overflowY: 'auto', maxHeight: '50vh' }}>
  {Array.isArray(messages) && messages.length > 0 ? (
    messages.map((msg, index) => (
      <ListItem key={msg._id} sx={{
        textAlign: msg.type === 'Student' ? 'left' : 'right',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: msg.type === 'Student' ? theme.palette.secondary.main : theme.palette.primary.light,
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ color: msg.type === 'Student' ? '#ffffff' : '#9B153B' }}>
            {msg.type === 'Student' ? 'Student' : 'Teacher'}: {msg.text}
          </Typography>
        </Box>
        <IconButton onClick={() => toggleMessageReadStatus(msg._id, index)} sx={{ marginLeft: '10px' }}>
          {msg.isRead ? <AiFillCheckCircle size={24} color="green" /> : <AiOutlineCheckCircle size={24} color="gray" />}
        </IconButton>
      </ListItem>
    ))
  ) : (
    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
      No messages yet.
    </Typography>
  )}
  <Divider />
</List>


  {   roles==='Student'&&   <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <TextField
            label="Write a comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSendComment}>Send</Button>
        </Box>}

     {   roles==='Teacher'&&   <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <TextField
            label="Write a response"
            variant="outlined"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            fullWidth
            sx={{ marginRight: '10px' }}
          />
     <Button variant="contained" color="primary" onClick={handleSendResponse}>Respond</Button>
       </Box>}
      </Paper>
    </ThemeProvider>
  );
};

export default Comments;
