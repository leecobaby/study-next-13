import { Button } from 'antd'
import type { Tag } from '../page'
import styles from '../index.module.scss'

export function TagCell({ tags }: { tags: Tag[] }) {
  return (
    <div className={styles.tags}>
      {tags.map(tag => (
        <div key={tag.title} className={styles.tagWrapper}>
          <div>{Icons[tag.icon!].render()}</div>
          <div className={styles.title}>{tag.title}</div>
          <div>
            {tag.follow_count} 关注 {tag.article_count} 文章
          </div>
          {tag.users?.find(u => u.id === user?.userId) ? (
            <Button type="primary" onClick={() => handleUnFollow(tag.id)}>
              已关注
            </Button>
          ) : (
            <Button onClick={() => handleUnFollow(tag.id)}>关注</Button>
          )}
        </div>
      ))}
    </div>
  )
}
