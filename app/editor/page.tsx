'use client'
import { type ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { Input, Button } from 'antd'
import { styled } from 'styled-components'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function Page() {
  const [content, setContent] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')

  function handlePulish() {
    console.log('value', content)
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
