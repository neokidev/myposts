import { MainLayout } from '@/components/Layout/components/MainLayout'
import { PostCardGrid } from '@/features/post-card/components/PostCardGrid'
import { usePublishedPosts } from '@/features/post-card/hooks/usePublishedPosts'
import { type Post } from '@/features/post-card/types/post'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/prisma'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import superjson from 'superjson'

const generatePostUrl = (post: Post) => {
  return `/posts/${post.id}`
}

const generateAuthorUrl = (post: Post) => {
  return `/users/${post.authorName}`
}

type Props = {
  user: {
    id: string
    name: string
  }
}

type Params = {
  name: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return { notFound: true }
  }

  const users = await prisma.user.findMany({
    where: {
      name: params.name,
    },
  })

  if (users.length === 0) {
    return { notFound: true }
  }

  if (users.length > 1) {
    throw new Error('Multiple users with the same name')
  }

  const user = users[0]
  if (user === undefined || user.name === null) {
    return { notFound: true }
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  })

  await helpers.post.getPublishedPosts.prefetch({
    page: 1,
    pageSize: 20,
    authorId: user.id,
  })

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: {
        id: user.id,
        name: user.name,
      },
      revalidate: 10,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
    },
  })

  return {
    paths: users
      .filter((user) => user.name !== null)
      .map((user) => ({
        params: {
          name: user.name as string,
        },
      })),
    fallback: 'blocking',
  }
}

const UserPage: NextPage<Props> = ({ user }) => {
  const { data: posts, isLoading } = usePublishedPosts({ authorId: user.id })

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6">{`${user.name}'s Posts`}</h1>
        <PostCardGrid
          posts={posts}
          isLoading={isLoading}
          postUrl={generatePostUrl}
          authorUrl={generateAuthorUrl}
        />
      </div>
    </MainLayout>
  )
}

export default UserPage
