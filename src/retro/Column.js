import { useEffect, useState, useContext } from "react"
import { socket } from "../SocketClient"
import Card from "./Card"
import { RetroContext } from './Retro'
import { Box, Paper, Icon, TextField } from '@mui/material/';
// import Typography from "@mui/material/Typography";


export default function Column({ column_id }) {
  const { columns, retro, userId } = useContext(RetroContext)
  const [cards, setCards] = useState([])
  const [columnName, setColumnName] = useState('')
  const [columnCardIds, setColumnCardIds] = useState([])
  const { cards: initCards, columns: initColumns } = useContext(RetroContext)

  useEffect(() => {
    // Received when the server sends us a card update
    socket.on('cardUpdated', (cards) => setCards(cards))
    //   socket.on('updatedColumnName', (column) => {
    //     if (column.column_id === column_id) {
    //       setColumnName(column.column_name)
    //     }
    //   })
    //   socket.on('updatedColumnCardIds', (column) => {
    //     if (column.column_id === column_id) {
    //       setColumnCardIds(column.card_ids)
    //     }
    //   })
    return () => {
      socket.removeAllListeners('cardUpdated')

      //     socket.removeAllListeners('updatedColumnName')
      //     socket.removeAllListeners('updatedColumnCardIds')
    }
  }, [column_id, setCards])

  useEffect(() => { setColumnName(columns.find(column => column.column_id === column_id)?.column_name || 'unknown col name') }, [columns, column_id])

  useEffect(() => { setColumnCardIds(initColumns.find(col => col.column_id === column_id)?.card_ids) }, [initColumns, column_id])

  //needs init cards refactored. or must remove listener columnCardIds
  useEffect(() => { setCards(initCards.filter(card => columnCardIds?.includes(card.card_id))) }, [initCards, columnCardIds])

  function addCard() {
    let retro_id = retro.retro_id;
    socket.emit('cardAdded', { retro_id, column_id, userId });
  }

  return (
    <>
      <Box
        sx={{
          m: 1,
          width: "30vw",
          height: "90vh"
        }}>
        <Paper elevation={12} sx={{ p: 1 }} >
          <Box container sx={{ textAlign: 'center' }}>
            <TextField fullWidth label={columnName} id="columnName" InputProps={{
              inputProps: { style: { textAlign: "center" } }
            }} />
            {/* <Typography variant='h5'>{columnName}</Typography> */}
            <Icon sx={{}} onClick={() => { addCard() }}>add_circle</Icon>
          </Box>
          {cards.map((card) => (
            <Card card_id={card.card_id} key={card.card_id} />
          ))}
        </Paper>
      </Box>
    </>
  )
}