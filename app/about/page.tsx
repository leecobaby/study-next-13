import Link from 'next/link'

export default function Page() {
  return (
    <h1>
      <Link href="/blog/123">About</Link>
      <br />
      <Link href="/info">Info</Link>
    </h1>
  )
}
