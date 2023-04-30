import { MainLayout } from '@/components/Layout'
import { Navbar } from '@/features/dashboard'
import { PostList } from '@/features/dashboard/components/PostList'
import { api } from '@/utils/api'
import { type Post } from '@prisma/client'
import { type NextPage } from 'next'
import Link from 'next/link'
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
          <Link href="/posts/new">
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100">
              New Post
            </button>
          </Link>
          <PostListArea />
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
