import { NextRequest, NextResponse } from 'next/server';
import { request } from '@/service'
import { randStr } from '@/lib/utils'
import { getSession, createResponse } from "@/lib/session";

export async function POST(req: Request) {
  const res = new Response();
  const session = await getSession(req, res);

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