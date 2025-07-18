// src/pages/MyPage.tsx
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
)

interface Reservation {
  id: string
  room_name: string
  location: string
  start_time: string
  end_time: string
}

export default function MyPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    const fetchReservations = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('reservations')
        .select(`
          id,
          start_time,
          end_time,
          rooms ( name, location )
        `)
        .eq('user_email', user.email)

      if (error) {
        console.error(error)
        return
      }

      const formatted = data.map((r: any) => ({
        id: r.id,
        room_name: r.rooms.name,
        location: r.rooms.location,
        start_time: r.start_time,
        end_time: r.end_time
      }))
      setReservations(formatted)
    }

    fetchReservations()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">내 예약 목록</h2>
      {reservations.map(res => (
        <div key={res.id} className="border p-4 rounded-lg mb-4 shadow">
          <div className="font-semibold">{res.room_name} ({res.location})</div>
          <div className="text-sm text-gray-600">
            {new Date(res.start_time).toLocaleString()} ~ {new Date(res.end_time).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}