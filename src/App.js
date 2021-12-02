import { Divider, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Dashboard/Navbar';
import { login } from './Fetch';
import Retro from './retro/Retro';

export default function App() {

  const [user, setUser] = useState()
  const [darkMode, setDarkMode] = useState(true); //darkMode state -- passed to NavBar

  useEffect(() => { login().then(user => setUser(user)) }, [])

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  if (!user) {
    return <>Unable to establish connection...</>
  }

  // console.log('user:', user)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <nav>
          <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Divider color="gray" />
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard user={user} user_id={user.user_id} />} />
          <Route path="/retros/:retro_id" element={<Retro user_id={user.user_id} user={user} />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}