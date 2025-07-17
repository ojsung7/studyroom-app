// src/components/LogoutButton.tsx
import { supabase } from '../supabaseClient'

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-4 py-2 rounded"
    >
      로그아웃
    </button>
  )
}