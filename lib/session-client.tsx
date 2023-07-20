'use client'
import React from 'react'
import type { Data } from './session'

export async function fetchSession() {
  const data = await fetch('/api/session')
  const session = await data.json()
  return session as Data
}

export function useSession() {
  const [session, setSession] = React.useState<Data>()
  React.useEffect(() => {
    fetchSession().then(session => {
      setSession(session)
    })
  }, [])
  return session
}
