import { MainLayout } from '@/components/Layout'
import { prisma } from '@/server/prisma'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'

type Props = {
  post: { id: string }
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

  return { props: { post: { id: post.id } } }
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
    <MainLayout>
      <div>Post ID: {post.id}</div>
    </MainLayout>
  )
}

export default PostPage
