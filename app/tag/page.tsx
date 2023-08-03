'use client'
import { useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'
import Icon from '@ant-design/icons'
import * as Icons from '@ant-design/icons'
import { Prisma } from '@prisma/client'
import { useSession } from '@/lib/session-client'
import { request } from '@/service'
import styles from './index.module.scss'

const tagStruct = Prisma.validator<Prisma.TagArgs>()({
  include: {
    users: true,
    articles: true,
  },
})

export type Tag = Prisma.TagGetPayload<typeof tagStruct>

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
  const session = useSession()
  const user = session?.user

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
  }, [user])

  const handleUnFollow = (tagId: number) => {
    request.post('/api/tag/unfollow', { tagId }).then((res: any) => {
      if (res?.code === 0) {
        const newFollowTags = followTags.filter(t => t.id !== tagId)
        setFollowTags(newFollowTags)
      }
    })
  }

  const handleFollow = (tagId: number) => {
    request.post('/api/tag/follow', { tagId }).then((res: any) => {
      if (res?.code === 0) {
        const newFollowTags = [...followTags, res.data]
        setFollowTags(newFollowTags)
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
                    <div>{Icons[tag.icon!].render()}</div>
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
                      <Button onClick={() => handleUnFollow(tag.id)}>
                        关注
                      </Button>
                    )}
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
                    <div>{Icons[tag.icon!].render()}</div>
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
                      <Button onClick={() => handleUnFollow(tag.id)}>
                        关注
                      </Button>
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
