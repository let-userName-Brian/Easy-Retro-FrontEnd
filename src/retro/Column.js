
import Card from "./Card" 

export default function Column({ retro_id, cards }) {
    return (
    <>
        <div>Column Retro ID: {retro_id}</div>
        {cards.map((card) => ( 
            <Card card={card} key={card.card_id} />
        ))}
    </> 
    )
}

// set up litener for card updated, then add behavyor for what shoudl happen 


//get retro by user_id


  