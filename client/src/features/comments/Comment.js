// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Box, Typography, List, ListItem, Divider, Paper, IconButton } from '@mui/material';
// import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
// import { useParams } from 'react-router-dom';
// import { useGetAllCommentsByTestIdQuery, useCreateMessageMutation, useMarkResponseAsReadMutation } from './commentsApiSlice';
// import useAuth from '../../hooks/useAuth';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../../theme';

// const Comments = ({ quizzes }) => {
//   const [comment, setComment] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [response, setResponse] = useState('');
//   const { test_id = null } = useParams();
//   const { userId } = useParams();
//   const { title } = useParams();
//   const { _id, roles } = useAuth();
//   const { data, refetch } = useGetAllCommentsByTestIdQuery({userId:_id, testId: test_id });
//   const [createMessage, { error }] = useCreateMessageMutation();
//   const [markResponseAsRead] = useMarkResponseAsReadMutation();

//   useEffect(() => {
//     if (data?.data[0]?.responses) {
//       setMessages([...data.data[0].responses].reverse()); // צור עותק והפוך את הסדר
//     }
//   }, [data]);

//   const timeAgo = (createdAt) => {
//     const now = new Date();
//     const messageDate = new Date(createdAt);
//     const diffInSeconds = Math.floor((now - messageDate) / 1000);
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSeconds < 60) return `${diffInSeconds} שניות`;
//     if (diffInMinutes < 60) return `${diffInMinutes} דקות`;
//     if (diffInHours < 24) return `${diffInHours} שעות`;
//     return `${diffInDays} ימים`;
//   };

//   const handleSendComment = async () => {
//     if (comment.trim()) {
//       try {
//         if(!test_id)
//         await createMessage({ userId: roles === 'Student' ? _id : userId, testId: null, text: comment, type: roles });
// else
//         await createMessage({ userId: roles === 'Student' ? _id : userId, testId: test_id, text: comment, type: roles });
//         setComment('');
//         refetch();
//       } catch (error) {
//         console.error('Error sending comment:', error);
//       }
//     }
//   };

//   const handleSendResponse = async () => {
//     if (response.trim()) {
//       try {
//         await createMessage({ userId, testId: test_id, text: response, type: 'Teacher' });
//         setResponse('');
//         refetch();
//       } catch (error) {
//         console.error('Error sending response:', error);
//       }
//     }
//   };

//   const toggleMessageReadStatus = async (messageId, responseIndex) => {
//     try {
//       await markResponseAsRead({ messageId: data.data[0]._id, responseIndex });
//       refetch();
//     } catch (error) {
//       console.error('Error marking response as read:', error);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Paper elevation={3} sx={{ padding: '20px',flexDirection:'column', margin: '20px', borderRadius:'10px',justifyContent:'center' ,alignItems:'center', overflowY: 'auto' }}>
//         <Typography variant="h4" sx={{ marginBottom: '20px',alignSelf:'center' }}>
//           Teacher-Student Chat
//         </Typography>
//         {title && (
//           <Typography variant="h6" sx={{ marginBottom: '20px',alignSelf:'center' }}>
//             {title}
//           </Typography>
//         )}
//         <List sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
//           {messages.length > 0 ? (
//   messages.map((msg, index) => (
//                   <ListItem key={msg._id} sx={{ justifyContent: msg.type === 'Student' ? 'flex-start' : 'flex-end', width: '100%' }}>
//                 <Box 
//                   sx={{ 
//                     padding: '10px', 
//                     backgroundColor: msg.type === 'Student' ? theme.palette.secondary.main : theme.palette.primary.light, 
//                     borderRadius: '5px', 
//                     marginBottom: '10px', 
//                     width: '100%', 
//                     position: 'relative' 
//                   }}
//                 >
//                   {msg.isRead && (
//                     <Box 
//                       sx={{ 
//                         position: 'absolute', 
//                         top: 0, 
//                         left: 0, 
//                         right: 0, 
//                         bottom: 0, 
//                         border: '2px solid red', 
//                         borderRadius: '5px', 
//                         pointerEvents: 'none' 
//                       }} 
//                     />
//                   )}
//                   <Typography variant="body1" sx={{ color: msg.type === 'Student' ? '#ffffff' : '#9B153B', textDecoration: msg.isRead ? 'line-through' : 'none' }}>
//                     {msg.type}: {msg.text}
//                   </Typography>
//                   <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                     {timeAgo(msg.createdAt)} לפני
//                   </Typography>
//                 </Box>
//                 <IconButton onClick={() => toggleMessageReadStatus(msg._id,index)}>
//                   {msg.isRead ? <AiFillCheckCircle size={24} color="green" /> : <AiOutlineCheckCircle size={24} color="gray" />}
//                 </IconButton>
//               </ListItem>
//             ))
//           ) : (
//             <Typography variant="body2" sx={{ textAlign: 'center' }}>
// עדיין אין שיחות            </Typography>
//           )}
//           <Divider />
//         </List>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//           <TextField 
//             label={roles === 'Student' ? 'Write a comment' : 'Write a response'}
//             variant="outlined"
//             value={roles === 'Student' ? comment : response}
//             onChange={(e) => roles === 'Student' ? setComment(e.target.value) : setResponse(e.target.value)}
//             fullWidth
//             sx={{ marginRight: '10px' }}
//           />
//           <Button variant="contained" color="primary" onClick={roles === 'Student' ? handleSendComment : handleSendResponse}>
//             {roles === 'Student' ? 'Send' : 'Respond'}
//           </Button>
//         </Box>
//       </Paper>
//     </ThemeProvider>
//   );
// };

