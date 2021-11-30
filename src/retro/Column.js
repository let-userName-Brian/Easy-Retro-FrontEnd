import { useEffect, useState, useContext } from "react"
import { socket } from "../SocketClient"
import { Box, Paper, Icon, TextField, Skeleton, IconButton } from '@mui/material/';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { RetroContext } from './Retro'
import Card from "./Card"
import AddCardButton from './AddCardButton'

export default function Column({ col }) {
  const { cards: retroCards, retro, userId } = useContext(RetroContext)
  const [column, setColumn] = useState()
  const [cards, setCards] = useState()
  const [colName, setColName] = useState()

  useEffect(() => {
    if (!col) return;
    setColumn(col)
    setColName(col.column_name)
  }, [col])

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

  async function submitColumnNameChange() {
    let retro_id = retro.retro_id;
    let column_id = column.column_id
    console.log('retro_id: ', retro_id)
    console.log('column_id: ', column_id)
    console.log('colName: ', colName)
    socket.emit('columnRenamed', { retro_id, column_id, colName })
  }

  // function removeColumn() {
  //   let column_id = column.column_id;

  // }

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
        <Box container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          {column ? (
            <>
              <TextField fullWidth label={colName} id="columnName" value={colName} onChange={(e) => setColName(e.target.value)} onBlur={submitColumnNameChange} sx={{ my: 1 }} InputProps={{
                inputProps: { style: { textAlign: "center" } }
              }} />
              <Box>
                <IconButton
                  aria-label="remove element"
                // onClick={(e) => removeColumn()}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Box></>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </Box>
        {cards?.map((card) => (<Card key={card.card_id} c={card} />))}
        <AddCardButton addCardFunc={addCard}/>
      </Paper>
    </Box>
  )
}