import { MainLayout } from '@/components/Layout/components/MainLayout'
import { PostCardGrid } from '@/features/post-card/components/PostCardGrid'
import { usePublishedPosts } from '@/features/post-card/hooks/usePublishedPosts'
import { type Post } from '@/features/post-card/types/post'
import { type NextPage } from 'next'

const generatePostUrl = (post: Post) => {
  return `/posts/${post.id}`
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
        />
      </div>
    </MainLayout>
  )
}

export default Home
