import Link from 'next/link'
import { Prisma } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { markdownToTxt } from 'markdown-to-txt'
import { EyeOutlined, Avatar } from './Client'
import styles from './ListItem.module.scss'

const articleWithUser = Prisma.validator<Prisma.ArticleArgs>()({
  include: { user: true },
})
type ArticleWithUser = Prisma.ArticleGetPayload<typeof articleWithUser>

interface Props {
  article: ArticleWithUser
}
export function ListItem(props: Props) {
  const { article } = props
  const { user } = article
  return (
    <Link href={`/article/${article.id}`}>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.userInfo}>
            <span className={styles.name}>{user?.nickname}</span>
            <span className={styles.date}>
              {formatDistanceToNow(article.update_time!)}
            </span>
          </div>
          <h4 className={styles.title}>{article.title}</h4>
          <p className={styles.content}>{markdownToTxt(article.content!)}</p>
          <div className={styles.statistics}>
            <EyeOutlined />
            <span>{article.views}</span>
          </div>
        </div>
        <Avatar src={user?.avatar} size={48} />
      </div>
    </Link>
  )
}
