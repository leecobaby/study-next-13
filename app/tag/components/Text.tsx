import { redirect } from 'next/navigation'

export function Text() {
  redirect('/')
  return <span>text-test</span>
}
