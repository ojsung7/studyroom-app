function Rooms() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">스터디룸 목록</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((room) => (
          <li key={room} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-bold">룸 {room}</h3>
            <p className="text-sm text-gray-500">위치: A동 {room}층</p>
            <p className="text-sm text-gray-500">수용 인원: {4 + room}명</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Rooms