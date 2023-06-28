// import { NextResponse } from 'next/server'
import { Libre_Franklin } from 'next/font/google';
import { data } from "./mock";

export async function GET() {
  // return new Response(JSON.stringify({ ret: "Hello World!" }))
  return new Response(JSON.stringify(data))
}

export async function POST() {
  return new Response(JSON.stringify({ ret: "Hello World!" }))
} 