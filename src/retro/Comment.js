import { Button, Paper, TextField, Typography } from '@mui/material/';
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { socket } from "../SocketClient";
import CommentMenu from "./CommentMenu";
import { RetroContext } from "./Retro";

export default function Comment({ comment_id, comment, user_id, retro_id, user }) {

  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  // const [reactions, setReactions] = useState([])
  const { comments: initComments } = useContext(RetroContext)

  // console.log("comment ID:",comment_id)


  function changeCommentText() {
    socket.emit('changeCommentText', { comment_id })
  }


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


  //send to Dustin--------------------------------------------------------------------
  function removeCommentFunc() {
    console.log('remove comment id:', comment_id)
    //socket.emit('removeComment', { comment_id })
  }

  //submit comment to backend for DUSTINNNNN--------------------------------------------------------------------
  function submitCommentFunc() {
    console.log('submit comment id:', comment_id)
    //socket.emit('submitComment', { card_id, comment_text: commentText, user_id })
  }

  //coment Id will be sent back from DB after initialization of comments
  //we need where user Id and comment ID match.....set that as Author

  return (
    <Paper variant="outlined" sx={{ m: 1, p: 1, borderRadius: '15px' }} >
      <Typography variant='h5'> Comment ID: {comment_id}</Typography>
      <TextField fullWidth multiline id="commentText" value={commentText} onChange={(e) => setCommentText(e.target.value)} onBlur={changeCommentText} sx={{ my: 1 }} />
      <Box>
        <Typography >Author: {author}</Typography>
        <CommentMenu removeCommentFunc={removeCommentFunc} />
        {author ? <Button onClick={() => console.log('submit comment')}>Submit Comment</Button>
          : <></>}
      </Box>
    </Paper>
  )
}