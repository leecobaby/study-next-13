import md5 from 'md5'
import { format } from 'date-fns'
import { NextResponse } from 'next/server';
import GithubProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { request } from '@/service'
import { randStr } from '@/lib/utils'
const {
  BaseURL,
  AccountId,
  AuthToken,
  AppId,
  TemplateId
} = process.env

const options: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone', type: 'text', id: 'phone' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        // Send verification request
        const res = await fetch('/api/auth/send-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: credentials?.phone }),
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        // Return user object
        return { id: '1', phone: credentials?.phone };
      },
    })
    // ...add more providers here
  ],
};

// const handler = NextAuth(options);


async function auth(req, res) {
  // const { to = '', templateId = TemplateId } = await req.json();
  // const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  // console.log(NowDate)
  // const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`).toUpperCase()
  // const Authorization = Buffer.from(`${AccountId}:${NowDate}`).toString('base64')
  // console.log(Authorization)
  // const url = `${BaseURL}/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  // const verifyCode = randStr(4)
  // const expireMinute = 5
  // console.log(url)
  // const data = await request.post(url, { to, templateId, appId: AppId, datas: [verifyCode, expireMinute] }, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json;charset=utf-8',
  //     Authorization
  //   }
  // });
  // console.log(data)
  // const { statusCode, statusMsg } = data as any

  // if (statusCode === '000000') {
  // }

  console.log(req);


  return await NextAuth(req, res, options);

}

export { auth as GET, auth as POST }