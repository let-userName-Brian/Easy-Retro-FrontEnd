
export default function Comment({comment_id, comment_text, user_id, card_id, reactions}){
    return(
    <ul>
        <div> Comment ID: {comment_id}</div>
        <div> Comment Text: {comment_text}</div>
        <div> User ID: {user_id}</div>
        <div> Card ID: {card_id}</div>
        <div> Reactions {reactions}</div>
    </ul>
    )
}