import { getIronSession, createResponse } from 'iron-session'
import { sessionOptions } from '@/config'
import { cookies, headers } from 'next/headers'
import { NextRequest } from 'next/server'
import type { IronSession } from 'iron-session'

export interface Data {
  user?: {
    userId: number
    nickname: string | null
    avatar: string | null
    job: string | null
    introduce: string | null
  }
  verifyCode?: string
}

export type ISessionData = IronSession<Data>

export function getSession(req: Request, res: Response) {
  const session = getIronSession<Data>(req, res, sessionOptions)
  return session
}

export function getServerSession() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value])
    ),
  }
  const res = {
    getHeader: headers().get,
    setCookie: cookies().set,
    setHeader: headers().set,
  }
  // @ts-ignore
  const session = getSession(req, res)
  return session
}

export { createResponse }
