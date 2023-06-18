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
  authorName: string
}

type Props = {
  postId: string
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
    throw new Error('params is undefined')
  }

  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  })

  if (post === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  } else if (post.published === false) {
    return {
      props: {
        postId: post.id,
        publishedPost: null,
      },
    }
  }

  if (post.author.name === null) {
    throw new Error('Post author name is null')
  }

  return {
    props: {
      postId: post.id,
      publishedPost: {
        title: post.title,
        content: post.content ?? '',
        authorName: post.author.name,
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

const RedirectTo404: FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/404').catch(() => {
      throw new Error('redirect failed')
    })
  }, [router])

  return null
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

const PostPage: NextPage<Props> = ({ postId, publishedPost }) => {
  const { status: sessionStatus } = useSession()

  const {
    data: draftPost,
    isLoading: isDraftPostLoading,
    refetch: refetchDraftPost,
  } = api.post.getCurrentUserPost.useQuery(
    {
      id: postId,
      published: false,
    },
    {
      enabled: false,
      select: (data): Post | undefined => {
        if (data === null) {
          return undefined
        } else if (data.author.name === null) {
          throw new Error('Post author name is null')
        }

        return {
          title: data.title,
          content: data.content ?? '',
          authorName: data.author.name,
        }
      },
    }
  )

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      refetchDraftPost().catch(() => {
        throw new Error('refetch failed')
      })
    }
  }, [sessionStatus, refetchDraftPost])

  if (
    publishedPost === null &&
    (sessionStatus === 'loading' || isDraftPostLoading)
  ) {
    return null
  }

  const post = publishedPost ?? draftPost ?? undefined

  return (
    <MainLayout className="max-w-3xl">
      {post === undefined ? <RedirectTo404 /> : <Inner post={post} />}
    </MainLayout>
  )
}

export default PostPage
