import md5 from 'md5'
import { format } from 'date-fns'
import { NextResponse } from 'next/server';
import { IronSession } from 'iron-session'
import { request } from '@/service'
import { randStr } from '@/lib/utils'

const {
  BaseURL,
  AccountId,
  AuthToken,
  AppId,
  TemplateId
} = process.env

export async function POST(req: Request) {
  const { to = '', templateId = TemplateId } = await req.json();
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  console.log(NowDate)
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`).toUpperCase()
  const Authorization = Buffer.from(`${AccountId}:${NowDate}`).toString('base64')
  console.log(Authorization)
  const url = `${BaseURL}/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  const verifyCode = randStr(4)
  const expireMinute = 5
  console.log(url)
  const res = await request.post(url, { to, templateId, appId: AppId, datas: [verifyCode, expireMinute] }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization
    }
  });
  console.log(res)
  return NextResponse.json({
    code: 0,
    msg: 'success',
    data: '1232'
  })
}