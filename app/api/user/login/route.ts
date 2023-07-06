import { NextRequest, NextResponse } from 'next/server';
import { request } from '@/service'
import { prisma } from '@/lib/prisma'
import { randStr } from '@/lib/utils'
import { getSession, createResponse } from "@/lib/session";

let i = 0

export async function POST(req: Request) {
  const res = new Response();
  const session = await getSession(req, res);
  const result = await prisma.forum_users.create({
    data: {
      nickname: 'leeco',
    }
  })
  console.log(i++)
  console.log(result)

  const users = await prisma.forum_users.findMany()
  console.log(users)

  const { phone = '', verify = '' } = await req.json();
  console.log(phone, verify)

  // session.user = {
  //   id: 1,
  //   name: "Leeco",
  // };

  // await session.save();

  // return createResponse(
  //   res,
  //   JSON.stringify({ code: 0, msg: '登录成功', data: { phone, verifyCode } })
  // );

  return NextResponse.json({ code: 0, msg: '登录成功', data: { phone, verify } })
}