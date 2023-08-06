import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { EXCEPTION_USER } from '@/config'
import { getSession, createResponse } from '@/lib/session'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const newUser = await req.json()

  if (!session?.user) {
    return createResponse(res, JSON.stringify(EXCEPTION_USER))
  }

  const user = await prisma.user.update({
    where: {
      id: session?.user?.userId
    },
    data: {
      ...newUser
    }
  })


  return createResponse(res, JSON.stringify({ code: 0, msg: 'success', data: { userInfo: user } }))
}