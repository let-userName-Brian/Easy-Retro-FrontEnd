import { Box, Container, Grid } from '@mui/material/';
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from '../SocketClient';
import AddColumnButton from "./AddColumnButton";
import Column from "./Column";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";
import Timer from "./Timer";

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
    // Ask the server to join the room with name retroId
    socket.emit('joinRetro', { user_id, retro_id });

    socket.on('columnUpdated', ({ retro, columns }) => {
      setRetro(retro)
      setColumns(columns)
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

    return () => {
      socket.off('columnUpdated')
      socket.off('initRetro')
    }
  }, [retro_id, user_id])


  function addColumn() {
    socket.emit('columnAdded', { retro_id });
  }

  if (!retro) {
    return <div>Loading Retro!</div>
  }

  //need to redo styling lost it on merge somehow and now I cant log in to see a screen
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ display: 'flex' }}>
        <Grid item xs={4} md={4} lg={4} sx={{ flex: '1', textAlign: 'center', marginTop: '5%' }}>
          {/* <Stack spacing={2} direction="row"> */}
          <div>Retro Name: {retro.retro_name}</div>
          <div>You have {userVotes} votes left!</div>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sx={{ flex: '1', textAlign: 'center', marginTop: '5%' }} />
        {/* </Stack> */}
        <Grid item xs={4} md={4} lg={4} sx={{ marginLeft: '0 auto', marginTop: '0%', flexDirection: 'column', textAlign: 'right' }}>
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
      <Box sx={{ display: 'flex' }} >
        <RetroContext.Provider value={{ retro, columns, cards, comments, user_id, userVotes, setUserVotes }}>
          {retro.column_ids.map(column_id => (<Column key={column_id} column_id={column_id} user={user} />))}
          <AddColumnButton addColumnFunc={() => addColumn()} />
        </RetroContext.Provider>
      </Box>
    </Container>
  )
}