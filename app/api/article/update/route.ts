import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_ARTICLE } from '@/config'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const { title = '', content = '', id = 0 } = await req.json()
  // 缺少权限判断
  const article = await prisma.article.update({
    where: {
      id
    },
    data: {
      title,
      content,
      update_time: new Date()
    }
  })

  if (!article) {
    return createResponse(res, JSON.stringify({ ...EXCEPTION_ARTICLE.UPDATE_FAIL }))
  } else {
    return createResponse(res, JSON.stringify({ code: 0, msg: '更新成功' }))
  }
}