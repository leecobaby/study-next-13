'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Menu, Dropdown, Avatar } from 'antd'
import { css, styled } from 'styled-components'
import { redirect, usePathname } from 'next/navigation'
import { LoginOutlined, HomeOutlined } from '@ant-design/icons'
import { request } from '@/service'
import { Data } from '@/lib/session'
import { Login } from './Login'

export function Navbar({ session }: { session: Data }) {
  const pathname = usePathname()
  const { userId, avatar } = session?.user || {}
  const [isShowLogin, setIsShowLogin] = useState(false)
  console.log('session', session)

  function handleGotoEditorPage() {
    window.location.href = '/editor'
  }

  function handleLogin() {
    isShowLogin ? setIsShowLogin(false) : setIsShowLogin(true)
  }

  function handleCloseLogin() {
    setIsShowLogin(false)
  }

  function handleGotoPersonalPage() {
    window.location.href = '/user'
  }

  function handleLogout() {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        redirect('/')
      }
    })
  }

  function renderDropDownMenu() {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp; 个人主页
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <LoginOutlined />
          &nbsp; 退出系统
        </Menu.Item>
      </Menu>
    )
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
        <Button onClick={handleGotoEditorPage}>写文章</Button>

        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
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
