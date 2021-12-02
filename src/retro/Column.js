import { Box, Paper, TextField } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import AddCardButton from './AddCardButton';
import Card from "./Card";
import ColumnMenu from './ColumnMenu';
import { RetroContext } from './Retro';

export default function Column({ column_id, user }) {
  const { cards: initCards, columns: initColumns, retro, user_id } = useContext(RetroContext)
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()
  const [colName, setColName] = useState()
  const [retro_id, setRetroId] = useState()

  useEffect(() => {
    // Received when the server sends us a name update
    socket.on('columnNameUpdated', ({ column }) => {
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
      socket.off('columnNameUpdated')
      socket.off('cardUpdated')
    }
  }, [column_id])


  useEffect(() => {
    if (!column_id) return
    if (initColumns.length === 0) return
    let col = initColumns.find(column => column.column_id === column_id)
    if (!col) return
    setColumn(col)
    setColName(col.column_name)
  }, [initColumns, column_id])

  useEffect(() => {
    if (!retro) return;
    setRetroId(retro.retro_id)
  }, [retro])

  function submitColumnNameChange() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id
    socket.emit('columnRenamed', { retro_id, column_id, column_name: colName })
  }

  useEffect(() => {
    if (!column) return
    if (!initCards) return
    //initialize cards from context
    setCards(initCards?.filter(card => column?.card_ids.includes(card.card_id)))
  }, [column, initCards])

  function removeColumn() {
    console.log('del col:', retro_id, column_id)
    socket.emit('columnDeleted', { retro_id, column_id })
  }

  function addCard(column_id) {
    socket.emit('cardAdded', { retro_id, column_id, user_id });
  }

  if (!column) {
    return <>Loading Column</>
  }

  return (
    <Box
      sx={{
        m: 1
      }}>
      <Paper elevation={12} sx={{ p: 1, borderRadius: '20px' }} >
        <Box container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <TextField fullWidth label={colName} id="columnName" value={colName} onChange={(e) => setColName(e.target.value)} onBlur={submitColumnNameChange} sx={{ my: 1 }} InputProps={{
            inputProps: { style: { textAlign: "center" } }
          }} />
          <Box>
            <ColumnMenu removeColumnFunc={removeColumn} />
          </Box>
        </Box>
        {column.card_ids.map((card_id) => (<Card key={card_id} card_id={card_id} cards={cards} user={user} />))}
        <AddCardButton addCardFunc={() => addCard(column_id)} />
      </Paper>
    </Box>
  )
}