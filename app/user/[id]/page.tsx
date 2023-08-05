import Link from 'next/link'
import { Avatar, Button, Divider } from './page-client'
import { CodeOutlined, FireOutlined, FundOutlined } from './page-client'
import prisma from '@/lib/prisma'
import { ListItem } from '@/components/ListItem'
import styles from './index.module.scss'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  console.log('params', params)
  const { id } = params
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      articles: {
        include: {
          user: true,
        },
      },
    },
  })
  console.log(user)
  const articles = user?.articles
  const viewsTotal = articles?.reduce((acc, cur) => acc + (cur.views ?? 0), 0)

  return (
    <div className={styles.userDetail}>
      <div className={styles.left}>
        <div className={styles.userInfo}>
          <Avatar className={styles.avatar} size={100} src={user?.avatar} />
          <div>
            <div className={styles.nickname}>{user?.nickname}</div>
            <div className={styles.desc}>
              <CodeOutlined /> {user?.job ?? '暂无'}
            </div>
            <div className={styles.desc}>
              <FireOutlined /> {user?.introduce ?? '暂无'}
            </div>
          </div>
          <Link href={`/user/edit`}>
            <Button type="primary">编辑资料</Button>
          </Link>
        </div>
        <Divider />
        <div className={styles.article}>
          {articles?.map(article => (
            <div key={article.id} className={styles.articleItem}>
              <ListItem article={article} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.achievement}>
          <div className={styles.header}>个人成就</div>
          <div className={styles.number}>
            <div className={styles.wrapper}>
              <FundOutlined />
              <span>文章总数 {articles?.length}</span>
            </div>
            <div className={styles.wrapper}>
              <FundOutlined />
              <span>阅读总数 {viewsTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
