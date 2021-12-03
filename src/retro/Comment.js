import { IconButton, Paper, Stack, TextField, Tooltip } from '@mui/material/';
import { useEffect, useState } from "react";
import { socket } from "../SocketClient";
import UserAvatar from '../UserAvatar';
import CommentMenu from "./CommentMenu";

export default function Comment({ comment_id, comment }) {

  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  const [timer, setTimer] = useState()

  useEffect(() => {
    if (comment) {
      setCommentText(comment.comment_text)
      setAuthor(comment.user_name)
    }
  }, [comment])

  async function updateCommentText(comment_text) {
    setCommentText(comment_text)
    clearTimeout(timer)
    setTimer(setTimeout(() => {
      socket.emit('changeCommentText', { comment_id, comment_text })
    }, 500))
  }

  function removeComment() {
    let card_id = comment.card_id
    socket.emit('removeComment', { comment_id, card_id })
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: '8px', px: 1 }} >
      <TextField
        fullWidth
        multiline
        id={`comment-${comment_id}`}
        value={commentText}
        onChange={(e) => updateCommentText(e.target.value)}
        sx={{ my: 1, mx: 0, width: '100%' }}
        InputProps={{
          style: {
            fontSize: 14
          },
        }} />
      <Stack direction='row' justifyContent="space-between" alignItems='center'>
        <Tooltip title={author || ''}><IconButton><UserAvatar user_name={author || ''} size={24} /></IconButton></Tooltip>
        <CommentMenu removeCommentFunc={removeComment} />
      </Stack>
    </Paper>
  )
}