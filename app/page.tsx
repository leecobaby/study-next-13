import { prisma } from '@/lib/prisma'
import { ListItem } from '@/components/ListItem'

export default async function Page() {
  const articles = await prisma.article.findMany({
    include: {
      user: true,
    },
  })
  console.log('articles', articles)
  return (
    <>
      <div>
        {articles?.map(article => (
          <ListItem key={article.id} article={article} />
        ))}
      </div>
    </>
  )
}
