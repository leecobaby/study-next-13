// import { NextResponse } from 'next/server'

export async function GET() {
  return new Response(JSON.stringify({ ret: "Hello World!" }))
}