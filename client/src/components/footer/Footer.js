// import React from 'react';
// import { Box, Typography, Link } from '@mui/material';
// import { useTheme } from '@mui/material/styles'; // שימוש בנושא הקיים

// const Footer = () => {
//   const theme = useTheme(); // גישה לנושא הקיים

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '20px',
//         backgroundColor: '#ffffff', // צבע הרקע לבן
//         color: theme.palette.primary.main, // צבע הטקסט לפי הנושא
//         borderTop: `2px solid ${theme.palette.primary.main}`, // גבול עליון בצבע הנושא
//         position: 'fixed',
//         bottom: 0,
//         width: '90%',
//         height: '10vh',
//         zIndex: 1000,
//         boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // צל עדין לחלק התחתון
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'spaceBetween',
//           gap: '30px', // רווח אחיד בין האלמנטים
//           marginBottom: '10px',
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 'bold',
//             textAlign: 'center',
//             color: theme.palette.primary.main,
//           }}
//         >
//           Goldi Zusman
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             color: theme.palette.primary.main,
//           }}
//         >
//           Programmer & Software Engineer
//         </Typography>
//         <Link
//           href="mailto:golda.z2030@gmail.com?subject=Contact from Website&body=Hello Goldi,"
//           sx={{
//             color: theme.palette.primary.main,
//             textDecoration: 'none',
//             fontWeight: 'bold',
//             '&:hover': {
//               textDecoration: 'underline',
//             },
//           }}
//         >
//           golda.z2030@gmail.com
//         </Link>
//         <Typography
//           variant="body1"
//           sx={{
//             color: theme.palette.primary.main,
//           }}
//         >
//           📞 +123 456 7890
//         </Typography>
//       </Box>
//       {/* <Typography
//         variant="body2"
//         sx={{
//           color: theme.palette.primary.main,
//           textAlign: 'center',
//         }}
//       >
//         @ All Rights Reserved.
//       </Typography> */}
//     </Box>
//   );
// }

// export default Footer;


import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // שימוש בנושא הקיים

const Footer = () => {
  const theme = useTheme(); // גישה לנושא הקיים

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        // backgroundColor: '#ffffff', // צבע הרקע לבן
        color: theme.palette.primary.main, // צבע הטקסט לפי הנושא
        borderTop: `2px solid ${theme.palette.primary.main}`, // גבול עליון בצבע הנושא
        position: 'fixed',
        bottom: 0,
    //  width: '85%',
        height: '5vh',
        zIndex: 1000,
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // צל עדין לחלק התחתון
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px', // רווח אחיד בין האלמנטים
          marginBottom: '10px',
        }}
      >
     
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          להזמנות:
        </Typography>
        <Link
          href="mailto:golda.z2030@gmail.com?subject=Contact from Website&body=Hello Goldi,"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            // fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          golda.z2030@gmail.com
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
