// src/components/RoomCard.tsx
import { Link } from 'react-router-dom'

export default function RoomCard({ room }: { room: any }) {
  return (
    <Link to={`/room/${room.id}`}>
      <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{room.name}</h2>
        <p>인원: {room.capacity}명</p>
        <p>위치: {room.location}</p>
      </div>
    </Link>
  )
}