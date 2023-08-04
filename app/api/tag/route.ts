import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_COMMENT } from '@/config'

export async function GET(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const allTags = await prisma.tag.findMany({
    include: {
      users: true
    }
  })
  const userTags = await prisma.user.findUnique({
    where: {
      id: session?.user?.userId
    },
    select: {
      tags: true
    }
  })
  const followTags = userTags?.tags || []

  return createResponse(res, JSON.stringify({ code: 0, msg: '获取标签列表成功', data: { allTags, followTags } }))
}