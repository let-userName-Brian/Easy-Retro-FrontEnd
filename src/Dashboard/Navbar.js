import React from 'react'
import mjolnirImage from './mjolnir.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function Navbar({ user, darkMode, setDarkMode }) {

  const stringToColor = (string) => {
    let hash = 0;
    let i;
    let color = '#';

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }


    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }

  const stringAvatar = (name) => {
    const nameParts = name.split(' ');
    const initials = `${nameParts?.[0]?.[0] || ''}${nameParts?.[1]?.[0] || ''}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <Box sx={{ flexGrow: 0, color: 'inherit' }}>
      <AppBar position="static" style={{ backgroundColor: '#121212', overflow: 'hidden', height: 80 }}>
        <Toolbar>
          <div style={{ flexGrow: 1, m: 0, p: 0 }}>
            <Link to="/">
              <img src={mjolnirImage} style={{ height: 90 }} alt="Logo" />
            </Link>
          </div>
          <IconButton sx={{ ml: 1 }}
            onClick={handleDarkMode}
            color="inherit"
          >
            {darkMode === true ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <div alt='Avatar'>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                {...stringAvatar(user?.user_name || "unknown user")}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
