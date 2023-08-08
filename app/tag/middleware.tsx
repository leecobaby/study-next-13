import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log(22222)
  console.log(req.nextUrl)
  return NextResponse.redirect('/article/1')
}
