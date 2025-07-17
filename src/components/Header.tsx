// src/components/Header.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import UserInfo from './UserInfo'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })
  }, [])

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        <Link to="/">스터디룸 예약</Link>
      </h1>
      <nav className="flex items-center gap-4">
        {/* <Link to="/rooms" className="text-gray-700 hover:text-blue-500">룸 목록</Link> */}
        <Link to="/mypage" className="text-gray-700 hover:text-blue-500">마이페이지</Link>
        <UserInfo />
        {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      </nav>
    </header>
  )
}
