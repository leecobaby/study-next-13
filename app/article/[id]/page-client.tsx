'use client'
import { type RefObject, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, Button, Input, message } from 'antd'
import { useSession } from '@/lib/session-client'
import styles from './index.module.scss'
import { request } from '@/service'
import { type Article } from './page'

interface CommentProps {
  article: Article
  ref?: RefObject<HTMLDivElement>
}

export function EditLink({ id, userId }: { id?: number; userId?: number }) {
  const session = useSession()
  console.log('session', session)
  const userSession = session?.user

  return (
    <>
      {Number(userSession?.userId) === Number(userId) && (
        <Link href={`/editor/${id}`}>编辑</Link>
      )}
    </>
  )
}

export function Comment({ article, ref }: CommentProps) {
  const router = useRouter()
  const session = useSession()
  const { user } = session || {}
  const [inputVal, setInputVal] = useState('')
  if (!user?.userId) return null

  const handleComment = () => {
    request
      .post('/api/comment/publish', {
        articleId: article.id,
        content: inputVal,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          message.success('评论成功')
          router.refresh()
        } else {
          message.error(res?.msg || '评论失败')
        }
      })
  }

  return (
    <div className={styles.enter}>
      <Avatar src={user?.avatar} size={48} />
      <div className={styles.content}>
        <Input.TextArea
          placeholder="请输入评论"
          rows={4}
          value={inputVal}
          onChange={ev => setInputVal(ev.target.value)}
        />
        <Button type="primary" onClick={handleComment}>
          发表评论
        </Button>
      </div>
    </div>
  )
}
