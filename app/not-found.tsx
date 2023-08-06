import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="content-layout text-center">
      <Image src="/404.svg" width={640} height={640} alt="404" />
      <p className="text-center">
        View <Link href="/">Home</Link>
      </p>
    </div>
  )
}
