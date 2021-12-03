import { Box, Container, Grid, Typography } from '@mui/material/';
import { createContext, useCallback, useEffect, useState } from "react";
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
  const [joinedRetro, setJoinedRetro] = useState(false)

  //timer state
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const handleInitRetro = useCallback((retroPayload) => {
    console.log('initRetro:', retroPayload)
    setRetro(retroPayload.retro)
    setColumns(retroPayload.columns)
    setCards(retroPayload.cards)
    setComments(retroPayload.comments)
    let currentUsedVotes = retroPayload.cards.reduce((acc, card) => acc + card.votes.filter(vote => vote.user_id === user_id).length, 0)
    setUserVotes(retroPayload.retro.max_votes - currentUsedVotes)
  }, [user_id])

  const handleColumnUpdated = useCallback(({ retro, columns, user_id: updatedByUserId, column_id }) => {
    setRetro(retro)
    setColumns(columns)

    if (column_id && updatedByUserId === user_id) {
      let column = document.getElementById(`column-${column_id}`)
      if (column) {
        column.focus()
        column.select()
      }
    }
  }, [user_id])

  const handleConnect = useCallback(() => {
    // Ask the server to join the room with name retroId
    if (!joinedRetro) {
      console.log(`Joining retro ${retro_id}`)
      socket.emit('joinRetro', { user_id, retro_id });
      setJoinedRetro(true)
    }
  }, [joinedRetro, retro_id, user_id])

  const handleDisconnect = useCallback(() => {
    setJoinedRetro(false)
  }, [])

  useEffect(() => {

    // Reconnects to the retro room if we've refreshed the page or reloaded react
    if (socket.connected && !joinedRetro) {
      console.log(`Joining retro ${retro_id}`)
      socket.emit('joinRetro', { user_id, retro_id });
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('initRetro', handleInitRetro)
    socket.on('columnUpdated', handleColumnUpdated)

    return () => {
      socket.off('initRetro', handleInitRetro)
      socket.off('columnUpdated', handleColumnUpdated)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [retro_id, user_id, handleColumnUpdated, handleConnect, handleDisconnect, handleInitRetro, joinedRetro])

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
    <Container maxWidth="xl" sx={{margin:'0'}}>
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
        <RetroContext.Provider value={{ retro_id, retro, columns, cards, comments, user_id, userVotes, setUserVotes }}>
          {retro.column_ids.map(column_id => (<Column key={column_id} column_id={column_id} user={user} />))}
          <AddColumnButton addColumnFunc={() => addColumn()} />
        </RetroContext.Provider>
      </Box>
      {/* </Fade> */}
    </Container>
  )
}