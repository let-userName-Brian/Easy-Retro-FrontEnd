import React from 'react'
import mjolnirImage from './mjolnir.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function Navbar({ user, darkMode, setDarkMode }) {

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }

  const stringAvatar = (name) => {
    //todo: Get fancier to handle first.last format.
    const nameParts = name.split(' ');
    const initials = `${nameParts?.[0]?.[0] || ''}${nameParts?.[1]?.[0] || 'uK'}`;
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
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{ backgroundColor: '#121212', overflow: 'hidden'}}>
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <img src={mjolnirImage} style={{ width: '125px'}} alt="Logo"/>
          </div>
          <IconButton sx={{ ml: 1 }} 
            onClick={handleDarkMode}
            color="inherit"
            >
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          {auth && (
            <div alt='Avatar'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                <Avatar 
                  {...stringAvatar(user?.user_name || "unknown user")}
                />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
