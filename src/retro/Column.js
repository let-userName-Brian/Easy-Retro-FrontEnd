
import Card from "./Card" 
import { useState, useEffect } from "react"

export default function Column({ column_id }) {
    const [cards, setCards] = useState([])

    
    return (
    <>
        <div>Column ID: {column_id}</div>
        {cards.map((card) => ( 
            <Card key={card.card_id} />
        ))}
    </> 
    )
}

// set up litener for card updated, then add behavyor for what should happen 


//get retro by user_id


  