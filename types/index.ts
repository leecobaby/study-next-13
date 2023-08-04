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