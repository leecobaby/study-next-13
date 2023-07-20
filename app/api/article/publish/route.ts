import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_ARTICLE } from '@/config'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const { title = '', content = '' } = await req.json()
  const article = await prisma.article.create({
    data: {
      title,
      content,
      create_time: new Date(),
      update_time: new Date(),
      views: 0,
      is_delete: false,
      user: {
        connect: {
          id: session.user?.userId,
        },
      },
    }
  })
  if (!article) {
    return createResponse(res, JSON.stringify({ ...EXCEPTION_ARTICLE.PUBLIC_FAIL }))
  } else {
    return createResponse(res, JSON.stringify({ code: 0, data: article, msg: '发布成功' }))
  }
}