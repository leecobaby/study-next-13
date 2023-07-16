'use client'
import React from 'react'
import { Footer, Navbar } from '@/components'
import { useSession } from '@/lib/session'
import { usePathname } from 'next/navigation'

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const pathname = usePathname()
  const showNavbar = excludeRoute(pathname)

  return (
    <>
      {showNavbar && <Navbar session={session} />}
      {children}
      <Footer />
    </>
  )
}

function excludeRoute(pathname: string) {
  const routes = ['/editor']
  return !routes.includes(pathname)
}
