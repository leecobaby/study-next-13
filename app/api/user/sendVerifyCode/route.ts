import { request } from '@/service';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  // const { phone } = await req.json();
  // const res = await request.post('/user/sendVerifyCode', { phone });
  return NextResponse.json({
    code: 0,
    msg: 'success',
    data: '1232'
  })
}