import './App.css';
import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import Retro from './retro/Retro'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {

  let retroId = 'e0fef645-088d-4f13-b53a-ccb95f4f2131'
  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  const [users, setUsers] = useState()
  const [retro, setRetro] = useState()
  const [socket, setSocket] = useState()
  const [darkMode, setDarkMode] = useState(); //darkMode state -- passed to NavBar



  const sockets = {
    test: "",
    development: "http://localhost:8080",
    production: "https://sdi07-03.staging.dso.mil/api"
  }

  const serverURL = sockets[process.env.NODE_ENV]

  useEffect(() => {
    console.log('connecting to socket.io at: ', serverURL)
    const newSocket = io(serverURL, {
      path: "/socket.io/",
      transport: ['websocket', 'polling', 'flashsocket']
    });
    console.log('connected to socket.io at: ', serverURL)

    setSocket(newSocket) //useState var

    newSocket.emit('joinedRetro', { userId, retroId });

    newSocket.on('joinedRetro', users => {
      setUsers(users)
      console.log('joined retro', users)
    })
    return () => newSocket.disconnect();
  }, [])


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