// export default Comments;

import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, Divider, Paper, IconButton } from '@mui/material';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useGetAllCommentsByTestIdQuery, useCreateMessageMutation, useMarkResponseAsReadMutation } from './commentsApiSlice'; 
import useAuth from '../../hooks/useAuth';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const Comments = ({ quizzes }) => {
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const { test_id = null } = useParams();
  const { userId } = useParams();
  const { title } = useParams();
  const { _id, roles } = useAuth();
  const { data, refetch } = useGetAllCommentsByTestIdQuery({userId:_id, testId: test_id });
  const [createMessage, { error }] = useCreateMessageMutation();
  const [markResponseAsRead] = useMarkResponseAsReadMutation();

  useEffect(() => {
    if (data?.data[0]?.responses) {
      setMessages([...data.data[0].responses].reverse()); // צור עותק והפוך את הסדר
    }
  }, [data]);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const messageDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - messageDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return `${diffInSeconds} שניות`;
    if (diffInMinutes < 60) return `${diffInMinutes} דקות`;
    if (diffInHours < 24) return `${diffInHours} שעות`;
    return `${diffInDays} ימים`;
  };

  const handleSendComment = async () => {
    if (comment.trim()) {
      try {
        if (!test_id) {
          await createMessage({ userId: roles === 'Student' ? _id : userId, testId: null, text: comment, type: roles });
        } else {
          await createMessage({ userId: roles === 'Student' ? _id : userId, testId: test_id, text: comment, type: roles });
        }
        setComment('');
        refetch();
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };

  const handleSendResponse = async () => {
    if (response.trim()) {
      try {
        await createMessage({ userId, testId: test_id, text: response, type: 'Teacher' });
        setResponse('');
        refetch();
      } catch (error) {
        console.error('Error sending response:', error);
      }
    }
  };

  const toggleMessageReadStatus = async (messageId, responseIndex) => {
    try {
      await markResponseAsRead({ messageId: data.data[0]._id, responseIndex });
      refetch();
    } catch (error) {
      console.error('Error marking response as read:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ padding: '20px', flexDirection: 'column', margin: '20px', borderRadius: '10px', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', alignSelf: 'center' }}>
          Teacher-Student Chat
        </Typography>
        {title && (
          <Typography variant="h6" sx={{ marginBottom: '20px', alignSelf: 'center' }}>
            {title}
          </Typography>
        )}
        <List sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <ListItem key={msg._id} sx={{ justifyContent: msg.type === 'Student' ? 'flex-start' : 'flex-end', width: '100%' }}>
                <Box 
                  sx={{ 
                    padding: '10px', 
                    backgroundColor: msg.type === 'Student' ? theme.palette.secondary.main : theme.palette.primary.light, 
                    borderRadius: '5px', 
                    marginBottom: '10px', 
                    width: '100%', 
                    position: 'relative',
                    fontWeight: msg.isRead ? 'normal' : 'bold', // הודעות שלא נקראו יהיו מודגשות
                    border: msg.isRead ? 'none' : '2px solid #ff0000', // הוספת מסגרת אדומה להודעות שלא נקראו
                    boxShadow: msg.isRead ? 'none' : '0px 0px 10px rgba(0, 0, 0, 0.2)', // צל להודעות שלא נקראו
                    opacity: msg.isRead ? 0.7 : 1 // שקיפות להודעות שנקראו
                  }}
                >
                  <Typography variant="body1" sx={{ color: msg.type === 'Student' ? '#ffffff' : '#9B153B',  fontWeight: msg.read ? 'bold' : 'normal'}}>
                    {msg.type}: {msg.text} 
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {timeAgo(msg.createdAt)} לפני
                  </Typography>
                </Box>
                <IconButton onClick={() => toggleMessageReadStatus(msg._id, (messages.length-1- index))}>
                  {msg.isRead ? <AiFillCheckCircle size={24} color="green" /> : <AiOutlineCheckCircle size={24} color="gray" />}
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              עדיין אין שיחות
            </Typography>
          )}
          <Divider />
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <TextField 
            label={roles === 'Student' ? 'Write a comment' : 'Write a response'}
            variant="outlined"
            value={roles === 'Student' ? comment : response}
            onChange={(e) => roles === 'Student' ? setComment(e.target.value) : setResponse(e.target.value)}
            fullWidth
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={roles === 'Student' ? handleSendComment : handleSendResponse}>
            {roles === 'Student' ? 'Send' : 'Respond'}
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Comments;

