import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography, TextField, Button } from '@mui/material/';
import { socket } from "../SocketClient"
import { borderRadius } from "@mui/system";
import RecommendIcon from '@mui/icons-material/Recommend';



export default function Card({ c }) {
  const { comments: initComments, vote_type, user_id } = useContext(RetroContext)
  const [card, setCard] = useState(c)
  const [cardText, setCardText] = useState(card.card_text)
  const [author, setAuthor] = useState(card.user_name)//needs to be converted to user_name
  const [cardVotes, setCardVotes] = useState([]) 
  const [comments, setComments] = useState(initComments.filter(comment => comment.card_id === card.card_id))
  const [voted, setVoted] = useState(false)

  //console.log("vote_type", vote_type) -------dustin is going to send me the user votes 
 //console.log("userVotes", userVotes )


useEffect(() => {
  socket.on('votesChanged', ({card_id, vote_type}) => {
    if(card_id === card.card_id) {
    setCardVotes(cardVotes)
    }
  })
  }, [])

  console.log('cardVotes', cardVotes)

//if max votes exceded no more voting 


//add vote to card
  const addVote = (vote_type) => {
    console.log("vote", vote_type)
    socket.emit('addVote', { card_id: card.card_id, vote_type, user_id }) 
    setVoted(true)
    setCardVotes(cardVotes.concat(vote_type))
  }

  //remove vote from card
  const removeVote = (vote_type) => {
    console.log("vote", vote_type)
    socket.emit('removeVote', { card_id: card.card_id, vote_type, user_id })
    setVoted(false)
    setCardVotes(cardVotes.filter(v => v !== vote_type))
  }
  

  return (
    <Box
      sx={{
        m: 1,
        width: "95%",
        height: "30",
        display: 'flex',
        borderRadius: '10',
        hover: {
          bg: 'white',
          cursor: 'pointer'
        }
      }}>
      <Paper elevation={3} sx={{ m: 1, p: 1 }}>
        <TextField fullWidth label={card?.card_text} id="cardText" InputProps={{
          inputProps: { style: { textAlign: "center" } }
        }} />
        <Box sx={{ m: 1 }}>
        <Typography variant='h6'>Author: {author}</Typography>
        <Typography >Votes: {cardVotes.length}
          {voted  
          ? <Button onClick={() => removeVote(card.card_id)}>Vote cast! Remove?</Button> 
          : <Button onClick={() => addVote(card.card_id)}><RecommendIcon /></Button>
          }
        </Typography>
        {comments.map((comment) => (<Comment key={comment.comment_id} comment={comment} />))}
        </Box>
      </Paper>
    </Box>
  )
}