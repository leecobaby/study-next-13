import { NextRequest, NextResponse } from 'next/server';
import { getSession, createResponse } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  await session.destroy();
  return createResponse(
    res,
    JSON.stringify({ code: 0, msg: '退出成功', data: {} })
  );
}