// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail' // 추가
import MyPage from './pages/MyPage'
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/room/:id" element={<RoomDetail />} /> {/* 추가 */}
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  )
}