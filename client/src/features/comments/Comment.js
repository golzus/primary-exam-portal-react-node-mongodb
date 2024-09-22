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
  const { test_id } = useParams();
  const { userId } = useParams();
  const { title } = useParams();
  const { data, refetch } = useGetAllCommentsByTestIdQuery({ testId: test_id });
  const [createMessage, { error }] = useCreateMessageMutation();
  const [markResponseAsRead] = useMarkResponseAsReadMutation();
  const { _id, roles } = useAuth();

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
        await createMessage({ userId: roles === 'Student' ? _id : userId, testId: test_id, text: comment, type: roles });
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
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px', borderRadius: '10px', overflowY: 'auto' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Teacher-Student Chat
        </Typography>
        {title && (
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
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
                    position: 'relative' 
                  }}
                >
                  {msg.isRead && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        border: '2px solid red', 
                        borderRadius: '5px', 
                        pointerEvents: 'none' 
                      }} 
                    />
                  )}
                  <Typography variant="body1" sx={{ color: msg.type === 'Student' ? '#ffffff' : '#9B153B', textDecoration: msg.isRead ? 'line-through' : 'none' }}>
                    {msg.type}: {msg.text}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {timeAgo(msg.createdAt)} לפני
                  </Typography>
                </Box>
                <IconButton onClick={() => toggleMessageReadStatus(msg._id,index)}>
                  {msg.isRead ? <AiFillCheckCircle size={24} color="green" /> : <AiOutlineCheckCircle size={24} color="gray" />}
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              No messages yet.
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



// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Box, Typography, List, ListItem, Divider, Paper, IconButton } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../../theme';
// import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
// import { useParams } from 'react-router-dom';
// import { useGetAllCommentsByTestIdQuery, useCreateMessageMutation, useMarkResponseAsReadMutation } from './commentsApiSlice';
// import useAuth from '../../hooks/useAuth';
// {/* <Route path="wordsList/marks/:wordlist_id/comments/:title/:test_id/:userId" element={<Comments />} /> */}

// const Comments = ({ quizzes }) => {
//   const [comment, setComment] = useState('');
//   const [messages,setMessages]=useState()
//   const [response, setResponse] = useState('');
//   const { test_id } = useParams(); // שימוש ב-testId מה-URL
//   const {userId}=useParams()
//   const { title } = useParams();
//   const { data, refetch } = useGetAllCommentsByTestIdQuery({ testId: test_id });
//   const [createMessage,{error}] = useCreateMessageMutation();
//   const [markResponseAsRead] = useMarkResponseAsReadMutation();
//   const {_id,roles}=useAuth()
//   const toggleMessageReadStatus = async (messageId, responseIndex) => {
//     try {
//       await markResponseAsRead({ messageId:data.data[0]._id, responseIndex });
//       refetch(); // רענון הנתונים לאחר שינוי הסטטוס
//     } catch (error) {
//       console.error('Error marking response as read:', error);
//     }
//   };
//   useEffect(()=>{
//     console.log(data,"data");

//     if(data?.data[0]?.responses){
//       console.log(data,"data");
//      setMessages(data?.data[0].responses)
//     }
//     // messages 
//   },[data])

//   const handleSendComment = async () => {
//     if (comment.trim()) {
//       try {
// {     roles==='Student'&&   await createMessage({ userId:_id ,testId: test_id, text: comment, type: 'Student' });
// }  
// {     roles==='Teacher'&&   await createMessage({ userId:userId ,testId: test_id, text: comment, type: 'Teacher' });
// }
// setComment('');
//         refetch(); // רענון הנתונים לאחר שליחת ההודעה
//       } catch (error) {
//         console.error('Error sending comment:', error);
//       }
//     }
//   };
// if(error)console.log(error,"messageResponse.error");
//   const handleSendResponse = async () => {
//     if (response.trim()) {
//       try {
//         await createMessage({ userId,testId: test_id, text: response, type: 'Teacher' });
//         setResponse('');
//         refetch(); // רענון הנתונים לאחר שליחת התגובה
//       } catch (error) {
//         console.error('Error sending response:', error);
//       }
//     }
//   };
//   return (
//     <ThemeProvider theme={theme}>
//       <Paper elevation={3} sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         padding: '20px',
//         margin: '20px',
//         borderRadius: '10px',
//         backgroundColor: '#ffffff',
//         height: '75vh',
//         width: '65vw',
//         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         overflowY: 'auto',



//         maxWidth: '65vw',
//         height: '80vh', 
//         margin: 'auto',
//         backgroundColor: '#ffffff',  // צבע רקע לבן
//         padding: '20px',
//         borderRadius: '16px',
//         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה עדינה
//         overflowY: 'auto',
//       }}>
//         <Typography variant="h4" sx={{ color: 'primary.main', marginBottom: '20px', alignSelf: 'center' }}>
//           Teacher-Student Chat
//         </Typography>
//         {title && (
//           <Typography variant="h6" sx={{ color: 'primary.main', marginBottom: '20px', alignSelf: 'center' }}>
//             {title}
//           </Typography>
//         )}
//   <List sx={{ overflowY: 'auto', maxHeight: '50vh' }}>
//   {Array.isArray(messages) && messages.length > 0 ? (
//     messages.map((msg, index) => (
//       <ListItem
//         key={msg._id}
//         sx={{
//           textAlign: msg.type === 'Student' ? 'left' : 'right',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: msg.type === 'Student' ? theme.palette.secondary.main : theme.palette.primary.light,
//           borderRadius: '5px',
//           padding: '10px',
//           marginBottom: '10px',
//         }}
//       >
//         <Box sx={{ flex: 1 }}>
//           <Typography
//             variant="body1"
//             sx={{
//               color: msg.type === 'Student' ? '#ffffff' : '#9B153B',
//               textDecoration: msg.isRead ? 'line-through' : 'none', // קו חוצה על טקסט אם ההודעה נקראה
//             }}
//           >
//             {msg.type === 'Student' ? 'Student' : 'Teacher'}: {msg.text}
//           </Typography>
//         </Box>
//         <IconButton onClick={() => toggleMessageReadStatus(msg._id, index)} sx={{ marginLeft: '10px' }}>
//           {msg.isRead ? (
//             <AiFillCheckCircle size={24} color="green" /> // אם ההודעה נקראה, הצג את האייקון של הווי הירוק
//           ) : (
//             <AiOutlineCheckCircle size={24} color="gray" /> // אם לא נקראה, הצג את האייקון האפור
//           )}
//         </IconButton>
//       </ListItem>
//     ))
//   ) : (
//     <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
//       No messages yet.
//     </Typography>
//   )}
//   <Divider />
// </List>



//   {   roles==='Student'&&   <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//           <TextField
//             label="Write a comment"
//             variant="outlined"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             fullWidth
//             sx={{ marginRight: '10px' }}
//           />
//           <Button variant="contained" color="primary" onClick={handleSendComment}>Send</Button>
//         </Box>}

//      {   roles==='Teacher'&&   <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//           <TextField
//             label="Write a response"
//             variant="outlined"
//             value={response}
//             onChange={(e) => setResponse(e.target.value)}
//             fullWidth
//             sx={{ marginRight: '10px' }}
//           />
//      <Button variant="contained" color="primary" onClick={handleSendResponse}>Respond</Button>
//        </Box>}
//       </Paper>
//     </ThemeProvider>
//   );
// };

// export default Comments;
