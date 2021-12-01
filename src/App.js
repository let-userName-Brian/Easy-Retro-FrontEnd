import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { getRetrosByUserId, login } from './Fetch';
import Retro from './retro/Retro';
import Navbar from './Dashboard/Navbar';
import { Divider } from '@mui/material';

export default function App() {

  const [user, setUser] = useState()
  const [userRetro, setUserRetro] = useState()
  const [darkMode, setDarkMode] = useState(true); //darkMode state -- passed to NavBar

  useEffect(() => { login().then(user => setUser(user)) }, [])

  useEffect(() => {
    if (!user) {
      return
    }
    getRetrosByUserId(user.user_id)
      .then(userProfileRetro => setUserRetro(userProfileRetro))
  }, [user])

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  if (!user) {
    return <>Unable to establish connection...</>
  }

  console.log('user:', user)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <nav>
          <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Divider color="gray" />
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard user={user} retros={userRetro} user_id={user.user_id} />} />
          <Route path="/retros/:retro_id" element={<Retro user_id={user.user_id} />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}