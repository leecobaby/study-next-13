'use client'
import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { css, styled } from 'styled-components'
import { Button } from 'antd'
import { Login } from './Login'

export function Navbar() {
  const pathname = usePathname()
  const [isShowLogin, setIsShowLogin] = useState(false)

  function handleGotoEditorPage() {
    window.location.href = '/editor'
  }

  function handleLogin() {
    isShowLogin ? setIsShowLogin(false) : setIsShowLogin(true)
    window.location.href = '/login'
  }

  function handleCloseLogin() {
    setIsShowLogin(false)
  }

  return (
    <Warp>
      <section className="logo">BLOG-C</section>
      <section className="link">
        {navs?.map(item => (
          <Link
            className={pathname === item.harf ? 'active' : ''}
            key={item.label}
            href={item.harf}
          >
            {item.label}
          </Link>
        ))}
      </section>
      <section className="operation">
        <Button onClick={handleGotoEditorPage}>文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleCloseLogin} />
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
  background-color: #fff;
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
      color: #515151;
    }
  }

  .active {
    color: #2764f3;
  }

  .operation {
    margin-left: 150px;
    button {
      margin-right: 20px;
    }
  }
`
