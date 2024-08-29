import React, { useEffect, useState } from 'react';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, MdPerson, MdUpload, MdExitToApp } from 'react-icons/md';
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import theme from '../../theme';
import ListWordToDo from '../../features/actions/ListWordToDo';
import useAuth from '../../hooks/useAuth';
import './navbar.css';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Stack } from '@mui/material';
import TestsYouHaveToDo from '../../features/TestsYouHaveToDo';
import { useGetTestByClassAndUserMutation } from '../../features/actions/listWord/view/ListWordApiSlice';

// עיצוב מותאם אישית עבור שדה החיפוש
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '10px 20px',
    paddingLeft: '40px',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&::placeholder': {
      color: '#aaaaaa',
    },
  },
}));

const Navbar = () => {
  const [getTestByClassAndUser, { isError, data, error, isLoading }] =
  useGetTestByClassAndUserMutation();
const { _id: user } = useAuth();
const [countOfNotifications,setCountOfNotifications]=useState(0)
useEffect(() => {
  getTestByClassAndUser({ user });
  if(data){
  setCountOfNotifications( data.data.length)}
}, [getTestByClassAndUser, user]);

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const { fullname,roles } = useAuth();

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setProfileAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setNotificationAnchorEl(null);
  };

  const handleClose = () => {
    setNotificationAnchorEl(null);
    setProfileAnchorEl(null);
  };

  const openNotification = Boolean(notificationAnchorEl);
  const openProfile = Boolean(profileAnchorEl);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: '#9B153B' }}>
        <Toolbar>
          <div className="navbar-title" style={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
            ראשי
          </div>

          <div className="navbar-search" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MdSearch style={{ position: 'absolute', left: '10px', color: '#e91e63' }} />
            <StyledInputBase placeholder="חיפוש..." inputProps={{ 'aria-label': 'search' }} />
          </div>

          <div className="navbar-icons" style={{ display: 'flex', gap: '10px' }}>
            <ClickAwayListener onClickAway={() => {
              if (notificationAnchorEl) setNotificationAnchorEl(null);
              if (profileAnchorEl) setProfileAnchorEl(null);
            }}>
              <div>
                <IconButton aria-label="הצג התראות" color="inherit" onClick={handleNotificationClick}>
                  <Badge badgeContent={countOfNotifications} color="secondary">
                    <MdNotifications size={20} style={{ color: '#ffffff' }} />
                  </Badge>
                </IconButton>

                <Popover
                  id="notification-popover"
                  open={openNotification}
                  anchorEl={notificationAnchorEl}
                  onClose={() => setNotificationAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  PaperProps={{
                    style: { marginTop: '10px' },
                  }}
                >
               {roles==='Teacher'&&   <ListWordToDo />}
               {roles==='Student'&&<TestsYouHaveToDo/>}
                </Popover>

                <IconButton aria-label="הצג צ'אט" color="inherit">
                  <MdOutlineChat size={20} style={{ color: '#ffffff' }} />
                </IconButton>
                <IconButton aria-label="הצג ציבור" color="inherit">
                  <MdPublic size={20} style={{ color: '#ffffff' }} />
                </IconButton>
                <IconButton aria-label="הצג פרופיל" color="inherit" onClick={handleProfileClick}>
                  <Avatar style={{ 
                    backgroundColor: '#e91e63',
                     width: 40, height: 40 }}>{fullname[0]}</Avatar>
                </IconButton>
              </div>
            </ClickAwayListener>
          </div>
        </Toolbar>
      </AppBar>

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
        PaperProps={{
          sx: {
            marginTop: "10px",
            
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            backgroundColor: "#ffffff", // צבע רקע לבן עבור הקופסה
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">{fullname}</Typography>
          </Box>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Button
              component={Link}
              to="PersonallDetails"
              startIcon={<MdPerson />}
              onClick={handleClose}
              sx={{
                width: "100%",
                textAlign: "left",
                color: 'primary.main',
                justifyContent: 'flex-start',
                gap: 1,
                border: '1px solid #9B153B',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',
              }}
            >
              הפרטים שלי
            </Button>
            <Button
              startIcon={<MdUpload />}
              onClick={handleClose}
              sx={{
                width: "100%",
                textAlign: "left",
                color: 'primary.main',
                justifyContent: 'flex-start',
                gap: 1,
                border: '1px solid #9B153B',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',

              }}
            >
              העלאת תמונה
            </Button>
            <Button
              component={Link}
              to="/"
              startIcon={<MdExitToApp />}
              onClick={handleClose}
              sx={{
                width: "100%",
                textAlign: 'left',
                color: 'primary.main',
                justifyContent: 'flex-start',
                gap: 1,
                border: '1px solid #9B153B',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: '#ffffff',
                
              }}
            >
              יציאה
            </Button>
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* <Typography variant="h6" sx={{ color: '#9B153B' }}>X</Typography> */}
            </IconButton>
          </Stack>
        </Box>
      </Popover>
    </ThemeProvider>
  );
};

export default Navbar;
