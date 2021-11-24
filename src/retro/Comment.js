import { useContext, useState, useEffect } from "react"
import { RetroContext } from "./Retro"
import { Box, Paper } from '@mui/material/';

export default function Comment({ comment_id }) {

  const [commentText, setCommentText] = useState('')
  const [author, setAuthor] = useState('')
  const [reactions, setReactions] = useState([])
  const { comments: initComments } = useContext(RetroContext)

  useEffect(() => {
    let comment = initComments?.find(c => c.comment_id === comment_id)
    if (!initComments) {
      return
    }
    setCommentText(comment.comment_text)
    setAuthor(comment.user_name)
    setReactions(comment.reactions)
  }, [initComments])

  return (
    <Paper variant="outlined" >
      <ul>
        <div> Comment ID: {comment_id}</div>
        <div> Comment Text: {commentText}</div>
        <div> Author: {author}</div>
        <div> Reactions: {reactions.length}</div>
      </ul>
    </Paper>
  )
}