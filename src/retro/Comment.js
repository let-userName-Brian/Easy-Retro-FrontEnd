import { Button, Paper, TextField, Typography } from '@mui/material/';
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import CommentMenu from "./CommentMenu";
import { RetroContext } from "./Retro";

export default function Comment({ comment_id, comment, user_id, retro_id, user }) {

  const { comments: initComments } = useContext(RetroContext)
  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  const [timer, setTimer] = useState()

  useEffect(() => {
    let comment = initComments?.find(c => c.comment_id === comment_id)
    // console.log('comment', comment)
    if (!initComments || !comment) {
      return
    }
    setCommentText(comment.comment_text)
    setAuthor(comment.user_name)
    // setReactions(comment.reactions)
  }, [initComments, comment_id])

  useEffect(() => {
    socket.on('commentTextUpdated', ({ comment }) => {
      if (comment_id === comment.comment_id) {
        // setComment(comment);
        setCommentText(comment.comment_text)
      }
    })

    return () => {
      socket.off('commentTextUpdated')
    }
  }, [comment_id])

  async function updateCommentText(commentText) {
    setCommentText(commentText)
    clearTimeout(timer)
    setTimer(setTimeout(() => {
      socket.emit('changeCommentText', { comment_id, commentText })
    }, 500))
  }

  function removeComment() {
    let card_id = comment.card_id
    console.log('removeComment:', comment_id, card_id)
    socket.emit('removeColumn', { comment_id, card_id })
  }

  // //send to Dustin--------------------------------------------------------------------
  // function removeCommentFunc() {
  //   console.log('remove comment id:', comment_id)
  //   //socket.emit('removeComment', { comment_id })
  // }

  // //submit comment to backend for DUSTINNNNN--------------------------------------------------------------------
  // function submitCommentFunc() {
  //   console.log('submit comment id:', comment_id)
  //   //socket.emit('submitComment', { card_id, comment_text: commentText, user_id })
  // }

  //coment Id will be sent back from DB after initialization of comments
  //we need where user Id and comment ID match.....set that as Author



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
    <Paper variant="outlined" sx={{ m: 1, p: 1, borderRadius: '15px' }} >
      <Typography variant='h5'> Comment ID: {comment_id}</Typography>
      <TextField fullWidth multiline id="commentText" value={commentText} onChange={(e) => updateCommentText(e.target.value)} sx={{ my: 1 }} />
      <Box>
        <Typography >Author: {author}</Typography>
        <CommentMenu removeCommentFunc={removeComment} />
      </Box>
    </Paper>
  )
}