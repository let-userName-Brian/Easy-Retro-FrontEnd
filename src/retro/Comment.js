import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import { Paper, TextField, Typography } from '@mui/material/';
import { Box } from "@mui/system";
import CommentMenu from "./CommentMenu";
import { socket } from "../SocketClient";

export default function Comment({ comment_id }) {

  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  const [reactions, setReactions] = useState([])
  const { comments: initComments } = useContext(RetroContext)

console.log("comment ID:",comment_id)

  useEffect(() => {
    let comment = initComments?.find(c => c.comment_id === comment_id)
    console.log('comment', comment)
    if (!initComments || !comment) {
      return
    }
    setCommentText(comment.comment_text)
    setAuthor(comment.user_name)
    setReactions(comment.reactions)
  }, [initComments])

  function removeCommentFunc() {
    console.log('remove comment id:', comment_id)
    socket.emit('removeComment', { comment_id })
  }

  return (
    <Paper variant="outlined" sx={{ m: 1, p: 1 }} >
      <Typography variant='h5'> Comment ID: {comment_id}</Typography>
      <TextField fullWidth label={commentText} id="commentText" InputProps={{
        inputProps: { style: { textAlign: "left" } }
      }} />
      <Box>
        <Typography >Author: {author}</Typography>
        <CommentMenu removeCommentFunc={removeCommentFunc} />
        {/* <Typography variant='h5'>Reactions: {reactions.length}</Typography> */}
      </Box>
    </Paper>
  )
}