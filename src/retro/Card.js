import RecommendIcon from '@mui/icons-material/Recommend';
import { Box, Button, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material/';
import { useContext, useEffect, useState } from "react";
import Bounce from 'react-reveal/Bounce';
import { socket } from "../SocketClient";
import UserAvatar from '../UserAvatar';
import Comment from './Comment';
import { RetroContext } from "./Retro";
import CardMenu from './CardMenu';
import CommentIcon from '@mui/icons-material/Comment';

export default function Card({ cards, card_id, user }) {// cards,
  const { cards: initCards, comments: initComments, user_id, userVotes, setUserVotes } = useContext(RetroContext)
  // const [card, setCard] = useState()
  const [cardText, setCardText] = useState('')
  const [author, setAuthor] = useState()//needs to be converted to user_name
  const [cardVotes, setCardVotes] = useState([])
  const [voted, setVoted] = useState(false)
  const [comments, setComments] = useState([])
  const [renderComments, setRenderComments] = useState(false)

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
    socket.on('commentUpdated', ({ card, comments, user_id, comment_id }) => {
      if (card_id === card.card_id) {
        console.log('commentUpdated', card, comments)
        setComments(comments)

        if (user_id && comment_id) {
          document.getElementById(`comment-${comment_id}`).select()
        }
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

  function removeCard() {
    socket.emit('removeCard', { card_id })
  }

  function addComment() {
    console.log('addComment emit: ', card_id, user_id)
    socket.emit('addComment', { card_id, user_id });
  }

  function toggleComments() {
    setRenderComments(!renderComments)
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

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        borderRadius: '10',
        '.react-reveal': { width: "100%" }
      }}>
      <Bounce bottom>
        <Paper sx={{ width: '100%', my: 1, p: 1, borderRadius: '10px', border: 'solid', borderWidth: '1px', borderColor: 'rgb(144 202 249 / 40%)', boxShadow: "0px 4px 5px -2px rgb(144 202 249 / 14%), 0px 7px 10px 1px rgb(144 202 249 / 14%), 0px 2px 16px 1px rgb(144 202 249 / 14%)" }}>

          <TextField fullWidth multiline id={`card-${card_id}`} value={cardText} onChange={(e) => setCardText(e.target.value)} onBlur={changeCardText} sx={{ mb: 1 }}
          />
          <Box sx={{ m: 1 }}>
            <Stack direction='row' justifyContent="space-between" alignItems='center'>
              <Box>
                <Tooltip title={author || ''}><IconButton><UserAvatar user_name={author || ''} size={30} /></IconButton></Tooltip>
              </Box>
              <Stack direction='row' alignItems='center' spacing={.5}>
                <Typography >{cardVotes.length}</Typography>
                <Button
                  disabled={(!voted && userVotes < 1)}
                  onClick={() => voted ? removeVote() : addVote()}
                  sx={{ minWidth: 30, width: 30, height: 30, p: 0, borderRadius: '16px' }}>
                  <RecommendIcon style={{ width: 30, height: 30, fill: (voted ? "orange" : null) }} />
                </Button>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={.5}>
                <Typography >{comments.length}</Typography>
                <Button
                  onClick={() => toggleComments()}
                  sx={{ minWidth: 30, width: 30, height: 30, p: 0, borderRadius: '16px' }}>
                  <CommentIcon style={{ width: 30, height: 30, fill: (renderComments ? "orange" : null) }} />
                </Button>
              </Stack>
              <Box>
                <CardMenu removeCardFunc={removeCard} />
              </Box>
            </Stack>
            {renderComments &&
              <>{comments?.map((comment, index) => (<Comment key={index} comment_id={comment.comment_id} comment={comment} index={index} user={user} />))}
                <Stack direction='row' justifyContent="center" alignItems='center'>
                  <Button onClick={() => addComment()} sx={{ mx: 'auto', mt: 2 }}>Add Comment</Button>
                </Stack></>
            }
          </Box>
        </Paper >
      </Bounce>
    </Box >
  )
}
