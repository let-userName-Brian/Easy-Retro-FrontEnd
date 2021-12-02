import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import { Paper, TextField, Typography, Button } from '@mui/material/';
import { Box } from "@mui/system";
import CommentMenu from "./CommentMenu";
import { socket } from "../SocketClient";

export default function Comment({ comment_id, comment, user_id, retro_id, user }) {

  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  const [reactions, setReactions] = useState([])
  const { comments: initComments } = useContext(RetroContext)

  // console.log("comment ID:",comment_id)


  function submitCommentTextChange() {
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
    setReactions(comment.reactions)
  }, [initComments])


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


console.log('this',comment.user_name)
console.log('author',author)

return (
    <Paper variant="outlined" sx={{ m: 1, p: 1, borderRadius: '15px' }} >
      <Typography variant='h5'> Comment ID: {comment_id}</Typography>
      <TextField fullWidth label={commentText} id="commentText" value={commentText} onChange={(e) => setCommentText(e.target.value)} onBlur={submitCommentTextChange} sx={{ my: 1 }}
      />
      <Box>
        <Typography >Author: {author}</Typography>
         <CommentMenu removeCommentFunc={removeCommentFunc} />
         {author ? <Button onClick={() => console.log('submit comment')}>Submit Comment</Button>
         : <></>}
      </Box>
    </Paper>
  )
}