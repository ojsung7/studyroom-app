// src/pages/Rooms.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import RoomCard from '../components/RoomCard'

interface Room {
  id: string
  name: string
  capacity: number
  location: string
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase.from('rooms').select('*')
      if (error) console.error(error)
      else setRooms(data as Room[])
    }

    fetchRooms()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}