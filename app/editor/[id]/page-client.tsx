'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { styled } from 'styled-components'
import { Input, Button, Select, message, type SelectProps } from 'antd'
import { type ChangeEvent, useState, useEffect } from 'react'
import { request } from '@/service'
import { matchStr } from '@/lib/utils'
import { Tag, Article } from '@/types'
import { useSession } from '@/lib/session-client'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

interface IPorps {
  article: Article
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export function ModifyEditor({ article }: IPorps) {
  const [content, setContent] = useState(article.content || '')
  const [title, setTitle] = useState(article.title || '')
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [tagIds, setTagIds] = useState(article.tags.map(tag => tag.id) || [])
  console.log('tagIds', tagIds)
  const router = useRouter()
  const session = useSession()
  const options: SelectProps['options'] = allTags.map(tag => ({
    label: tag.title,
    value: tag.id,
  }))

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
      .post('/api/article/update', {
        id: article.id,
        title,
        content,
        tagIds,
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
          options={options}
          filterOption={(input, option) =>
            matchStr(input, (option?.label as string) ?? '')
          }
          defaultValue={tagIds as []}
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
    input {
      width: 80%;
    }
    .tag {
      width: 15%;
    }
  }
`
