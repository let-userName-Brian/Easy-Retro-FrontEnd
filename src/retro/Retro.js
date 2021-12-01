import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import Column from "./Column";
import { Box, Container } from '@mui/material/';
import { Button, Stack } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';

export const RetroContext = createContext()

export default function Retro({ user_id }) {

  const params = useParams()
  const retroId = params.retro_id
  const [retro, setRetro] = useState()
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Ask the server to join the room with name retroId
    socket.emit('joinRetro', { user_id, retroId });

    socket.on('columnUpdated', ({ columns, column_ids }) => {
      setRetro({ ...retro, column_ids })
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
  }, [user_id, retroId])//adding retro induces infinite loop. do a functional update 'setRetro(r => ...)'

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
      <RetroContext.Provider value={{ retro, cards, comments, user_id }}>
        {retro.column_ids.map(column_id => (<Column key={column_id} col={columns.find(column => column.column_id === column_id)} />))}
      </RetroContext.Provider>
    </Box>
  </Container>
  )
}