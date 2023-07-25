import { prisma } from '@/lib/prisma'
import { ModifyEditor } from './page-client'

interface IProps {
  params: { id: string }
}

export default async function Page({ params }: IProps) {
  const article = await getArticleDetail(Number(params.id))

  return (
    <>
      <ModifyEditor article={article!} />
    </>
  )
}

async function getArticleDetail(id: number) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  })
  return article
}
