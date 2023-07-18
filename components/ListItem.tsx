import Link from 'next/link'
import styles from './ListItem.module.css'
import { Prisma } from '@prisma/client'

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
    <div>
      <Link href={`/article/${article.id}`}>
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.userInfo}>
              <span className={styles.name}>{user?.nickname}</span>
              <span className={styles.date}>
                {article.update_time?.toDateString()}
              </span>
            </div>
            <h4 className={styles.title}>{article.title}</h4>
            <p className={styles.content}>{article.content}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
