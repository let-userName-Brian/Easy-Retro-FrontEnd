import { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const sockets = {
  test: "",
  development: "http://localhost:8080",
  production: "https://sdi07-03.staging.dso.mil/api"
}

const serverURL = sockets[process.env.NODE_ENV]

export default function SocketClient() {

  // const [socket, setSocket] = useState()
  let socket
  const [users, setUsers] = useState([])

  useEffect(() => {
    let socket = init()
    return () => socket.disconnect();
  }, [])

  function init() {
    console.log('connecting to socket.io at: ', serverURL)
    socket = io(serverURL, {
      path: "/socket.io/",
      transport: ['websocket', 'polling', 'flashsocket']
    });

    // setSocket(socket)

    socket.on('joinedRetro', onJoinedRetro)
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    joinRetro('12345', 'retroId')

    return socket
  }

  function onConnect() {
    console.log('connected to socket.io at: ', serverURL, socket)
  }

  function onDisconnect() {
    console.log('Disconnected from socket')
  }

  function joinRetro(userId, retroId) {
    socket.emit('joinRetro', { userId, retroId });
  }

  function onJoinedRetro(users) {
    setUsers(users)
    console.log('joined retro', users)
  }

  return null
}