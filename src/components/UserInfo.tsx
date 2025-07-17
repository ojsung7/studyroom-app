// src/components/UserInfo.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function UserInfo() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setEmail(data.user.email ?? null)
      }
    }
    getUser()
  }, [])

  return (
    <div className="text-sm text-gray-700">
      {email ? `안녕하세요, ${email}` : '로그인되지 않음'}
    </div>
  )
}