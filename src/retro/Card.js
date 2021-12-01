import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography, TextField, Button } from '@mui/material/';
import { socket } from "../SocketClient"
import { borderRadius } from "@mui/system";
import RecommendIcon from '@mui/icons-material/Recommend';



export default function Card({ card_id, cards }) {
  const { comments: initComments, user_id, userVotes, setUserVotes } = useContext(RetroContext)
  const [card, setCard] = useState()
  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState()//needs to be converted to user_name
  const [cardVotes, setCardVotes] = useState([])
  const [voted, setVoted] = useState(false)
  const [comments, setComments] = useState([])

  //console.log("userVotes", userVotes ) // set from the context of the payload @ max_votes

  useEffect(() => {
    let newCard = cards?.find(card => card.card_id === card_id)
    if (!newCard) return;
    setCard(newCard)
    setCardText(newCard.card_text)
    setAuthor(newCard.user_name)
  }, [cards, card_id]);

  useEffect(() => {
    socket.on('cardTextUpdated', ({ card }) => {
      if (card_id === card.card_id) {
        setCard(card);
        setCardText(card.card_text)
      }
    })

    socket.on('votesChanged', ({ card_id, vote_type }) => {
      if (card_id === card.card_id) {
        setCardVotes(cardVotes)
      }
    })
    return () => {
      socket.off('cardTextUpdated')
      socket.off('votesChanged')
    }
  }, [])

  useEffect(() => {
    if (initComments) {
      setComments(initComments.filter(comment => comment.card_id === card_id))
    }
  }, [initComments])

  //console.log('cardVotes', cardVotes)
  function submitCardTextChange() {
    socket.emit('changeCardText', { card_id, card_text: cardText })
  }

  //add vote to card
  const addVote = () => {
    if (userVotes > 0) {
      console.log("vote up")
      socket.emit('addVote', { card_id: card.card_id, vote_type: 'up', user_id })
      setVoted(true)
      setCardVotes(cardVotes.concat({ user_id, vote_type: 'up' }))
      setUserVotes(userVotes - 1)
    }
  }

  //remove vote from card
  const removeVote = () => {
    console.log("vote down")
    socket.emit('removeVote', { card_id: card.card_id, vote_type: 'up', user_id })
    setVoted(false)
    setCardVotes(cardVotes.filter(v => v.user_id !== user_id))
    setUserVotes(userVotes + 1)
  }


  return (
    <Box
      sx={{
        m: 1,
        width: "95%",
        height: "30",
        display: 'flex',
        borderRadius: '10',
      }}>
      <Paper elevation={3} sx={{ m: 1, p: 1 }}>
        <div>card id: {card_id}</div>
        <TextField fullWidth label={cardText} id="cardText" value={cardText} onChange={(e) => setCardText(e.target.value)} onBlur={submitCardTextChange} sx={{ my: 1 }}
        />
        <Box sx={{ m: 1 }}>
          <Typography>-{author}</Typography>
          {userVotes === 0
            ? <Typography >Voting isn't enabled</Typography>
            : <Typography >Votes: {cardVotes.length}
              {voted
                ? <Button onClick={() => removeVote()}>Vote cast! Remove?</Button>
                : <Button onClick={() => addVote()}><RecommendIcon /></Button>
              }
            </Typography>}
          {comments?.map((comment) => (<Comment key={comment.comment_id} comment_id={comment.comment_id} comment={comment} />))}
        </Box>
      </Paper>
    </Box>
  )
}