import React from 'react'
import mjolnirImage from './mjolnir.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import UserAvatar from '../UserAvatar';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import { changeDarkModePreferences } from '../Fetch'

export default function Navbar({ user, darkMode, setDarkMode }) {

  const user_id = user.user_id;

  const handleDarkMode = () => {
    changeDarkModePreferences(user_id, !darkMode);
    setDarkMode(!darkMode);
  }


  return (
    <Box sx={{ flexGrow: 1, color: 'inherit', width: '100vw', overflow: 'hidden', boxShadow: 3 }}>
      <AppBar position="static" style={{ backgroundColor: (darkMode ? '#121212' : '#356f99'), height: 80 }}>
        <Toolbar>
          <div style={{ flexGrow: 1, m: 0, p: 0 }}>
            <Bounce left>
              <Link to="/">
                <img src={mjolnirImage} style={{ height: 70 }} alt="Logo" />
              </Link>
            </Bounce>
          </div>
          <IconButton sx={{ ml: 1 }}
            onClick={handleDarkMode}
            color="inherit"
          >
            {darkMode === true ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <Flip bottom>
            <div alt='Avatar'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <UserAvatar user_name={user.user_name} />
              </IconButton>
            </div>
          </Flip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
