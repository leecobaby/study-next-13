import MarkDwon from 'markdown-to-jsx'
import { format } from 'date-fns'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { Avatar, Divider } from '@/components/Client'
import { Comment, EditLink } from './page-client'
import styles from './index.module.scss'
import 'github-markdown-css'

const articleStruct = Prisma.validator<Prisma.ArticleArgs>()({
  include: { user: true, comments: { include: { user: true } } },
})
export type Article = Prisma.ArticleGetPayload<typeof articleStruct>
type Comments = Article['comments']

interface Props {
  params: { id: string }
}

export async function generateMetadata(props: Props) {
  const { params } = props
  // const article = await getArticleDetail(Number(params.id))
  return {
    title: 'Blog',
    description: 'Generated by create next app | Blog',
  }
}

export default async function ArticleDetail({ params }: Props) {
  const article = await getArticleDetail(Number(params.id))
  console.log(article)
  const { user, comments } = article

  return (
    <div>
      <div className="content-layout">
        <h2 className={styles.title}>{article?.title}</h2>
        <div className={styles.user}>
          <Avatar src={user?.avatar} size={50} />
          <div className={styles.info}>
            <div className={styles.name}>{user?.nickname}</div>
            <div className={styles.date}>
              <div>{format(article?.update_time!, 'yyyy-MM-dd hh:mm:ss')}</div>
              <div>阅读 {article?.views}</div>
              <EditLink id={article.id} userId={user?.id} />
            </div>
          </div>
        </div>
        <MarkDwon className="markdown-body">{article?.content!}</MarkDwon>
      </div>
      <div className={styles.divider}></div>
      <div className="content-layout">
        <div className={styles.comment}>
          <h3>评论</h3>
          <Comment article={article} />
        </div>
        <Divider />
        <CommentList comments={comments} />
      </div>
    </div>
  )
}

function CommentList({ comments }: { comments: Comments }) {
  return (
    <div className={styles.display}>
      {comments.map(comment => (
        <div key={comment.id} className={styles.warpper}>
          <div className={styles.user}>
            <Avatar src={comment.user?.avatar} size={40} />
            <div className={styles.info}>
              <div className={styles.name}>{comment.user?.nickname}</div>
              <div className={styles.date}>
                {format(comment.create_time!, 'yyyy-MM-dd hh:mm:ss')}
              </div>
              <div className={styles.content}>{comment.content}</div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  )
}

async function getArticleDetail(id: number) {
  const article = await prisma.article.update({
    where: {
      id,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          create_time: 'desc',
        },
      },
    },
    data: {
      views: {
        increment: 1,
      },
    },
  })
  return article
}
