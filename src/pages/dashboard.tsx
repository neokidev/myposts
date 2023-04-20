import { MainLayout } from '@/components/Layout'
import { Navbar } from '@/features/dashboard'
import { PostList } from '@/features/dashboard/components/PostList'
import { api } from '@/utils/api'
import { type Post } from '@prisma/client'
import { type NextPage } from 'next'
import { useCallback } from 'react'

const createEditPostUrl = (post: Post) => {
  return `/post/${post.id}/edit`
}

const PostListArea = () => {
  const { data: posts, refetch } = api.post.getCurrentUserPosts.useQuery()
  const deleteMutation = api.post.deletePost.useMutation({
    onSuccess: () => {
      refetch().catch(() => {
        throw new Error('Failed to refetch posts')
      })
    },
  })

  const handleDeletePost = useCallback(
    (post: Post) => deleteMutation.mutate({ postId: post.id }),
    [deleteMutation]
  )

  if (posts === undefined) {
    return null
  }

  return (
    <PostList
      posts={posts}
      editPostUrl={createEditPostUrl}
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
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100">
            New Post
          </button>
          <PostListArea />
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
