'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { styled } from 'styled-components'
import { Input, Button, message } from 'antd'
import { type ChangeEvent, useState } from 'react'
import { request } from '@/service'
import { useSession } from '@/lib/session'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function Page() {
  const [content, setContent] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')
  const router = useRouter()
  const session = useSession()
  const { userId } = session?.user || {}

  function handlePulish() {
    console.log('value', content)
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    request
      .post('/api/article/publish', {
        title,
        content,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          // todo 跳转
          userId && router.push(`/user/${userId}`)
          message.success('发布成功')
        } else {
          message.error(res?.msg || '发布失败')
        }
      })
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }

  function handleContentChange(content: any) {
    setContent(content)
  }
  return (
    <Warp>
      <div className="operation">
        <Input
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Button type="primary" onClick={handlePulish}>
          发布
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </Warp>
  )
}

const Warp = styled.div`
  margin: 0 auto;
  .operation {
    display: flex;
    input {
      width: 95%;
    }
    button {
      width: 5%;
    }
  }
`
