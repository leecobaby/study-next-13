import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_COMMENT } from '@/config'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const { articleId = null, content = '' } = await req.json()
  const comment = await prisma.comment.create({
    data: {
      content,
      create_time: new Date(),
      update_time: new Date(),
      user: {
        connect: {
          id: session.user?.userId,
        },
      },
      article: {
        connect: {
          id: Number(articleId) || undefined,
        }
      },
    }
  })
  if (!comment) {
    return createResponse(res, JSON.stringify({ ...EXCEPTION_COMMENT.PUBLIC_FAIL }))
  } else {
    return createResponse(res, JSON.stringify({ code: 0, data: comment, msg: '评论成功' }))
  }
}