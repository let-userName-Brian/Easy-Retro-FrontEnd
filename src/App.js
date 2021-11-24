import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {
  Route, Routes
} from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { getRetrosByUserId, getUserById } from './Fetch';
import Retro from './retro/Retro';
import Navbar from './Dashboard/Navbar';
import { Divider } from '@mui/material';

export default function App() {

  const [user, setUser] = useState()
  const [userRetro, setUserRetro] = useState()
  const [darkMode, setDarkMode] = useState('dark'); //darkMode state -- passed to NavBar

  //Floyd's userID to be used for testing
  //its gonna need to be pulled from the header and then set if the user isnt in the db
  const user_id = 'c1ad74ae-b651-4fa0-9820-833193797964'

  useEffect(() => {
    getUserById(user_id)
      .then(userProfile => setUser(userProfile))
  }, [])

  useEffect(() => {
    getRetrosByUserId(user_id)
      .then(userProfileRetro => setUserRetro(userProfileRetro))
  }, [])


  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <nav>
        <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Divider color="gray" />
      </nav>
        <Routes>
          <Route path="/" element={<Dashboard user={user} retros={userRetro} user_id={user_id}/>} />
          <Route path="/retros/:retro_id" element={<Retro />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}