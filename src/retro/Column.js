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
  const [colName, setColName] = useState()
  const [retro_id, setRetroId] = useState()

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
    setColName(col.column_name)
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
        setColName(column.column_name)
      }
    })

    // Received when the server sends us a card update
    socket.on('cardUpdated', ({ cards, column }) => {
      if (column.column_id === column_id) {
        console.log('cardUpdated', cards, column)
        setCards(cards)
        setColumn(column)
      }
    })

    return () => {
      socket.off('columnRenamed')
      socket.off('cardUpdated')
    }
  }, [column_id])

  function removeColumn() {
    console.log('del col:', retro_id, column_id)
    socket.emit('removeColumn', { retro_id, column_id })
  }

  function renameColumn() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id
    socket.emit('renameColumn', { retro_id, column_id, column_name: colName })
  }

  function addCard(column_id) {
    socket.emit('addCard', { retro_id, column_id, user_id });
  }

  if (!column) {
    return <>Loading Column</>
  }

  return (
    <Box
      sx={{
        m: 1,
        minWidth: 300
      }}>
      <Paper elevation={12} sx={{ width: '100%', p: 1, borderRadius: '20px', border: 'solid', borderColor: 'black' }} >
        <Box container sx={{ width: '100%', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <TextField fullWidth className={"columnName"} value={colName} onChange={(e) => setColName(e.target.value)} onBlur={renameColumn} sx={{
            '& fieldset': {
              borderRadius: '6px',
              borderStartStartRadius: '10px',
              boxShadow: 3
            }
          }} InputProps={{
            inputProps: { style: { textAlign: "center" } }
          }} />
          <ColumnMenu removeColumnFunc={removeColumn} />
        </Box>
        {column.card_ids.map((card_id) => (<Card key={card_id} card_id={card_id} cards={cards} user={user} />))}
        <AddCardButton addCardFunc={() => addCard(column_id)} />
      </Paper>
    </Box>
  )
}