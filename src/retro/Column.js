import { Box, Paper, Skeleton, TextField } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import AddCardButton from './AddCardButton';
import Card from "./Card";
import ColumnMenu from './ColumnMenu';
import { RetroContext } from './Retro';

export default function Column({ col }) {
  const { cards: retroCards, columns: retroColumns, retro, user_id } = useContext(RetroContext)
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()
  const [colName, setColName] = useState()
  const [retroId, setRetroId] = useState()


  useEffect(() => {
    if (!col) return;
    setColumn(col)
    setColName(col.column_name)
  }, [col])

  useEffect(() => {
    if (!retro) return;
    setRetroId(retro.retro_id)
  }, [])

  function submitColumnNameChange() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id
    socket.emit('columnRenamed', { retroId, column_id, colName })
  }

  useEffect(() => {
    socket.on('columnNameUpdated', ({ column_id, newName }) => {
      console.log('newName in UseEffect:', newName)
      if (column_id === column.column_id) {
        setColumn({ ...column, column_name: newName });
        setColName(newName)
      }
    })
    return () => {
      socket.removeAllListeners('columnNameUpdated')
    }
  }, [column])

  function removeColumn() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id;
    console.log('del col:', retroId, column_id)
    socket.emit('columnDeleted', { retroId, column_id })
  }

  function addCard() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id;
    socket.emit('cardAdded', { retroId, column_id, user_id });
  }

  useEffect(() => {
    // Received when the server sends us a card update
    socket.on('cardUpdated', ({ cards, card_ids, column_id }) => {
      if (column_id === column.column_id) {
        setColumn({ ...column, card_ids })
        setCards(cards)
      }
    })

    //initialize cards from context
    setCards(retroCards?.filter(card => column?.card_ids.includes(card.card_id)))

    return () => {
      socket.removeAllListeners('cardUpdated')
    }
  }, [column, retroCards])

  return (
    <Box
      sx={{
        m: 1,
        width: "30vw",
        height: "90vh"
      }}>
      <Paper elevation={12} sx={{ p: 1 }} >
        <Box container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          {column ? (
            <>
              <TextField fullWidth label={colName} id="columnName" value={colName} onChange={(e) => setColName(e.target.value)} onBlur={submitColumnNameChange} sx={{ my: 1 }} InputProps={{
                inputProps: { style: { textAlign: "center" } }
              }} />
              <Box>
                <ColumnMenu removeColumnFunc={removeColumn} />
              </Box></>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </Box>
        {cards?.map((card) => (<Card key={card.card_id} c={card} />))}
        <AddCardButton addCardFunc={addCard} />
      </Paper>
    </Box>
  )
}