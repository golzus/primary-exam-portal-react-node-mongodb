import { useEffect } from "react";
import { useAddSchoolMutation } from "../CompaniesApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import LOADING from "../../loadingAnimation/LoadingAnimation";
import { Box, TextField, Select, MenuItem, Button, Typography, InputLabel } from "@mui/material";
import { BiSolidSchool } from "react-icons/bi"; // ייבוא האייקון החדש
import { useTheme } from "@mui/material/styles";

const AddSchool = () => {
    const [addSchool, { isError, error, isSuccess, isLoading }] = useAddSchoolMutation();
    const navigate = useNavigate();
    const { _id } = useAuth();
    const theme = useTheme(); // שימוש בנושא הקיים

    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/companies");
        }
    }, [isSuccess]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const schoolObject = Object.fromEntries(formData.entries());
        addSchool(schoolObject);
    };

    if (isLoading) return <LOADING />;
    if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

    return (
        <Box
            sx={{
                padding: theme.spacing(4),
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "10px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                maxWidth: "600px",
                margin: "auto",
                height: "65vh", // גובה מוגדר
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {/* אייקון חינוך בראש העמוד */}
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: theme.spacing(2) }}>
                <BiSolidSchool style={{ fontSize: 80, color: theme.palette.primary.main }} /> {/* שימוש באייקון החדש */}
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
                הוספת בית ספר
            </Typography>

            <form onSubmit={formSubmit}>
                <TextField
                    label="שם בית הספר"
                    name="name"
                    required
                    fullWidth
                    sx={{ marginBottom: theme.spacing(2) }}
                />

                {/* <InputLabel id="active-label">פעיל?</InputLabel> */}
                <Select
                    labelId="active-label"
                    name="active"
                    fullWidth
                    defaultValue={true}
                    sx={{ marginBottom: theme.spacing(2) }}
                >
                    <MenuItem value={true}>פעיל</MenuItem>
                    <MenuItem value={false}>לא פעיל</MenuItem>
                </Select>

                <input
                    name="teacher"
                    value={_id}
                    type="hidden"
                />


                <TextField
                    type="file"
                    name="image"
                    fullWidth
                    sx={{ marginBottom: theme.spacing(2) }}
                />

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    שלח
                </Button>
            </form>
        </Box>
    );
};

export default AddSchool;
