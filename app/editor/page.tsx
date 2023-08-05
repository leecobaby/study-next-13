'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { styled } from 'styled-components'
import { Input, Button, message, Select } from 'antd'
import { type ChangeEvent, useState, useEffect } from 'react'
import { Tag } from '@/types'
import { matchStr } from '@/lib/utils'
import { request } from '@/service'
import { useSession } from '@/lib/session-client'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function Page() {
  const [content, setContent] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [tagIds, setTagIds] = useState([])
  const router = useRouter()
  const session = useSession()
  const { userId } = session?.user || {}

  useEffect(() => {
    request.get('/api/tag').then((res: any) => {
      if (res?.code === 0) {
        setAllTags(res?.data?.allTags || [])
      }
    })
  }, [])

  function handlePulish() {
    if (!title) {
      message.warning('请输入文章标题')
      return
    }
    request
      .post('/api/article/publish', {
        title,
        content,
        tagIds,
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

  function handleSelectTag(value: []) {
    setTagIds(value)
  }
  return (
    <Warp>
      <div className="operation">
        <Input
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Select
          className="tag"
          mode="multiple"
          placeholder="请选择标签"
          allowClear
          onChange={handleSelectTag}
          options={allTags.map(tag => ({
            label: tag.title,
            value: tag.id,
          }))}
          filterOption={(input, option) => matchStr(input, option?.label ?? '')}
        />
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
    width: 100%;
    input {
      width: 80%;
    }
    .tag {
      width: 15%;
    }
  }
`
