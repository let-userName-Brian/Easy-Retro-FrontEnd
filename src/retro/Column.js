import { useEffect, useState } from "react"
import { socket } from "../SocketClient"
import Card from "./Card"

export default function Column({ column_id }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Received when the server sends us a card
    socket.on('receivedCards', (cards) => setCards(cards))
  }, [column_id])

  return (
    <>
      <div>Column ID: {column_id}</div>
      {cards.map((card) => (
        <Card card_id={card.card_id} key={card.card_id} />
      ))}
    </>
  )
}

// set up litener for card updated, then add behavyor for what should happen 


//get retro by user_id


