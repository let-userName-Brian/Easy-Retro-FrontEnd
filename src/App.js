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

export default function App() {

  const [user, setUser] = useState()

  //Floyd's userID to be used for testing
  //its gonna need to be pulled from the header and then set if the user isnt in the db
  const user_id = 'c1ad74ae-b651-4fa0-9820-833193797964'

  useEffect(() => {
    getUserById(user_id)
      .then(userProfile => setUser(userProfile))
  }, [])


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
          <Route path="/" element={<Dashboard users={user} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/retro/:retro_id" element={<Retro />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}