'use client'
import { useState } from 'react'
import { styled } from 'styled-components'

interface LoginProps {
  isShow: boolean
  onClose: () => void
}

export function Login(props: LoginProps) {
  const { isShow = false } = props
  const [fromData, setFromData] = useState({
    phone: '',
    verify: '',
  })

  function handleClose() {
    props.onClose()
  }

  function handleGetVerifyCode() {}

  function handleLogin() {}

  function handleOAuthGitHub() {}

  return isShow ? (
    <Warp>
      <div className="box">
        <div className="title">
          <span>手机号登录</span>
          <span className="close" onClick={handleClose}>
            X
          </span>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="请输入手机号"
          value={fromData.phone}
        />
        <div className="verify_code">
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={fromData.verify}
          />
          <span className="code" onClick={handleGetVerifyCode}>
            获取验证码
          </span>
        </div>
        <div className="login_btn" onClick={handleLogin}>
          登录
        </div>
        <div className="other_login" onClick={handleOAuthGitHub}>
          使用 GitHub 登录
        </div>
        <div className="login_privacy">
          注册登录即代表同意
          <a href="https://github.com/leecobaby" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </Warp>
  ) : null
}

/** style */

const Warp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`
