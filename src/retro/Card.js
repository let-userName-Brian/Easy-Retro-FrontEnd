import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography } from '@mui/material/';
import { socket } from "../SocketClient"


export default function Card({ card_id }) {
  const [cards, setCards] = useState()
  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState('')
  const [votes, setVotes] = useState([])
  const [comments, setComments] = useState([])
  const { cards: initCards, comments: initComments } = useContext(RetroContext)


  // useEffect(() => {
  // }, [])

  useEffect(() => {
    let thisCard = initCards?.find(c => c.card_id === card_id)
    if (!thisCard) {
      return
    }
    setCardText(thisCard.card_text)
    setAuthor(thisCard.user_name)
    setVotes(thisCard.votes)
  }, [initCards, card_id])

  useEffect(() => {
    if (!initComments) {
      return
    }
    setComments(initComments.filter(com => com.card_id === card_id))
  }, [initComments, card_id])

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