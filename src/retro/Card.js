import RecommendIcon from '@mui/icons-material/Recommend';
import { Box, Button, Paper, Stack, TextField, Typography, Tooltip, IconButton } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import UserAvatar from '../UserAvatar';
import Comment from './Comment';
import { RetroContext } from "./Retro";
import Bounce from 'react-reveal/Bounce';

export default function Card({ card_id, cards, user }) {

  const { comments: initComments, user_id, userVotes, setUserVotes } = useContext(RetroContext)
  // const [card, setCard] = useState()
  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState()//needs to be converted to user_name
  const [cardVotes, setCardVotes] = useState([])
  const [voted, setVoted] = useState(false)
  const [comments, setComments] = useState([])


  useEffect(() => {
    let newCard = cards?.find(card => card.card_id === card_id)
    if (!newCard) return;
    // setCard(newCard)
    setCardText(newCard.card_text)
    setAuthor(newCard.user_name)
    setCardVotes(newCard.votes)
    setVoted(newCard.votes.some(vote => vote.user_id === user_id))
  }, [cards, card_id, user_id]);

  useEffect(() => {
    socket.on('cardTextUpdated', ({ card }) => {
      if (card_id === card.card_id) {
        // setCard(card);
        setCardText(card.card_text)
      }
    })

    socket.on('votesChanged', ({ card_id: id, votes }) => {
      if (card_id === id) {
        setCardVotes(votes)
      }
    })
    return () => {
      socket.off('cardTextUpdated')
      socket.off('votesChanged')
    }
  }, [card_id])

  useEffect(() => {
    if (initComments) {
      setComments(initComments.filter(comment => comment.card_id === card_id))
    }
  }, [initComments, card_id])

  //console.log('cardVotes', cardVotes)
  function submitCardTextChange() {
    socket.emit('changeCardText', { card_id, card_text: cardText })
  }

  //add vote to card
  const addVote = () => {
    if (userVotes > 0) {
      socket.emit('addVote', { card_id, vote_type: 'up', user_id })
      setVoted(true)
      setCardVotes(cardVotes.concat({ user_id, vote_type: 'up' }))
      setUserVotes(userVotes - 1)
    }
  }

  //remove vote from card
  const removeVote = () => {
    // console.log("vote down", card_id, user_id, cardVotes)
    socket.emit('removeVote', { card_id, vote_type: 'up', user_id })
    setVoted(false)
    setCardVotes(cardVotes.filter(v => v.user_id !== user_id))
    setUserVotes(userVotes + 1)
  }


  //add comment to card
  const addComment = () => {
    setComments(comments.concat({ card_id, comment_text: cardText, user_id }))
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        borderRadius: '10',
      }}>
         <Bounce bottom>
      <Paper elevation={3} sx={{ width: '100%', my: 1, p: 1, borderRadius: '15px', border: 'solid', borderColor: '#90caf9' }}>
        <TextField fullWidth multiline id="cardText" value={cardText} onChange={(e) => setCardText(e.target.value)} onBlur={submitCardTextChange} sx={{ my: 1 }}
        />
        <Box sx={{ m: 1 }}>
          <Stack direction='row' justifyContent="space-between" alignItems='center'>
            <Tooltip title={author || ''}><IconButton><UserAvatar user_name={author || ''} size={30} /></IconButton></Tooltip>
            <Button onClick={() => addComment()}>Add Comment</Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography >{cardVotes.length}</Typography>
              <Button
                disabled={(!voted && userVotes < 1)}
                onClick={() => voted ? removeVote() : addVote()}
                sx={{ minWidth: 30, width: 30, height: 30, p: 0, borderRadius: '16px' }}>
                <RecommendIcon style={{ width: 30, height: 30, fill: (voted ? "orange" : null) }} />
              </Button>
            </Box>
          </Stack>
          {comments?.map((comment, index) => (<Comment key={index} comment_id={comment.comment_id} comment={comment} index={index} user={user} />))}
        </Box>
      </Paper >
      </Bounce>
    </Box >
  )
}
