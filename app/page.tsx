import { prisma } from '@/lib/prisma'
import { ListItem } from '@/components/ListItem'
import { Divider } from '@/components/Client'

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
        <div className="content-layout">
          {articles?.map(article => (
            <>
              <ListItem key={article.id} article={article} />
              <Divider />
            </>
          ))}
        </div>
      </div>
    </>
  )
}
