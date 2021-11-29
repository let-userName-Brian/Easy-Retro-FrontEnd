import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography, TextField } from '@mui/material/';
import { socket } from "../SocketClient"


export default function Card({ c }) {
  const { comments: initComments } = useContext(RetroContext)
  const [card, setCard] = useState(c)
  const [cardText, setCardText] = useState(card.card_text)
  const [author, setAuthor] = useState(card.user_id)//needs to be converted to user_name
  const [votes, setVotes] = useState([])//fix this, card.votes
  const [comments, setComments] = useState(initComments.filter(comment => comment.card_id === card.card_id))

  return (
    <Box
      sx={{
        m: 1,
        width: "95%",
        height: "30"
      }}>
      <Paper elevation={3} sx={{ m: 1, p: 1 }}>
        <TextField fullWidth label={card?.card_text} id="cardText" InputProps={{
          inputProps: { style: { textAlign: "center" } }
        }} />
        <Typography>Author: {author}</Typography>
        <Typography>Votes: {votes.length}</Typography>
        {comments.map((comment) => (<Comment key={comment.comment_id} comment={comment} />))}
      </Paper>
    </Box>
  )
}