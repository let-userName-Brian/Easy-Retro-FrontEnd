import { useEffect, useState, useContext } from "react"
import { socket } from "../SocketClient"
import { Box, Paper, Icon, TextField, Skeleton } from '@mui/material/';
import { RetroContext } from './Retro'
import Card from "./Card"

export default function Column({ col }) {
  const { cards: retroCards, retro, userId } = useContext(RetroContext)
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()

  useEffect(() => {
    // Received when the server sends us a card update
    socket.on('cardUpdated', (cards, column_id) => {

      if (column_id === column.column_id) {
        setColumn({ ...column, card_ids: cards.map(card => card.card_id) })
        setCards(cards)
        console.log(cards)
      }
    })

    let c = retroCards.filter(card => column?.card_ids.includes(card.card_id))
    setCards(c)
    console.log('retroCards: ', retroCards, 'state: ', c)

    return () => {
      socket.removeAllListeners('cardUpdated')
    }
  }, [column, retroCards])

  useEffect(() => {
    setColumn(col)
  }, [col])

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
          {column ? (
            <TextField fullWidth label={column.column_name} id="columnName" InputProps={{
              inputProps: { style: { textAlign: "left" } }
            }} />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          <Icon sx={{}} onClick={() => { addCard() }}>add_circle</Icon>
        </Box>
        {cards?.map((card) => (<Card key={card.card_id} c={card} />))}
      </Paper>
    </Box>
  )
}