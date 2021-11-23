import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import Column from "./Column";

export const RetroContext = createContext()

export default function Retro() {

  const params = useParams()
  const retroId = params.retro_id
  const [retro, setRetro] = useState()
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [comments, setComments] = useState([])

  console.log('socket', socket)

  let userId = 'c1ad74ae-b651-4fa0-9820-833193797964'

  useEffect(() => {
    // Ask the server to join the room with name retroId
    socket.emit('joinRetro', { userId, retroId });

    // Received when the server sends us a retro
    socket.on('initRetro', (retroPayload) => {
      // console.log('initRetro:', retro, columns, cards, comments)
      setRetro(retroPayload.retro)
      setColumns(retroPayload.columns)
      setCards(retroPayload.cards)
      setComments(retroPayload.comments)
    })
  }, [userId, retroId])

  if (!retro) {
    return <div>Loading Retro!</div>
  }

  return (
    <RetroContext.Provider value={{ retro, columns, cards, comments }}>
      {console.log('state columns:', columns)}
      <div>Retro Name: {retro.retro_name}</div>
      {retro.column_ids.map(id => (<Column key={id} column_id={id} />))}
    </RetroContext.Provider>
  )
}