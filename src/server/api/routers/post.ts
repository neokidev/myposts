import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
  getPublishedPosts: publicProcedure
    .input(z.object({ page: z.number().int(), pageSize: z.number().int() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        include: {
          author: true,
        },
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        // skip: input.page * input.pageSize,
        // take: input.pageSize,
      })
    }),

  getUserPosts: publicProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        where: { authorId: input.userId },
      })
    }),

  getCurrentUserPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { authorId: ctx.session.user.id },
    })
  }),

  deletePost: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        select: { authorId: true },
      })

      if (post !== null && post.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message:
            'Failed to delete. You do not have permission to delete this post.',
        })
      }

      return ctx.prisma.post.delete({
        where: { id: input.postId },
      })
    }),
})
