import React, { useState } from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
  MdPerson,
  MdUpload,
  MdExitToApp,
} from "react-icons/md";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import theme from "../../theme"; // ייבוא הקובץ הקיים של ה-theme
import ListWordToDo from "../../features/actions/ListWordToDo";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import TestsYouHaveToDo from "../../features/TestsYouHaveToDo";
import { Stack } from "@mui/material";

// עיצוב מותאם אישית עבור שדה החיפוש
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffff", // צבע רקע לבן
    color: "#000000", // צבע טקסט שחור
    padding: "10px 20px",
    paddingLeft: "40px", // מקום לאייקון
    transition: theme.transitions.create(
      ["background-color", "box-shadow", "border"],
      {
        duration: theme.transitions.duration.shortest,
      }
    ),
    "&::placeholder": {
      color: "#aaaaaa", // צבע טקסט חיפוש
    },
  },
}));

const Navbar = () => {
  const { roles } = useAuth();
  // משתני מצב לפתיחת הפופאפים
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const { fullname } = useAuth(); // מידע על המשתמש

  // פונקציה לפתיחת פופאפ ההתראות
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setProfileAnchorEl(null); // סגירת פופאפ הפרופיל אם פתוח
  };

  // פונקציה לפתיחת פופאפ הפרופיל
  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setNotificationAnchorEl(null); // סגירת פופאפ ההתראות אם פתוח
  };

  // פונקציה לסגירת כל הפופאפים
  const handleClose = () => {
    setNotificationAnchorEl(null);
    setProfileAnchorEl(null);
  };

  // קביעת מצב הפופאפים
  const openNotification = Boolean(notificationAnchorEl); // האם פופאפ ההתראות פתוח
  const openProfile = Boolean(profileAnchorEl); // האם פופאפ הפרופיל פתוח

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: "#9B153B" }}>
        <Toolbar>
          {/* כותרת ה-navbar */}
          <div
            className="navbar-title"
            style={{ flexGrow: 1, color: "#ffffff", fontWeight: "bold" }}
          >
            ראשי
          </div>

          {/* שדה החיפוש */}
          <div
            className="navbar-search"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdSearch
              style={{ position: "absolute", left: "10px", color: "#e91e63" }}
            />
            <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          {/* אייקונים בתפריט */}
          <div
            className="navbar-icons"
            style={{ display: "flex", gap: "10px" }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <div>
                <IconButton
                  aria-label="הצג התראות"
                  color="inherit"
                  onClick={handleNotificationClick}
                >
                  <Badge badgeContent={5} color="secondary">
                    <MdNotifications size={20} style={{ color: "#ffffff" }} />
                  </Badge>
                </IconButton>

                {/* פופאפ התראות */}
                <Popover
                  id="notification-popover"
                  open={openNotification}
                  anchorEl={notificationAnchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    style: { marginTop: "10px" }, // מרחק של 10 פיקסלים מתחת לאייקון
                  }}
                >
                  {roles === "Teacher" && <ListWordToDo />}
                  {roles === "Student" && <TestsYouHaveToDo />}
                </Popover>

                <IconButton aria-label="הצג צ'אט" color="inherit">
                  <MdOutlineChat size={20} style={{ color: "#ffffff" }} />
                </IconButton>
                <IconButton aria-label="הצג ציבור" color="inherit">
                  <MdPublic size={20} style={{ color: "#ffffff" }} />
                </IconButton>
                <IconButton
                  aria-label="הצג פרופיל"
                  color="inherit"
                  onClick={handleProfileClick}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#e91e63",
                      width: 40,
                      height: 40,
                    }}
                  >
                    {fullname[0]}
                  </Avatar>
                </IconButton>
              </div>
            </ClickAwayListener>
          </div>
        </Toolbar>
      </AppBar>

      {/* פופאפ פרופיל */}
      <Popover
        id="profile-popover"
        open={openProfile}
        anchorEl={profileAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Grow}
        PaperProps={{ style: { marginTop: "10px" } }} // מרחק של 10 פיקסלים מתחת לאייקון
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "250px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">{fullname}</Typography>
          </Box>
          <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            component={Link} // הופך את הכפתור ללינק
            to="actions/PersonalDetails" // כתובת היעד
            startIcon={<MdPerson />}
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "100%", textAlign: "center", overflow: "hidden" }}
          >
            הפרטים שלי
          </Button>
          <Button
            startIcon={<MdUpload />}
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "100%", textAlign: "center", overflow: "hidden" }}
          >
            העלאת תמונה
          </Button>
          <Button
            startIcon={<MdExitToApp />}
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "100%", textAlign: "center", overflow: "hidden" }}
          >
            יציאה
          </Button>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, left: 0 }}
          >
            <Typography variant="h6" sx={{ color: "#9B153B" }}>
              X
            </Typography>
          </IconButton>
          </Stack>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default Navbar;
