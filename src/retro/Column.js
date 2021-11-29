import { useEffect, useState, useContext } from "react"
import { socket } from "../SocketClient"
import { Box, Paper, Icon, TextField } from '@mui/material/';
import { RetroContext } from './Retro'
import Card from "./Card"

export default function Column({ col }) {
  const { cards: retroCards, retro, userId } = useContext(RetroContext)
  const [column, setColumn] = useState(col)

  let c = retroCards.filter(card => column.card_ids?.includes(card.card_id))//is the ? necessary
  const [cards, setCards] = useState([c])//run (c) and nothing renders(undefined?), run it with brackets and an empty card renders. remove the brackets without refreshing the page, and the cards load, but they disappear if you refresh the page??? after restarting server it no longer works...

  console.log('state: ', c, '-', cards, 'wtf?')

  useEffect(() => {
    // Received when the server sends us a card update
    socket.on('cardUpdated', (cards, column_id) => {

      if (column_id === column.column_id) {
        setColumn({ ...column, card_ids: cards.map(card => card.card_id) })
        setCards(cards)
        console.log(cards)
      }
    })

    return () => {
      socket.removeAllListeners('cardUpdated')
    }
  }, [column])

  function addCard() {
    let retro_id = retro.retro_id;
    let column_id = column.column_id;
    socket.emit('cardAdded', { retro_id, column_id, userId });
  }

  return (
    <Box
      sx={{
        m: 1,
        width: "30vw",
        height: "90vh"
      }}>
      <Paper elevation={12} sx={{ p: 1 }} >
        <Box container sx={{ textAlign: 'center' }}>
          <TextField fullWidth label={column.column_name} id="columnName" InputProps={{
            inputProps: { style: { textAlign: "left" } }
          }} />
          <Icon sx={{}} onClick={() => { addCard() }}>add_circle</Icon>
        </Box>
        {cards.map((card) => (<Card key={card.card_id} c={card} />))}
      </Paper>
    </Box>
  )
}