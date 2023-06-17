import { MainLayout } from '@/components/Layout'
import { Navbar } from '@/features/dashboard'
import { PostList } from '@/features/dashboard/components/PostList'
import { api } from '@/utils/api'
import { revalidatePost } from '@/utils/revalidate'
import { type Post } from '@prisma/client'
import { type NextPage } from 'next'
import { useCallback } from 'react'

const generatePostUrl = (post: Post) => {
  return `/posts/${post.id}`
}

const generateEditPostUrl = (post: Post) => {
  return `/posts/${post.id}/edit`
}

const PostListArea = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = api.post.getCurrentUserPosts.useQuery()
  const deleteMutation = api.post.deletePost.useMutation({
    onSuccess: async (post) => {
      await revalidatePost(post.id)
      await refetch()
    },
  })

  const handleDeletePost = useCallback(
    (post: Post) => deleteMutation.mutate({ postId: post.id }),
    [deleteMutation]
  )

  return (
    <PostList
      posts={posts}
      isLoading={isLoading}
      postUrl={generatePostUrl}
      editPostUrl={generateEditPostUrl}
      onDeletePost={handleDeletePost}
    />
  )
}

const DashboardPage: NextPage = () => {
  return (
    <MainLayout isProtected>
      <div className="grid gap-12 md:grid-cols-[12rem_1fr]">
        <Navbar />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Posts</h1>
          <PostListArea />
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
