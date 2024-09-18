import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import {
    useAddClassMutation,
    useGetAllSchoolsByTeacherMutation,
} from "../CompaniesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Select, MenuItem, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined"; // אייקון כיתה

const AddClass = () => {
    const [addClass, {  isSuccess }] = useAddClassMutation();
    const [
        getAllSchoolsByTeacher,
        { data: schools, isError: schoolsIsError, error: schoolsErrorData, isLoading: schoolsIsLoading },
    ] = useGetAllSchoolsByTeacherMutation();
    const navigate = useNavigate();
    const { _id } = useAuth();
    const theme = useTheme(); // שימוש בנושא הקיים
    const { school_id } = useParams()
    useEffect(() => {
        getAllSchoolsByTeacher({ teacher: _id });
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/companies");
        }
    }, [isSuccess]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const classObject = Object.fromEntries(formData.entries());
        addClass(classObject);
    };


  


    return (
        <Box
            sx={{
                padding: theme.spacing(4),
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "10px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                height: "68vh", // גובה מוגדר
                maxWidth: "600px",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {/* אייקון כיתה בראש העמוד */}
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: theme.spacing(2) }}>
                <ClassOutlinedIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
                הוספת כיתה
            </Typography>

            <form onSubmit={formSubmit}>
                <TextField
                    label="שם הכיתה"
                    name="name"
                    required
                    fullWidth
                    sx={{ marginBottom: theme.spacing(2) }}
                />

                {/* <Select
                    label="בחר בית ספר"
                    name="school"
                    required
                    fullWidth
                    defaultValue=""
                    sx={{ marginBottom: theme.spacing(2) }}
                >
                    <MenuItem disabled value="">
                        בחר בית ספר
                    </MenuItem>
                    {schools.data.map((school) => (
                        <MenuItem key={school._id} value={school._id}>
                            {school.name}
                        </MenuItem>
                    ))}
                </Select> */}
                <input
                    name="school"
                    value={school_id}
                    type="hidden"
                />
                <Select
                    label="פעיל?"
                    name="active"
                    required
                    fullWidth
                    defaultValue={true}
                    sx={{ marginBottom: theme.spacing(2) }}
                >
                    <MenuItem value={true}>פעיל</MenuItem>
                    <MenuItem value={false}>לא פעיל</MenuItem>
                </Select>

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    שלח
                </Button>
            </form>
        </Box>
    );
};

export default AddClass;
