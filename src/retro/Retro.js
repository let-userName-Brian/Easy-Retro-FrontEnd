import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import Column from "./Column";
import { Box, Container } from '@mui/material/';
import { Button, Grid } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import SettingsContext from "./SettingsContext";
import Timer from "./Timer";
import Settings from "./Settings";


export const RetroContext = createContext()

export default function Retro({ user_id }) {

  const params = useParams()
  const retroId = params.retro_id
  const [retro, setRetro] = useState()
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [comments, setComments] = useState([])

  //timer state
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(5);

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


  //need to redo styling lost it on merge somehow and now I cant log in to see a screen
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{display: 'flex'}}>
        <Grid item xs={4} md={4} lg={4} sx={{flex: '1', textAlign: 'center', marginTop: '5%'}}>
          {/* <Stack spacing={2} direction="row"> */}
          <div>Retro Name: {retro.retro_name}</div>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sx={{flex: '1', textAlign: 'center', marginTop: '5%'}}>
          <Button
            onClick={() => {
              addColumn();
            }}
            variant="contained" startIcon={<AddIcon />}>Add Column</Button>
        </Grid>
        {/* </Stack> */}
        <Grid item xs={4} md={4} lg={4} sx={{ marginLeft: '0 auto',  marginTop: '0%', flexDirection: 'column', textAlign: 'right'}}>
          <SettingsContext.Provider value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}>
            {showSettings ? <Settings /> : <Timer />}
          </SettingsContext.Provider>
        </Grid>
      </Grid>
      <Box sx={{ height: '100vh', display: 'flex' }} >
        <RetroContext.Provider value={{ retro, cards, comments, user_id }}>
          {retro.column_ids.map(column_id => (<Column key={column_id} col={columns.find(column => column.column_id === column_id)} />))}
        </RetroContext.Provider>
      </Box>
    </Container>
  )
}