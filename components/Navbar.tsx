'use client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { styled } from 'styled-components'

export function Navbar() {
  return (
    <Warp>
      <section className="logo">BLOG-C</section>
      <section className="link">
        {navs?.map(item => (
          <Link key={item.label} href={item.harf}>
            {item.label}
          </Link>
        ))}
      </section>
    </Warp>
  )
}

const navs = [
  {
    label: '首页',
    harf: '/',
  },
  {
    label: '资讯',
    harf: '/info',
  },
  {
    label: '标签',
    harf: '/tag',
  },
]

/** style */

const Warp = styled.div`
  height: 60px;
  background-color: aqua;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    font-size: 30px;
    font-weight: bold;
    margin-right: 60px;
  }

  .link {
    & > * {
      font-size: 18px;
      padding: 0 20px;
    }
  }
`
