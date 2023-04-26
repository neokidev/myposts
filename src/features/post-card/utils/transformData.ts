import { type Post } from '@/features/post-card/types/post'
import { type Post as PrismaPost } from '@prisma/client'

export const transformPost = (post: PrismaPost): Post => {
  return {
    id: post.id,
    title: post.title,
    authorName: 'TODO: authorName',
    createdAt: post.createdAt,
  }
}
