import { MainLayout } from '@/components/Layout'
import { Navbar } from '@/features/dashboard'
import { PostList } from '@/features/dashboard/components/PostList'
import { api } from '@/utils/api'
import { type Post } from '@prisma/client'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const createEditPostUrl = (post: Post) => {
  return ''
}

const handleDeletePost = (post: Post) => {
  return
}

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session == null) {
      router.push('/').catch(() => {
        throw new Error()
      })
    }
  }, [])

  if (session == null) {
    return null
  }

  const { data: posts } = api.post.getCurrentUserPosts.useQuery()
  if (posts === undefined) {
    return null
  }

  return (
    <MainLayout>
      <div className="grid gap-12 md:grid-cols-[12rem_1fr]">
        <Navbar />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Posts</h1>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100">
            New Post
          </button>
          <PostList
            posts={posts}
            editPostUrl={createEditPostUrl}
            onDeletePost={handleDeletePost}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
