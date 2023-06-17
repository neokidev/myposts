import { MainLayout } from '@/components/Layout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { prisma } from '@/server/prisma'
import { api } from '@/utils/api'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, type FC } from 'react'

type Post = {
  title: string
  content: string
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

  console.log('else')
  return {
    props: {
      postId: post.id,
      publishedPost: {
        title: post.title,
        content: post.content ?? '',
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
      {post !== undefined && <Inner post={post} />}
    </MainLayout>
  )
}

export default PostPage
