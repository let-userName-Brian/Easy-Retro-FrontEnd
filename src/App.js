import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import {
  Route, Routes
} from "react-router-dom";
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Retro from './retro/Retro';

export default function App() {

  let retroId = 'e0fef645-088d-4f13-b53a-ccb95f4f2131'
  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  const [users, setUsers] = useState()
  const [darkMode, setDarkMode] = useState(); //darkMode state -- passed to NavBar

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
          <Route path="/" element={<Dashboard users={users} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/retro/:retro_id" element={<Retro />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}