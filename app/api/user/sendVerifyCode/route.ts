import md5 from 'md5'
import { format } from 'date-fns'
import { NextRequest } from 'next/server';
import { request } from '@/service'
import { randStr } from '@/lib/utils'
import { getSession, createResponse } from "@/lib/session";

const {
  BaseURL,
  AccountId,
  AuthToken,
  AppId,
  TemplateId
} = process.env

export async function POST(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  const { to = '', templateId = TemplateId } = await req.json();
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`).toUpperCase()
  const Authorization = Buffer.from(`${AccountId}:${NowDate}`).toString('base64')
  const url = `${BaseURL}/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  const verifyCode = randStr(4)
  console.log(verifyCode)
  const expireMinute = 5
  console.log(url)
  const data = await request.post(url, { to, templateId, appId: AppId, datas: [verifyCode, expireMinute] }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization
    }
  });
  console.log(data)

  const { statusCode, templateSMS, statusMsg } = data as any

  // 开发环境下请注释掉下面两行
  session.verifyCode = verifyCode
  await session.save();

  if (statusCode === '000000') {
    // 生产环境下去掉注释
    // session.verifyCode = verifyCode
    // await session.save();

    return createResponse(
      res,
      JSON.stringify({
        code: 0,
        msg: statusMsg,
        data: {
          templateSMS
        }
      })
    );
  } else {
    return createResponse(
      res,
      JSON.stringify({
        code: -1,
        msg: statusMsg,
        data: null
      })
    )
  }
}