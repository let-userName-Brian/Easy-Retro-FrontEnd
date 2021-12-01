import { Box, Paper, Skeleton, TextField } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import AddCardButton from './AddCardButton';
import Card from "./Card";
import ColumnMenu from './ColumnMenu';
import { RetroContext } from './Retro';

export default function Column({ col, column_id }) {
  const { cards: retroCards, columns: retroColumns, retro, user_id } = useContext(RetroContext)
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()
  const [colName, setColName] = useState()
  const [retro_id, setRetroId] = useState()


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
    socket.emit('columnRenamed', { retro_id, column_id, colName })
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

  useEffect(() => {
    // Received when the server sends us a card update
    socket.on('cardUpdated', ({ cards, column }) => {
      if (column.column_id === column_id) {
        console.log('card updated?', cards,)
        console.log('column Updated??????', column)
        setColumn(column)
        setCards(cards)
      }
    })

    //initialize cards from context
    setCards(retroCards?.filter(card => column?.card_ids.includes(card.card_id)))

    return () => {
      socket.removeAllListeners('cardUpdated')
    }
  }, [column, retroCards])

  function removeColumn() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id;
    console.log('del col:', retro_id, column_id)
    socket.emit('columnDeleted', { retro_id, column_id })
  }


  //our issue is in here-------
  function addCard() {
    // let retro_id = retro.retro_id;
    let column_id = column.column_id;
    socket.emit('cardAdded', { retro_id, column_id, user_id });
  }


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
        {column?.card_ids.map((card_id) => (<Card key={card_id} card_id={card_id} cards={cards} />))}
        <AddCardButton addCardFunc={addCard} />
      </Paper>
    </Box>
  )
}