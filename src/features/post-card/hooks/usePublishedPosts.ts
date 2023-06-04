import { type Post } from '@/features/post-card/types/post'
import { api } from '@/utils/api'
import { type Post as PrismaPost, type User } from '@prisma/client'

type ApiResponse = (PrismaPost & {
  author: User
})[]

type UsePublishedPostsParams = {
  authorId?: string
}

const transformer = (response: ApiResponse): Post[] => {
  return response.map((post) => ({
    id: post.id,
    title: post.title,
    authorName: post.author.name ?? '',
    authorImage: post.author.image ?? undefined,
    createdAt: post.createdAt,
  }))
}

export const usePublishedPosts = (params?: UsePublishedPostsParams) => {
  return api.post.getPublishedPosts.useQuery(
    {
      page: 1,
      pageSize: 20,
      authorId: params?.authorId,
    },
    {
      select: transformer,
      enabled: false,
    }
  )
}
