import { Box, Paper, TextField } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import AddCardButton from './AddCardButton';
import Card from "./Card";
import ColumnMenu from './ColumnMenu';
import { RetroContext } from './Retro';

export default function Column({ column_id, user }) {
  const { columns: initColumns, cards: initCards, retro, user_id } = useContext(RetroContext)//user_id with prop user?
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()
  const [colName, setColumnName] = useState('')
  const [retro_id, setRetroId] = useState()
  const [timer, setTimer] = useState()

  useEffect(() => {
    if (!retro) return;
    setRetroId(retro.retro_id)
  }, [retro])

  useEffect(() => {
    if (!column_id) return
    if (initColumns.length === 0) return
    let col = initColumns.find(column => column.column_id === column_id)
    if (!col) return
    setColumn(col)
    setColumnName(col.column_name)
  }, [initColumns, column_id])

  useEffect(() => {
    if (!column) return
    if (!initCards) return
    //initialize cards from context
    setCards(initCards?.filter(card => column?.card_ids.includes(card.card_id)))
  }, [column, initCards])

  useEffect(() => {
    // Received when the server sends us a name update
    socket.on('columnRenamed', ({ column }) => {
      if (column.column_id === column_id) {
        setColumn(column);
        setColumnName(column.column_name)
      }
    })

    // Received when the server sends us a card update
    socket.on('cardUpdated', ({ cards, column, user_id: updatedByUserId, card_id }) => {
      if (column.column_id === column_id) {
        console.log('cardUpdated', cards, column)
        setCards(cards)
        setColumn(column)
        if (card_id && updatedByUserId === user_id) {
          let card = document.getElementById(`card-${card_id}`)
          if (card) {
            card.select()
          }
        }
      }
    })

    socket.on('cardTextUpdated', ({ retro_id, card, cards: newCards, column_id: columnId, user_id, card_id }) => {
      if (column_id === columnId) {
        console.log('cardTextUpdated', columnId, newCards)
        setCards(newCards)
      }
    })

    return () => {
      socket.off('columnRenamed')
      socket.off('cardUpdated')
      socket.off('cardTextUpdated')
    }
  }, [column_id, user_id])

  function removeColumn() {
    console.log('del col:', retro_id, column_id)
    socket.emit('removeColumn', { retro_id, column_id })
  }

  async function updateColumnName(column_name) {
    setColumnName(column_name)
    clearTimeout(timer)
    setTimer(setTimeout(() => {
      socket.emit('renameColumn', { retro_id, column_id, column_name })
    }, 500))
  }

  function addCard(column_id) {
    socket.emit('addCard', { retro_id, column_id, user_id });
  }

  return (
    <Box
      sx={{
        m: 1,
        minWidth: 315
      }}>
      <Paper elevation={9} sx={{ width: '100%', p: 1, px: 1.3, borderRadius: '15px', border: 'solid', borderColor: '#999', borderWidth: '.1em' }} >
        <Box container sx={{ width: '100%', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <TextField fullWidth id={`column-${column_id}`} className={"columnName"} value={colName} onChange={(e) => updateColumnName(e.target.value)} sx={{
            '& fieldset': {
              borderRadius: '6px',
              borderStartStartRadius: '10px',
              boxShadow: 3,
            },

          }} InputProps={{
            inputProps: { style: { textAlign: "center", fontWeight: 'bold', fontSize: 18 } }
          }} />
          <ColumnMenu removeColumnFunc={removeColumn} addCardFunc={() => addCard(column_id)} />
        </Box>
        {column?.card_ids.map((card_id) => (<Card key={card_id} card_id={card_id} cards={cards} user={user} />))}
        <AddCardButton addCardFunc={() => addCard(column_id)} />
      </Paper>
    </Box>
  )
}