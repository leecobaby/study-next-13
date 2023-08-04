'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Tabs, message } from 'antd'
import * as Icons from '@ant-design/icons'
import { useSession } from '@/lib/session-client'
import { request } from '@/service'
import { TagType, Tag } from '@/types'
import styles from './index.module.scss'

export default function Page() {
  return (
    <>
      <div>Tag Manager</div>
      <Tag />
    </>
  )
}

export function Tag() {
  const [followTags, setFollowTags] = useState<Tag[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [refresh, setRefresh] = useState(false)
  const session = useSession()
  const user = session?.user
  const router = useRouter()

  useEffect(() => {
    if (user) {
      request.get('/api/tag').then((res: any) => {
        if (res?.code === 0) {
          const { followTags, allTags } = res.data
          setFollowTags(followTags)
          setAllTags(allTags)
        }
      })
    }
  }, [user, refresh])

  const handleUnFollow = (tagId: number) => {
    request
      .post('/api/tag/follow', { tagId, type: TagType.UnFollow })
      .then((res: any) => {
        if (res?.code === 0) {
          message.success('取消关注成功')
          setRefresh(!refresh)
        } else {
          message.error(res?.msg || '取消关注失败')
        }
      })
  }

  const handleFollow = (tagId: number) => {
    request
      .post('/api/tag/follow', { tagId, type: TagType.Follow })
      .then((res: any) => {
        if (res?.code === 0) {
          message.success('关注成功')
          setRefresh(!refresh)
        } else {
          message.error(res?.msg || '关注失败')
        }
      })
  }

  return (
    <div className="content-layout">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: '已关注标签',
            key: 'follow',
            children: (
              <div className={styles.tags}>
                {followTags.map(tag => (
                  <div key={tag.title} className={styles.tagWrapper}>
                    <div>{(Icons as any)[tag.icon!].render()}</div>
                    <div className={styles.title}>{tag.title}</div>
                    <div>
                      {tag.follow_count} 关注 {tag.article_count} 文章
                    </div>
                    <Button
                      type="primary"
                      onClick={() => handleUnFollow(tag.id)}
                    >
                      已关注
                    </Button>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: '全部标签',
            key: 'all',
            children: (
              <div className={styles.tags}>
                {allTags.map(tag => (
                  <div key={tag.title} className={styles.tagWrapper}>
                    <div>{(Icons as any)[tag.icon!].render()}</div>
                    <div className={styles.title}>{tag.title}</div>
                    <div>
                      {tag.follow_count} 关注 {tag.article_count} 文章
                    </div>
                    {tag.users?.find(u => u.id === user?.userId) ? (
                      <Button
                        type="primary"
                        onClick={() => handleUnFollow(tag.id)}
                      >
                        已关注
                      </Button>
                    ) : (
                      <Button onClick={() => handleFollow(tag.id)}>关注</Button>
                    )}
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: 'Tab 3',
            key: '3',
            children: 'Tab 3',
          },
        ]}
      />
    </div>
  )
}
