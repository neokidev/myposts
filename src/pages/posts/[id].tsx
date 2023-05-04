import { MainLayout } from '@/components/Layout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { prisma } from '@/server/prisma'
import { api } from '@/utils/api'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, type FC } from 'react'

type Post = {
  title: string
  content: string
}

type Props = {
  publishedPost: Post | null
}

type Params = {
  id: string
}

type InnerProps = {
  post: Post
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return {
      props: {
        publishedPost: null,
      },
    }
  }

  const publishedPost = await prisma.post.findFirst({
    where: {
      id: params.id,
      published: true,
    },
  })
  if (publishedPost === null) {
    return {
      props: {
        publishedPost: null,
      },
    }
  }

  return {
    props: {
      publishedPost: {
        title: publishedPost.title,
        content: publishedPost.content ?? '',
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const publishedPosts = await prisma.post.findMany({
    select: {
      id: true,
    },
    where: { published: true },
  })

  return {
    paths: publishedPosts.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    fallback: 'blocking',
  }
}

const Inner: FC<InnerProps> = ({ post }) => {
  return (
    <>
      <h1 className="mb-4 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
        {post.title}
      </h1>
      <MarkdownRenderer content={post.content} />
    </>
  )
}

const PostPage: NextPage<Props> = ({ publishedPost }) => {
  const { data: session, status: sessionStatus } = useSession()
  console.log('session:', session)
  const router = useRouter()
  const { id } = router.query

  if (id === undefined || Array.isArray(id)) {
    throw new Error('id is undefined or array')
  }

  const {
    data: draftPost,
    isLoading: isDraftPostLoading,
    refetch,
  } = api.post.getCurrentUserPost.useQuery(
    {
      id,
      published: false,
    },
    {
      refetchOnMount: false,
      select: (data): Post | undefined => {
        if (data === null) {
          return undefined
        }
        return {
          title: data.title,
          content: data.content ?? '',
        }
      },
    }
  )

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      refetch().catch(() => {
        throw new Error('refetch failed')
      })
    }
  }, [sessionStatus, refetch])

  if (
    publishedPost === null &&
    (sessionStatus === 'loading' || isDraftPostLoading)
  ) {
    return null
  }

  if (publishedPost === null && draftPost == null) {
    router.replace('/404').catch(() => {
      throw new Error('redirect failed')
    })
    return null
  }

  const post = publishedPost ?? draftPost ?? undefined

  return (
    <MainLayout className="max-w-3xl">
      {post !== undefined && <Inner post={post} />}
    </MainLayout>
  )
}

export default PostPage
