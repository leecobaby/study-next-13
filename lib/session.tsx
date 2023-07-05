import { getIronSession, createResponse } from 'iron-session'
import { sessionOptions } from '@/config'

export interface Data {
  user?: {
    id: number
    name: string
  }
  verifyCode?: string
}

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, sessionOptions)
  return session
}

export { createResponse }
