import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
  getPublishedPosts: publicProcedure
    .input(
      z.object({
        page: z.number().int(),
        pageSize: z.number().int(),
        authorId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        include: {
          author: true,
        },
        where: { published: true, authorId: input.authorId },
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

  getCurrentUserPost: protectedProcedure
    .input(
      z.object({ id: z.string().cuid(), published: z.boolean().optional() })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirst({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
          published: input.published,
        },
      })
    }),

  getCurrentUserPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { authorId: ctx.session.user.id },
    })
  }),

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          published: input.published,
          authorId: ctx.session.user.id,
        },
      })
    }),

  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        title: z.string().min(1),
        content: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      })

      if (post === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to update. Post not found.',
        })
      }

      if (post.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message:
            'Failed to update. You do not have permission to update this post.',
        })
      }

      return ctx.prisma.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          published: input.published,
        },
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
