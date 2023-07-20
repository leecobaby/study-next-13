'use client'
import Link from 'next/link'
import { useSession } from '@/lib/session-client'

export function EditLink({ id }: { id?: number }) {
  const session = useSession()
  console.log('session', session)
  const userSession = session?.user

  return (
    <>
      {Number(userSession?.userId) === Number(id) && (
        <Link href={`/editor/${id}`}>编辑</Link>
      )}
    </>
  )
}
