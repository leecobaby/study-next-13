'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { styled } from 'styled-components'
import { Input, Button, message } from 'antd'
import { type ChangeEvent, useState } from 'react'
import { request } from '@/service'
import { useSession } from '@/lib/session-client'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { Article } from '@prisma/client'

interface IPorps {
  article: Article
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export function ModifyEditor({ article }: IPorps) {
  const [content, setContent] = useState(article.content || '')
  const [title, setTitle] = useState(article.title || '')
  const router = useRouter()
  const session = useSession()
  const { userId } = session?.user || {}

  function handlePulish() {
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    request
      .post('/api/article/update', {
        id: article.id,
        title,
        content,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          // todo 跳转
          article.id && router.push(`/article/${article.id}`)
          message.success('更新成功')
        } else {
          message.error(res?.msg || '更新失败')
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
