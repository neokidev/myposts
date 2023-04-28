import { MainLayout } from '@/components/Layout/components/MainLayout'
import { PostCardGrid } from '@/features/post-card/components/PostCardGrid'
import { usePublishedPosts } from '@/features/post-card/hooks/usePublishedPosts'
import { type Post } from '@/features/post-card/types/post'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/prisma'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { type GetServerSideProps, type NextPage } from 'next'
import superjson from 'superjson'

const generatePostUrl = (post: Post) => {
  return `/posts/${post.id}`
}

const generateAuthorUrl = (post: Post) => {
  return `/users/${post.authorName}`
}

export const getServerSideProps: GetServerSideProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  })

  await helpers.post.getPublishedPosts.prefetch({
    page: 1,
    pageSize: 20,
  })

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  }
}

const Home: NextPage = () => {
  const { data: posts, isLoading } = usePublishedPosts()

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6">New Posts</h1>
        <PostCardGrid
          posts={posts}
          isLoading={isLoading}
          postUrl={generatePostUrl}
          authorUrl={generateAuthorUrl}
          showAuthor
        />
      </div>
    </MainLayout>
  )
}

export default Home
