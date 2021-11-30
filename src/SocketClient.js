import { io } from "socket.io-client";

const sockets = {
  test: "",
  development: "http://localhost:8080/",
  production: "https://sdi07-03.staging.dso.mil/api/"
}

const serverURL = sockets[process.env.NODE_ENV]

let connected = false
export let socket
socket = init()

function init() {
  if (connected) {
    return socket
  }

  console.log('connecting to socket.io at: ', serverURL)
  socket = io(serverURL, {
    path: "/socket.io/",
    transport: ['polling', 'flashsocket']
  });

  connected = true

  socket.on('joinedRetro', onJoinedRetro)
  socket.on('connect', onConnect)
  socket.on('disconnect', onDisconnect)

  return socket
}

function onConnect() {
  console.log('connected to socket.io at: ', serverURL, socket)
}

function onDisconnect() {
  console.log('Disconnected from socket')
  connected = false
}

function onJoinedRetro(users) {
  console.log('joined retro', users)
}