import { NextRequest, NextResponse } from 'next/server';
import { request } from '@/service'
import { prisma } from '@/lib/prisma'
import { randStr } from '@/lib/utils'
import { getSession, createResponse } from "@/lib/session";

let i = 0

export async function POST(req: Request) {
  const res = new Response();
  const session = await getSession(req, res);
  console.log(i++)

  const { phone = '', verify = '', identity_type } = await req.json();
  console.log(phone, verify)
  if (session.verifyCode === verify) {
    // 验证码正确，在 user_auths 表中查找 identity_type 是否有记录
    const userAuth = await prisma.forum_user_auths.findFirst({
      where: {
        identity_type,
        identifier: phone,
        credential: verify
      },
      include: {
        forum_users: true
      }
    })

    if (userAuth) {
      // 有记录，直接登录
      session.user = userAuth.forum_users as any;
      await session.save();

      return createResponse(
        res,
        JSON.stringify({ code: 0, msg: '登录成功', data: { phone, verify } })
      );
    } else {
      // 新用户，创建用户
      const nonce = randStr(6);
      const user = await prisma.forum_users.create({
        data: {
          nickname: `用户_${nonce}`,
          avatar: `https://avatars.githubusercontent.com/u/${nonce}?v=4`,
          forum_user_auths: {
            create: {
              identity_type,
              identifier: phone,
              credential: session.verifyCode
            }
          }
        }
      })

      session.user = user as any;
      await session.save();

      return createResponse(
        res,
        JSON.stringify({ code: 0, msg: '创建并登录成功', data: user })
      );
    }
  } else {
    await session.destroy();
    return createResponse(
      res,
      JSON.stringify({ code: -1, msg: '验证码错误', data: null })
    );
  }
}