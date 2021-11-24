import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography } from '@mui/material/';


export default function Card({ card_id }) {

  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState('')
  const [votes, setVotes] = useState([])
  const [comments, setComments] = useState([])
  const { cards: initCards, comments: initComments } = useContext(RetroContext)


  // useEffect(() => {
  //     // Received when the server sends us a card
  //     socket.on('receivedCards', (cards) => setCards(cards))
  //     socket.on('updatedColumnName', (column) => {
  //       if (column.column_id === column_id) {
  //         setColumnName(column.column_name)
  //       }})
  //       socket.on('updatedColumnCardIds', (column) => {
  //         if (column.column_id === column_id) {
  //           setColumnCardIds(column.card_ids)
  //     }})
  //   }, [column_id])

  useEffect(() => {
    let thisCard = initCards?.find(c => c.card_id === card_id)
    if (!thisCard) {
      return
    }
    setCardText(thisCard.card_text)
    setAuthor(thisCard.user_name)
    setVotes(thisCard.votes)
  }, [initCards])

  useEffect(() => {
    if (!initComments) {
      return
    }
    setComments(initComments.filter(com => com.card_id === card_id))
  }, [initComments])

  return (
    <Box
      sx={{
        m: 1,
        width: "95%",
        height: "30"
      }}>
      <Paper elevation={3} sx={{ m: 1, p: 1 }}>
        <Typography>{cardText}</Typography>
        <Typography>Author: {author}</Typography>
        <Typography>Votes: {votes.length}</Typography>
        {comments.map((comment) => (
          <Comment comment_id={comment.comment_id} key={comment.comment_id} />
        ))}
      </Paper>
    </Box>
  )
}
// need card ID from column where column ID = card ID
// pass in column ID as props
// make call to take all of the cards that are in this column