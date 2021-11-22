//import Comment from "./Comment.js"

export default function Card({key:card_id}){
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