// src/pages/RoomDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
)

interface Room {
  id: string
  name: string
  capacity: number
  location: string
}

interface Reservation {
  id: string
  user_id: string
  start_time: string
  end_time: string
}

export default function RoomDetail() {
  const { id } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await supabase.from('rooms').select('*').eq('id', id).single()
      setRoom(data)
    }

    const fetchReservations = async () => {
      const { data } = await supabase.from('reservations').select('*').eq('room_id', id)
      setReservations(data || [])
    }

    fetchRoom()
    fetchReservations()
  }, [id])

  if (!room) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
      <p>인원: {room.capacity}명</p>
      <p>위치: {room.location}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">예약 목록</h2>
      <ul className="space-y-2">
        {reservations.map(r => (
          <li key={r.id} className="border p-2 rounded">
            {new Date(r.start_time).toLocaleString()} ~ {new Date(r.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}