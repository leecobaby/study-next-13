'use client'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { message } from 'antd'
import { request } from '@/service'
import type { ChangeEvent } from 'react'

interface LoginProps {
  isShow: boolean
  onClose: () => void
}

export function Login(props: LoginProps) {
  const { isShow = false } = props
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  const [fromData, setFromData] = useState({
    phone: '',
    verify: '',
  })

  function handleClose() {
    props.onClose()
  }

  function handleGetVerifyCode() {
    // setIsShowVerifyCode(true)
    if (!fromData.phone) {
      message.warning('请输入手机号')
      return
    }

    request
      .post('/api/user/sendVerifyCode', {
        to: fromData.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.success('发送成功')
          setIsShowVerifyCode(true)
        } else {
          message.warning(res.msg || '未知错误')
        }
      })
  }

  function handleLogin() {
    request
      .post('/api/user/login', { ...fromData, identity_type: 'phone' })
      .then((res: any) => {
        if (res.code === 0) {
          message.success('登录成功')
          props.onClose()
        } else {
          message.error(res.msg || '未知错误')
        }
      })
  }

  function handleOAuthGitHub() {}

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFromData({
      ...fromData,
      [name]: value,
    })
  }

  function handleCountDownEnd() {
    setIsShowVerifyCode(false)
  }

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
          onChange={handleFormChange}
        />
        <div className="verify_code">
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={fromData.verify}
            onChange={handleFormChange}
          />
          <span className="code" onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className="login_btn" onClick={handleLogin}>
          登录
        </div>
        <div className="other_login" onClick={handleOAuthGitHub}>
          使用 GitHub 登录
        </div>
        <div className="login_privacy">
          注册登录即代表同意&nbsp;
          <a href="https://github.com/leecobaby" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </Warp>
  ) : null
}

interface CountDownProps {
  time: number
  onEnd: () => void
}

function CountDown(props: CountDownProps) {
  const { time = 30, onEnd } = props
  const [count, setCount] = useState(time)

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000)
    } else {
      onEnd()
    }
  })

  return <CountDownWarp>{count}s</CountDownWarp>
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
  .box {
    width: 320px;
    height: 320px;
    background-color: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .close {
        cursor: pointer;
        color: #888;
      }
    }
    input {
      width: 100%;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 0 10px;
    }
    .verify_code {
      position: relative;
      cursor: pointer;
      .code {
        color: #1e80ff;
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 14px;
      }
    }
    .login_btn {
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      background-color: #1e80ff;
      color: #fff;
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
    }
    .other_login {
      margin-top: 14px;
      color: #1e80ff;
      cursor: pointer;
      font-size: 14px;
    }
    .login_privacy {
      margin-top: 6px;
      font-size: 14px;
      color: #888;
      a {
        color: #1e80ff;
      }
    }
  }
`
const CountDownWarp = styled.span`
  color: #909090;
`
