import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
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
})
