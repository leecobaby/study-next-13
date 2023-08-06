import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { EXCEPTION_USER } from '@/config'
import { getSession, createResponse } from '@/lib/session'

export async function GET(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)

  if (!session?.user) {
    return createResponse(res, JSON.stringify(EXCEPTION_USER))
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.userId
    }
  })

  return createResponse(res, JSON.stringify({ code: 0, msg: 'success', data: { userInfo: user } }))
}