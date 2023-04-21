import { Hello } from '@/components/Hello'
import { MainLayout } from '@/components/Layout'
import { prisma } from '@/server/prisma'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

type Props = {
  post: {
    title: string
    serializedContent?: MDXRemoteSerializeResult
  }
}

type Params = {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return { notFound: true }
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  })
  if (post === null) {
    return { notFound: true }
  }

  const serializedContent =
    post.content !== null ? await serialize(post.content) : undefined

  return {
    props: { post: { title: post.title, serializedContent } },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  })

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
        post,
      },
    })),
    fallback: 'blocking',
  }
}

const components = { Hello }

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <MainLayout className="max-w-3xl">
      <h1>{post.title}</h1>
      {post.serializedContent !== undefined && (
        <MDXRemote {...post.serializedContent} components={components} />
      )}
    </MainLayout>
  )
}

export default PostPage
