import { Box, Container, Grid, Typography } from '@mui/material/';
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import AddColumnButton from "./AddColumnButton";
import Column from "./Column";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";
import Timer from "./Timer";
import RetroTitle from './RetroTitle'
import Fade from 'react-reveal/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import ShareRetroModal from '../ShareRetroModal';

export const RetroContext = createContext()

export default function Retro({ user_id, user }) {

  const params = useParams()
  const retro_id = params.retro_id
  const [retro, setRetro] = useState()
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [comments, setComments] = useState([])
  const [userVotes, setUserVotes] = useState(0) //state set from the payload of max_votes

  //timer state
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(5);

  useEffect(() => {

    socket.emit('joinRetro', { user_id, retro_id });

    socket.on('connect', () => {
      // Ask the server to join the room with name retroId
      console.log(`Joining retro ${retro_id}`)
      socket.emit('joinRetro', { user_id, retro_id });
    })

    // Received when the server sends us a retro
    socket.on('initRetro', (retroPayload) => {
      console.log('initRetro:', retroPayload)
      setRetro(retroPayload.retro)
      setColumns(retroPayload.columns)
      setCards(retroPayload.cards)
      setComments(retroPayload.comments)
      let currentUsedVotes = retroPayload.cards.reduce((acc, card) => acc + card.votes.filter(vote => vote.user_id === user_id).length, 0)
      setUserVotes(retroPayload.retro.max_votes - currentUsedVotes)
    })

    socket.on('columnUpdated', ({ retro, columns, user_id: updatedByUserId, column_id }) => {
      setRetro(retro)
      setColumns(columns)

      if (column_id && updatedByUserId === user_id) {
        let column = document.getElementById(`column-${column_id}`)
        if (column) {
          column.focus()
          column.select()
        }
      }
    })

    return () => {
      socket.off('initRetro')
      socket.off('columnUpdated')
      socket.off('connect')
    }
  }, [retro_id, user_id])

  function addColumn() {
    socket.emit('addColumn', { retro_id });
  }

  if (!retro) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '600px'
      }}>
        <CircularProgress />
      </Box>
    )
  }

  //need to redo styling lost it on merge somehow and now I cant log in to see a screen
  return (
    <Container maxWidth="xl">
      <Fade right>
        <Grid container spacing={3} sx={{ display: 'flex' }}>
          <Grid item xs={8} md={8} lg={8} sx={{ flex: '1', textAlign: 'left', mt: 2 }}>
            <RetroTitle title={retro.retro_name} />
            <Typography>You have {userVotes} votes left!</Typography>
            <ShareRetroModal url={window.location.href} />
          </Grid>
          <Grid item xs={4} md={4} lg={4} sx={{ marginLeft: 'auto', textAlign: 'center', alignItems: 'flex-end' }}>
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
      </Fade>
      {/* <Fade left> */}
      <Box sx={{ display: 'flex' }} >
        <RetroContext.Provider value={{ retro, columns, cards, comments, user_id, userVotes, setUserVotes }}>
          {retro.column_ids.map(column_id => (<Column key={column_id} column_id={column_id} user={user} />))}
          <AddColumnButton addColumnFunc={() => addColumn()} />
        </RetroContext.Provider>
      </Box>
      {/* </Fade> */}
    </Container>
  )
}