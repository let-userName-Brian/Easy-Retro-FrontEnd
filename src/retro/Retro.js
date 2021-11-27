import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import Column from "./Column";
import { Box, Container } from '@mui/material/';
import { Button, Stack } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';



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

    socket.on('columnUpdated', (columns) => {
      console.log('Columns Updated', columns)
      setRetro({ ...retro, column_ids: columns.map(col => col.column_id) })
      setColumns(columns)
    })

    // Received when the server sends us a retro
    socket.on('initRetro', (retroPayload) => {
      console.log('initRetro:', retroPayload)
      setRetro(retroPayload.retro)
      setColumns(retroPayload.columns)
      setCards(retroPayload.cards)
      setComments(retroPayload.comments)
    })
  }, [userId, retroId])

  function addColumn() {
    socket.emit('columnAdded', retroId);
  }

  if (!retro) {
    return <div>Loading Retro!</div>
  }

  return (<Container maxWidth="lg">
    <Stack spacing={2} direction="row">
      <div>Retro Name: {retro.retro_name}</div>
      <Button
        onClick={() => {
          addColumn();
        }}
        variant="contained" startIcon={<AddIcon />}>Add Column</Button>
    </Stack>
    <Box sx={{ height: '100vh', display: 'flex' }} >
      {/* hard coded userId needs refactored */}
      <RetroContext.Provider value={{ retro, columns, cards, comments, userId }}>
        {console.log('state columns:', columns)}
        {retro.column_ids.map(id => (<Column key={id} column_id={id} />))}
      </RetroContext.Provider>
    </Box>
  </Container>
  )
}