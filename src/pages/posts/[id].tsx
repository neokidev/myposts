import { MainLayout } from '@/components/Layout'
import { MarkdownRenderer } from '@/components/MarkdownRenderer/components/MarkdownRenderer'
import { prisma } from '@/server/prisma'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'

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
    post.content !== null
      ? await serialize(post.content, {
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        })
      : undefined

  return {
    props: {
      post: {
        title: post.title,
        serializedContent,
      },
    },
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

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <MainLayout className="max-w-3xl">
      <h1 className="mb-4 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
        {post.title}
      </h1>
      {post.serializedContent !== undefined && (
        <MarkdownRenderer content={post.serializedContent} />
      )}
    </MainLayout>
  )
}

export default PostPage
