import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_COMMENT } from '@/config'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const data = await req.json()
  const { articleId = 0, content = '' } = data
  console.log(data)
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
          id: Number(articleId),
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