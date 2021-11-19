import './App.css';
import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import { Route, Routes } from 'react-router-dom'
import Retro from './retro/Retro'

function App() {

  let retroId = 'e0fef645-088d-4f13-b53a-ccb95f4f2131'
  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  const [users, setUsers] = useState()
  const [retro, setRetro] = useState()
  const [socket, setSocket] = useState()

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

  return (
    < Routes >
      <Route path="/" element={<></>} />
      <Route path="/retro/:retro_id" element={<Retro />} />
    </Routes >
  );
}

export default App;
