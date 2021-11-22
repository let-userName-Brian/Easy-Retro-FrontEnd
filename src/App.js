import './App.css';
import { useState, useEffect } from 'react'
import Retro from './retro/Retro'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SocketClient from './SocketClient'
import { getUserById, getRetrosByUserId } from './Fetch';

export default function App() {

  const [user, setUser] = useState()
  const [userRetro, setUserRetro] = useState()

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

  

  console.log('user', user)
  console.log("retros", userRetro)

  const [darkMode, setDarkMode] = useState(); //darkMode state -- passed to NavBar

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <SocketClient />
        <Routes>
          <Route path="/" element={<Dashboard user={user} retros={userRetro} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/retro/:retro_id" element={<Retro />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}