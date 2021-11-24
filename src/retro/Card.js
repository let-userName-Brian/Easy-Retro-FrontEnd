//import Comment from "./Comment.js"

export default function Card({ card_id }) {

  // useEffect(() => {
  //     // Received when the server sends us a card
  //     socket.on('receivedCards', (cards) => setCards(cards))
  //     socket.on('updatedColumnName', (column) => {
  //       if (column.column_id === column_id) {
  //         setColumnName(column.column_name)
  //       }})
  //       socket.on('updatedColumnCardIds', (column) => {
  //         if (column.column_id === column_id) {
  //           setColumnCardIds(column.card_ids)
  //     }})
  //   }, [column_id])

  return (
    <ul>
      <div> Card ID: {card_id}</div>
      {/* <div> Card Text {card_text}</div>
        <div> User ID: {user_id}</div>
        <div> Votes: {votes}</div> */}
      {/* {comments.map((comment) => (
            <Comment comment={comment} key={comment.comment_id} />
        ))} */}
    </ul>
  )
}
// need card ID from column where column ID = card ID
// pass in column ID as props
// make call to take all of the cards that are in this column