import RecommendIcon from '@mui/icons-material/Recommend';
import { Box, Button, Paper, Stack, TextField, Typography, Tooltip, IconButton } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import UserAvatar from '../UserAvatar';
import Comment from './Comment';
import { RetroContext } from "./Retro";
import Bounce from 'react-reveal/Bounce';

export default function Card({ cards, card_id, user }) {// cards,
  const { cards: initCards, comments: initComments, user_id, userVotes, setUserVotes } = useContext(RetroContext)
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
    if (initComments) {
      setComments(initComments.filter(comment => comment.card_id === card_id))
    }
  }, [initComments, card_id])

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

    //does not yet use setCard since card is new card on line 20/initialization useEffect
    socket.on('commentUpdated', ({ card, comments }) => {
      if (card_id === card.card_id) {
        setComments(comments)
      }
    })

    return () => {
      socket.off('cardTextUpdated')
      socket.off('votesChanged')
      socket.off('commentUpdated')
    }
  }, [card_id])//comments?

  //console.log('cardVotes', cardVotes)
  function changeCardText() {
    socket.emit('changeCardText', { card_id, card_text: cardText })
  }

  function addComment(card_id, user_id) {
    console.log('addComment emit: ', card_id, user_id)
    socket.emit('addComment', { card_id, user_id });
  }

  //broken local only - add comment to card
  // const addComment = () => {
  //   setComments(comments.concat({ card_id, comment_text: cardText, user_id }))
  // }

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

  //just here for strucrture reference
  // function removeColumn() {
  //   console.log('del col:', retro_id, column_id)
  //   socket.emit('removeColumn', { retro_id, column_id })
  // }

  // function renameColumn() {
  //   // let retro_id = retro.retro_id;
  //   let column_id = column.column_id
  //   socket.emit('renameColumn', { retro_id, column_id, column_name: colName })
  // }

  // function addCard(column_id) {
  //   socket.emit('addCard', { retro_id, column_id, user_id });
  // }

  //do we need this?
  // if (!column) {
  //   return <>Loading Column</>
  // }

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        borderRadius: '10',
      }}>
         <Bounce bottom>
      <Paper elevation={3} sx={{ width: '100%', my: 1, p: 1, borderRadius: '15px', border: 'solid', borderColor: '#90caf9' }}>
        <TextField fullWidth multiline id="cardText" value={cardText} onChange={(e) => setCardText(e.target.value)} onBlur={changeCardText} sx={{ my: 1 }}
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
