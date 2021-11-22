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

  let retroId = 'e0fef645-088d-4f13-b53a-ccb95f4f2131'
  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  const [users, setUsers] = useState()
  const [retro, setRetro] = useState()
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
          <Route path="/" element={<Dashboard users={users} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/retro/:retro_id" element={<Retro />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}