import { getSession, createResponse } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
  return createResponse(res, JSON.stringify(session))
}

export { handler as GET, handler as POST }