import { MainLayout } from '@/components/Layout/components/MainLayout'
import { PostCardGrid } from '@/features/post-card/components/PostCardGrid'
import { transformPost } from '@/features/post-card/utils/transformData'
import { api } from '@/utils/api'
import { type NextPage } from 'next'

const Home: NextPage = () => {
  const { data: posts } = api.post.getPublishedPosts.useQuery({
    page: 1,
    pageSize: 20,
  })

  const transformedPosts = posts?.map((post) => transformPost(post))

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6">New Posts</h1>
        {transformedPosts && <PostCardGrid posts={transformedPosts} />}
      </div>
    </MainLayout>
  )
}

export default Home
