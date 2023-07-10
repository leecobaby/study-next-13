import { Inter } from 'next/font/google'
import { Data, getStaticSession } from '@/lib/session'
import { StyledComponentsRegistry } from '@/lib/registry'
import { Navbar, Footer } from '@/components'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getStaticSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Navbar session={session} />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
