import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'

async function handler(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const { title = '', content = '' } = await req.json()
  const article = await prisma.forum_articles.create({
    data: {
      title,
      content,
      create_time: new Date(),
      update_time: new Date(),
      views: 0,
      is_delete: false,
      forum_users: {
        connect: {
          id: session.user?.userId,
        },
      },
    }
  })
  return createResponse(res, JSON.stringify(session))
}

export { handler as GET, handler as POST }