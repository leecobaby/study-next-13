import { getIronSession, createResponse } from 'iron-session'
import { sessionOptions } from '@/config'

export interface Data {
  user?: {
    id: number
    nickname: string | null
    avatar: string | null
    job: string | null
    introduce: string | null
  } & null
  verifyCode?: string
}

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, sessionOptions)
  return session
}

export { createResponse }
