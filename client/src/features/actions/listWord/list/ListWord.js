import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaPen } from 'react-icons/fa';
import { MdSportsEsports } from 'react-icons/md';
import SearchIcon from "@mui/icons-material/Search";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import theme from "../../../../theme";
import {
  useDeleteListWordsMutation,
  useGetAllListWordsByClassMutation,
  useGetTestByClassAndUserMutation,
  useGetAllTestsDoneMutation,
} from "../view/ListWordApiSlice";
import LockIcon from '@mui/icons-material/Lock';
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import useAuth from "../../../../hooks/useAuth";
import useSchoolAndClass from "../../../../hooks/useSchoolAndClass";
const ListWord = ({ todos }) => {
  const { roles, _id: user } = useAuth(); // Retrieve roles

  const [getAllTestsDone, doneResponse] = useGetAllTestsDoneMutation();
  const [getTestByClassAndUser, studentResponse] =
    useGetTestByClassAndUserMutation();
  const [getAllListWordsByClass, teacherResponse] =
    useGetAllListWordsByClassMutation();

  let wordLsList, isError, error, isLoading;

  if (todos) {
    wordLsList = doneResponse.data;
    isError = doneResponse.isError;
    error = doneResponse.isError;
    isLoading = doneResponse.isLoading;
  } else if (roles === "Student") {
    wordLsList = studentResponse.data;
    isError = studentResponse.isError;
    error = studentResponse.isStudentError;
    isLoading = studentResponse.isStudentisLoading;
  } else if (roles === "Teacher") {
    wordLsList = teacherResponse.data;
    isError = teacherResponse.isError;
    error = teacherResponse.error;
    isLoading = teacherResponse.isLoading;
  }

  const { chosenClass, chosenSchool } = useSchoolAndClass();
  const [playId, setPlayId] = useState(null)
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (roles === "Student" && !todos) {
      getTestByClassAndUser({ user });
    } else if (todos) {
      getAllTestsDone({ user });
    }
  }, []);
  useEffect(() => {
    if (roles === "Teacher" && chosenClass) getAllListWordsByClass(classObj);
  }, [chosenClass]);

  const [deleteListWords] = useDeleteListWordsMutation();

  if (!chosenClass && roles === "Teacher") return <CurrentSchoolAndClass />;
  let classObj;
  if (chosenClass) classObj = { chosenClass: chosenClass };

  if (error) {
    return (
      <Typography color="error" variant="h5">
        {error.data.message}
      </Typography>
    );
  }

  if (isLoading) return <Typography variant="h5">Loading...</Typography>;

  const handleDeleteClick = (list) => {
    if (window.confirm("בטוח שברצונך למחוק את המבחן?")) {
      deleteListWords({ _id: list._id });
    }
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  if (roles === "Student") {
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) console.log(isError, "error");
    if (wordLsList) {
      console.log(wordLsList, "testStudent");
    }
  }


  // אם playId לא null, מחזירים את הקומפוננטה Play בלבד

  const filteredRows = (wordLsList?.data || [])
    .filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .map((list) => ({
      id: list._id,
      title: list.title,
      date: list.date ? list.date.slice(0, 10) : "",
      wordCount: list.test.length,
      mark: list.mark || 0,
      active:list.active,
      complete:list.complete
    }));

  const columns = [
    {
      field: "title",
      headerName: "כותרת",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    //הוספת עמודה רק אם המשתמש הוא תלמיד
    ...(roles === 'Student' ? [{
      field: "mark",
      headerName: "ציון",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }] : []),
    {
      field: "plays",
      headerName: "משחקים",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
 

          <Tooltip title="plays">
            <IconButton
              component={Link}
              to={`/dash/play/${params.row.id}`}
              aria-label="play-memory"
              color="info"
              sx={{ mr: 1 }}
            >
              <MdSportsEsports />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Hangman-play">
    <IconButton
      component={Link}
      to={`/dash/play/hangman/${params.row.id}`}
      aria-label="play-memory"
      color="info"
      sx={{ mr: 1 }}
    >
      <FaUserSecret />
    </IconButton>
  </Tooltip> */}
        </>)
    },
    {
      field: "actions",
      headerName: "פעולות",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="words">
            <IconButton
              component={Link}
              to={`/dash/words/${params.row.id}`}
              aria-label="update"
              color="info"
              sx={{ mr: 1  ,verticalAlign: 'middle' }} // שמירה על יישור אמצע}}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {roles === "Teacher" ? (
            <>

              <Tooltip title="Update">
                <IconButton
                  component={Link}
                  to={`/dash/${params.row.id}`}
                  aria-label="update"
                  color="info"
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="marks">
                <IconButton
                  component={Link}
                  to={`/dash/marks/${params.row.id}`}
                  aria-label="marks"
                  color="info"
                  sx={{ mr: 1 }}
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(params.row)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : roles === "Student" ? (
            <>



       {/* בדיקה אם השורה פעילה */}
       {(params.row.active||params.row.complete) ? (
          <Tooltip title="Go to test">
            <IconButton
              component={Link}
              to={`/dash/test/false/${params.row.id}`}
              aria-label="view"
              color="primary"
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        ) : (
          // אייקון נעילה אם השורה לא פעילה
          <Tooltip title="Test locked">
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center', // יישור באותו קו
              verticalAlign: 'middle'
            }}
          >
            <DescriptionIcon />
            <LockIcon
              sx={{
                color: '#ff5252',
                position: 'absolute',
                bottom: '-2px', // מיקום נמוך יותר כדי להתחיל מלמטה
                right: 0,
                fontSize: '0.9rem'
              }}
            />
          </Box>
        </Tooltip>
        )}


              {/* <Tooltip title="test">
                <IconButton
                  component={Link}
                  to={`/dash/test/false/${params.row.id}`}
                  aria-label="view"
                  color="primary"
                >
                  <DescriptionIcon />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="trying">
                <IconButton
                  component={Link}
                  to={`/dash/test/true/${params.row.id}`}
                  aria-label="trying"
                  color="primary"
                >

                  <FaPen />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "93vh" }}>
        <Box
          sx={{
            p: 2,
            backgroundColor: "#ffffff", // White background for the top section
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="חיפוש"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <IconButton edge="end"> */}
                  <SearchIcon />
                  {/* </IconButton> */}
                </InputAdornment>
              ),
            }}
            sx={{ width: "20%" }} // Ensure the search input takes full width
          />



          {/* Uncomment this section if you want to add a button */}
          {/* <Button
            component={Link}
            to={`/dash/actions/new`}
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              backgroundColor: "#283593",
              "&:hover": { backgroundColor: "#1a237e" },
            }}
          >
            Add New
          </Button> */}
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
            sx={{
              height: "calc(100% - 56px)", // Adjust height to ensure sticky footer space
              width: "100%",
              "& .MuiDataGrid-columnHeader": {
                // backgroundColor: "#f3f3e9", // Beige background for the header
                fontWeight: "bolder", // Bold header text
                fontSize: "larger"
              },
              "& .MuiDataGrid-cell": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Box>
        {/* <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#f3f3e9", // Beige background for the footer
            padding: "8px",
            textAlign: "center",
            zIndex: 1,
          }}
        >

        </Box> */}
      </Box>
    </ThemeProvider>
  );
};

export default ListWord;


