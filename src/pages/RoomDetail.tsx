// RoomDetail.tsx (중략 생략)
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
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await supabase.from('rooms').select('*').eq('id', id).single()
      setRoom(data)
    }

    const fetchReservations = async () => {
      const { data } = await supabase.from('reservations').select('*').eq('room_id', id)
      setReservations(data || [])
    }

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id ?? null)
      setUserEmail(data.user?.email ?? null)
    }

    fetchRoom()
    fetchReservations()
    fetchUser()
  }, [id])

  const handleReserve = async () => {
    if (!startTime || !endTime || !userId) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    const { error } = await supabase.from('reservations').insert([
      {
        room_id: id,
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
        user_email: userEmail
      },
    ])

    if (error) {
      alert('예약 실패: ' + error.message)
    } else {
      alert('예약 완료!')
      // 새로고침 없이 업데이트
      const { data } = await supabase
        .from('reservations')
        .select('*')
        .eq('room_id', id)
      setReservations(data || [])
    }
  }

  if (!room) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
      <p>인원: {room.capacity}명</p>
      <p>위치: {room.location}</p>

      <div className="my-6 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">예약하기</h2>
        <div className="flex flex-col space-y-3">
          <label>
            시작 시간:
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </label>
          <label>
            종료 시간:
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </label>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleReserve}
          >
            예약하기
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">예약 목록</h2>
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