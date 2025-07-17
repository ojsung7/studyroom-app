// src/components/LoginButton.tsx
import { supabase } from '../supabaseClient'

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      console.error('로그인 실패:', error.message)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Google로 로그인
    </button>
  )
}
