// // // theme.js
// // import { createTheme } from '@mui/material/styles';

// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#283593',
// //       light: '#5c6bc0',
// //       dark: '#1a237e',
// //     },
// //     secondary: {
// //       main: '#9B153B',
// //     },
// //   },
// //   components: {
// //     MuiDataGrid: {
// //       styleOverrides: {
// //         root: {
// //           border: 'none',
// //           borderRadius: '8px',
// //           padding: '16px',
// //           '& .MuiDataGrid-columnHeaders': {
// //             backgroundColor: '#f3f3e9',
// //             fontWeight: 'bold',
// //             color: '#9B153B',
// //           },
// //           '& .MuiDataGrid-cell': {
// //             padding: '8px 16px',
// //             color: '#9B153B',
// //           },
// //           '& .MuiDataGrid-footerContainer': {
// //             backgroundColor: '#f3f3e9',
// //             boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
// //           },
// //           '& .MuiCheckbox-root': {
// //             color: '#9B153B',
// //           },
// //         },
// //       },
// //     },
// //     MuiTextField: {
// //       styleOverrides: {
// //         root: {
// //           '& .MuiOutlinedInput-root': {
// //             '& fieldset': {
// //               borderColor: '#9B153B',
// //             },
// //             '&:hover fieldset': {
// //               borderColor: '#9B153B',
// //             },
// //             '&.Mui-focused fieldset': {
// //               borderColor: '#9B153B',
// //             },
// //           },
// //           '& .MuiInputAdornment-root': {
// //             color: '#9B153B',
// //           },
// //           '& .MuiInputLabel-root': {
// //             color: '#9B153B',
// //             '&.Mui-focused': {
// //               color: '#9B153B',
// //             },
// //           },
// //           '& .MuiInputBase-input': {
// //             backgroundColor: '#f3f3e9',
// //             padding: '8px',
// //           },
// //         },
// //       },
// //     },
// //     MuiButton: {
// //       styleOverrides: {
// //         root: {
// //           backgroundColor: '#ff7043',
// //           color: '#ffffff',
// //           '&:hover': {
// //             backgroundColor: '#f4511e',
// //           },
// //         },
// //       },
// //     },
// //     MuiIconButton: {
// //       styleOverrides: {
// //         root: {
// //           color: '#9B153B',
// //           '&:hover': {
// //             color: '#9B153B',
// //           },
// //         },
// //       },
// //     },
// //   },
// // });

// // export default theme;




// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#9B153B',  // בורדו
//       light: '#ff5252',  // גוון בהיר יותר של בורדו
//       dark: '#d50000',  // גוון כהה יותר של בורדו
//     },
//     secondary: {
//       main: '#9B153B',
//     },
//   },
//   typography: {
//     h1: {
//       color: '#9B153B',
//     },
//     h2: {
//       color: '#9B153B',
//     },
//     h3: {
//       color: '#9B153B',
//     },
//     h4: {
//       color: '#9B153B',
//     },
//     h5: {
//       color: '#9B153B',
//     },
//     h6: {
//       color: '#9B153B',
//     },
//   },
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: 'none',
//           borderRadius: '8px',
//           padding: '16px',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f3f3e9',
//             fontWeight: 'bold',
//             color: '#9B153B',
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '8px 16px',
//             color: '#9B153B',
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#f3f3e9',
//             boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
//           },
//           '& .MuiCheckbox-root': {
//             color: '#9B153B',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#9B153B',
//             },
//             '&:hover fieldset': {
//               borderColor: '#9B153B',
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#9B153B',
//             },
//           },
//           '& .MuiInputAdornment-root': {
//             color: '#9B153B',
//           },
//           '& .MuiInputLabel-root': {
//             color: '#9B153B',
//             '&.Mui-focused': {
//               color: '#9B153B',
//             },
//           },
//           '& .MuiInputBase-input': {
//             backgroundColor: '#ffffff',
//             padding: '8px',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#9B153B',
//           color: '#ffffff',
//           '&:hover': {
//             backgroundColor: '#7f0e2e',
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: '#9B153B',
//           '&:hover': {
//             color: '#7f0e2e',
//           },
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderColor: '#9B153B',
//         },
//       },
//     },
//     MuiSelect: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#9B153B',
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#9B153B',
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#9B153B',
//           },
//         },
//       },
//     },
//   },
// });

// export default theme;


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B153B',  // בורדו
      light: '#ff5252',  // גוון בהיר יותר של בורדו
      dark: '#d50000',  // גוון כהה יותר של בורדו
    },
    secondary: {
      main: '#9B153B',
    },
  },
  typography: {
    h1: {
      color: '#9B153B',
    },
    h2: {
      color: '#9B153B',
    },
    h3: {
      color: '#9B153B',
    },
    h4: {
      color: '#9B153B',
    },
    h5: {
      color: '#9B153B',
    },
    h6: {
      color: '#9B153B',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '8px',
          padding: '16px',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f3f3e9',
            fontWeight: 'bold',
            color: '#9B153B',
          },
          '& .MuiDataGrid-cell': {
            padding: '8px 16px',
            color: '#9B153B',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f3f3e9',
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiCheckbox-root': {
            color: '#9B153B',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#9B153B',
            },
            // '&:hover fieldset': {
            //   borderColor: '#9B153B',
            // },
            '&.Mui-focused fieldset': {
              borderColor: '#9B153B',
            },
          },
          '& .MuiInputAdornment-root': {
            color: '#9B153B',
          },
          '& .MuiInputLabel-root': {
            color: '#9B153B',
            '&.Mui-focused': {
              color: '#9B153B',
            },
          },
          '& .MuiInputBase-input': {
            backgroundColor: '#ffffff',
            padding: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#9B153B',
          color: '#ffffff',
          // '&:hover': {
          //   backgroundColor: '#7f0e2e',
          // },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#9B153B',
          // '&:hover': {
          //   color: '#7f0e2e',
          // },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#9B153B',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9B153B',
          },
          // '&:hover .MuiOutlinedInput-notchedOutline': {
          //   borderColor: '#9B153B',
          // },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9B153B',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff', // צבע רקע לבן עבור ה-Popover
        },
      },
    },
  },
});

export default theme;
