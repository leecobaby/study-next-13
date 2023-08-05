import { Prisma } from '@prisma/client'

export const tagStruct = Prisma.validator<Prisma.TagArgs>()({
  include: {
    users: true,
    articles: true,
  },
})

export type Tag = Prisma.TagGetPayload<typeof tagStruct>

export enum TagType {
  Follow,
  UnFollow,
}

export const articleStruct = Prisma.validator<Prisma.ArticleArgs>()({
  include: {
    user: true,
    tags: true,
  },
})

export type Article = Prisma.ArticleGetPayload<typeof articleStruct>
