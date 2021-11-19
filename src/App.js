import './App.css';
import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import {ThemeProvider, Switch } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



export default function App() {

  let retroId = 'e0fef645-088d-4f13-b53a-ccb95f4f2131'
  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  const [users, setUsers] = useState()
  const [retro, setRetro] = useState()
  const [socket, setSocket] = useState()

  const [darkMode, setDarkMode] = useState(false); //darkMode state -- passed to NavBar
  //console.log('state pre', darkMode)


  console.log("NODE_ENV", process.env.NODE_ENV)
  const serverURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://sdi07-03.staging.dso.mil"
  const serverPath = process.env.NODE_ENV === "development" ? "/socket.io/" : "/api/socket.io/"




  useEffect(() => {
    // fetch(`https://sdi07-03.staging.dso.mil/api/retros/${retroId}`)
    //   .then(resp => resp.json())
    //   .then(retro => {
    //     setRetro(retro)
    //   })

    console.log('connecting to socket.io at: ', serverURL)
    const newSocket = io(serverURL, {
      //const newSocket = io("http://localhost:8080", {
      path: serverPath,
      transport: ['websocket', 'polling', 'flashsocket']
    });
    console.log('connected to socket.io at: ', serverURL, "id:", newSocket.id)

    setSocket(newSocket) //useState var

    newSocket.emit('joinedRetro', { userId, retroId });

    newSocket.on('joinedRetro', users => {
      setUsers(users)
      console.log('joined retro', users)
    })
  }, [])


  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
  }
  })

  return (

        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Routes>
                <Route path="/" element={<Dashboard users={users} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
              </Routes>
            </CssBaseline>
          </ThemeProvider>
        </Router>
  );
}