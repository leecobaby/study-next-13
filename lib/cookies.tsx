import { cookies } from 'next/headers'

// 不是优雅的方案
export function Cookies() {
  const cookieStroe = cookies()
  const user = cookieStroe.get('user')?.value
  console.log(user)
  return null
}
