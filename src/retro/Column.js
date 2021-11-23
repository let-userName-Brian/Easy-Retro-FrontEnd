import { useEffect, useState, useContext } from "react"
import { socket } from "../SocketClient"
import Card from "./Card"
import { RetroContext } from './Retro'

export default function Column({ column_id }) {
  const { columns } = useContext(RetroContext)
  const [cards, setCards] = useState(useContext(RetroContext).cards)
  const [columnName, setColumnName] = useState('')
  const [columnCardIds, setColumnCardIds] = useState([])

  useEffect(() => {
    // Received when the server sends us a card
    socket.on('receivedCards', (cards) => setCards(cards))
    socket.on('updatedColumnName', (column) => {
      if (column.column_id === column_id) {
        setColumnName(column.column_name)
      }
    })
    socket.on('updatedColumnCardIds', (column) => {
      if (column.column_id === column_id) {
        setColumnCardIds(column.card_ids)
      }
    })
    return () => {socket.removeAllListeners('receivedCards')
    socket.removeAllListeners('updatedColumnName')
    socket.removeAllListeners('updatedColumnCardIds')}
  }, [column_id])

  useEffect(() => {
    setColumnName(columns.find(column => column.column_id === column_id)?.column_name || 'unknown col name')
  }, [columns])

  return (
    <>
      <div>Column ID: {column_id}</div>
      <div>Column Name: {columnName}</div>
      {cards.map((card) => (
        <Card card_id={card.card_id} key={card.card_id} />
      ))}
    </>
  )
}