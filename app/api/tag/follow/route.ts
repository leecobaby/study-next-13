import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { getSession, createResponse } from '@/lib/session'
import { EXCEPTION_USER, EXCEPTION_TAG } from '@/config'
import { TagType, Tag } from '@/types'

export async function POST(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  const { userId = 0 } = session.user || {}
  const data = await req.json()
  const { tagId, type = 0 } = data

  if (!userId) {
    return createResponse(
      res,
      JSON.stringify({ ...EXCEPTION_USER.NOT_LOGIN })
    )
  }

  if (!tagId) {
    return createResponse(
      res,
      JSON.stringify({ ...EXCEPTION_TAG.FOLLOW_FAIL })
    )
  }

  let followTags

  if (type === TagType.Follow) {
    const userTags = await prisma.user.update({
      where: {
        id: userId
      },
      include: {
        tags: true
      },
      data: {
        tags: {
          connect: [{ id: tagId }],
          update: {
            where: {
              id: tagId
            },
            data: {
              follow_count: {
                increment: 1
              }
            }
          },
        }
      }
    })
    followTags = userTags.tags
  } else if (type === TagType.UnFollow) {
    const userTags = await prisma.user.update({
      where: {
        id: userId
      },
      include: {
        tags: true
      },
      data: {
        tags: {
          update: {
            where: {
              id: tagId
            },
            data: {
              follow_count: {
                decrement: 1
              }
            }
          },
          disconnect: [{ id: tagId }]
        }
      }
    })
    followTags = userTags.tags
  } else {
    return createResponse(
      res,
      JSON.stringify({ ...EXCEPTION_TAG.FOLLOW_FAIL })
    )
  }

  return createResponse(
    res,
    JSON.stringify({ code: 0, msg: '操作成功', data: { followTags } })
  )
}

