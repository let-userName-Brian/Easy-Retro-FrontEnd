import { Box, Paper, TextField } from '@mui/material/';
import { useCallback, useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import AddCardButton from './AddCardButton';
import Card from "./Card";
import ColumnMenu from './ColumnMenu';
import { RetroContext } from './Retro';

export default function Column({ column_id, user }) {
  const { retro_id, columns: initColumns, cards: initCards, user_id } = useContext(RetroContext)//user_id with prop user?
  const [cardIds, setCardIds] = useState([])
  const [cards, setCards] = useState()
  const [colName, setColumnName] = useState('')
  const [timer, setTimer] = useState()

  const handleColumnRenamed = useCallback(({ column }) => {
    if (column.column_id === column_id) {
      setColumnName(column.column_name)
    }
  }, [column_id])

  const handleCardUpdated = useCallback(({ cards, column, user_id: updatedByUserId, card_id }) => {
    if (column.column_id === column_id) {
      setCards(cards)
      setCardIds(column.card_ids)
      if (card_id && updatedByUserId === user_id) {
        let card = document.getElementById(`card-${card_id}`)
        if (card) {
          card.select()
        }
      }
    }
  }, [column_id, user_id])

  const handleCardTextUpdated = useCallback(({ retro_id, card, cards: newCards, column_id: columnId, user_id, card_id }) => {
    if (column_id === columnId) {
      setCards(newCards)
    }
  }, [column_id])

  useEffect(() => {
    if (!initColumns) return
    if (!initCards) return
    //initialize cards from context
    let col = initColumns.find(column => column.column_id === column_id)
    if (!col) {
      return
    }
    setColumnName(col.column_name)
    setCardIds(col.card_ids)
    setCards(initCards.filter(card => col.card_ids.includes(card.card_id)))
  }, [initColumns, initCards, column_id])

  useEffect(() => {
    socket.on('columnRenamed', handleColumnRenamed)
    socket.on('cardUpdated', handleCardUpdated)
    socket.on('cardTextUpdated', handleCardTextUpdated)

    return () => {
      socket.off('columnRenamed', handleColumnRenamed)
      socket.off('cardUpdated', handleCardUpdated)
      socket.off('cardTextUpdated', handleCardTextUpdated)
    }
  }, [handleColumnRenamed, handleCardUpdated, handleCardTextUpdated])

  function removeColumn() {
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
        {cardIds.map((card_id) => (<Card key={card_id} card_id={card_id} cards={cards} user={user} />))}
        <AddCardButton addCardFunc={() => addCard(column_id)} />
      </Paper>
    </Box>
  )
}