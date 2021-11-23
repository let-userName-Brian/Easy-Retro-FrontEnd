import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import Column from "./Column";

export default function Retro() {

  const params = useParams()
  const retroId = params.retro_id
  const [retro, setRetro] = useState()

  console.log('socket', socket)

  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  useEffect(() => {
    // Ask the server to join the room with name retroId
    socket.emit('joinRetro', { userId, retroId });

    // Received when the server sends us a retro
    socket.on('receivedRetro', (retro) => setRetro(retro))
  }, [retroId])

  if (!retro) {
    return <div>Loading Retro!</div>
  }

  return (
    <>
      <div>Retro Name: {retro.retro_name}</div>
      {retro.column_ids.map(id => (<Column key={id} column_id={id} />))}
    </>
  )
}