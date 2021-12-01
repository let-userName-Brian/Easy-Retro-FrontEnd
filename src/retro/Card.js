import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import Comment from './Comment'
import { Box, Paper, Typography, TextField, Button } from '@mui/material/';
import { socket } from "../SocketClient"
import RecommendIcon from '@mui/icons-material/Recommend';



export default function Card({ card_id, cards, user }) {
  const { comments: initComments, user_id, userVotes, setUserVotes } = useContext(RetroContext)
  const [card, setCard] = useState()
  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState()//needs to be converted to user_name
  const [cardVotes, setCardVotes] = useState([])
  const [voted, setVoted] = useState(false)
  const [comments, setComments] = useState([])


  useEffect(() => {
    if (!cards) return;
    if (cards.length === 0) return;
    if (!card_id) return;
    // console.log('cards', cards)
    let newCard = cards.find(card => card.card_id === card_id)
    if (!newCard) return;
    setCard(newCard)
    setCardText(newCard.card_text)
    setAuthor(newCard.user_name)
  }, [cards, card_id]);


  useEffect(() => {
    socket.on('votesChanged', ({ card_id, vote_type }) => {
      if (card_id === card.card_id) {
        setCardVotes(vote_type)
      }
    })
    return () => {
      socket.off('votesChanged')
    }
  }, [])

  useEffect(() => {
    if (initComments) {
      setComments(initComments.filter(comment => comment.card_id === card_id))
    }
  }, [initComments])


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
    // console.log("vote down", card_id, user_id, cardVotes)
    socket.emit('removeVote', { card_id: card.card_id, vote_type: 'up', user_id })
    setVoted(false)
    setCardVotes(cardVotes.filter(v => v.user_id !== user_id))
    setUserVotes(userVotes + 1)
  }


  //add comment to card
  const addComment = () => {
    setComments(comments.concat({ card_id: card.card_id, comment_text: cardText, user_id }))
  }

console.log('comments', comments)

  return (
    <Box
      sx={{
        m: 1,
        width: "95%",
        height: "30",
        display: 'flex',
        borderRadius: '10',
      }}>
      <Paper elevation={3} sx={{ m: 1, p: 1, borderRadius: '15px', border: 'solid', borderColor: '#90caf9'  }}>
        <TextField fullWidth label={cardText} id="cardText" InputProps={{
          inputProps: { style: { textAlign: "center" } }
        }} />
        <Box sx={{ m: 1 }}>
          <Typography>-{author}</Typography>
          {userVotes === 0
            ? <>Your votes have been cast!</>
            : <Typography >Votes: {cardVotes.length}
              {voted
                ? <Button onClick={() => removeVote()}>Vote cast! Remove?</Button>
                : <Button onClick={() => addVote()}><RecommendIcon /></Button>
              }
            </Typography>}
          <Box>
              <Button onClick={() => addComment()}>Add Comment</Button>
          </Box>
          {comments?.map((comment, index) => (<Comment key={comment.comment_id} comment_id={comment.comment_id} comment={comment} index={index} user={user}/>))}
        </Box>
      </Paper>
    </Box>
  )
}
