import { MainLayout } from '@/components/Layout/components/MainLayout'
import { PostCardGrid } from '@/features/post-card/components/PostCardGrid'
import { type Post } from '@/features/post-card/types/post'
import { prisma } from '@/server/prisma'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import Image from 'next/image'

const generatePostUrl = (post: Post) => {
  return `/posts/${post.id}`
}

type Props = {
  user: {
    id: string
    name: string
    image?: string
    posts: Post[]
  }
}

type Params = {
  name: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return { notFound: true }
  }

  const users = await prisma.user.findMany({
    where: {
      name: params.name,
    },
    include: {
      Post: {
        where: {
          published: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (users.length === 0) {
    return { notFound: true }
  }

  if (users.length > 1) {
    throw new Error('Multiple users with the same name')
  }

  const user = users[0]
  if (user === undefined || user.name === null) {
    return { notFound: true }
  }

  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        image: user.image ?? undefined,
        posts: user.Post.map((post) => ({
          id: post.id,
          title: post.title,
          authorName: user.name ?? '',
          authorImage: user.image ?? undefined,
          createdAt: post.createdAt,
        })),
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
    },
  })

  return {
    paths: users
      .filter((user) => user.name !== null)
      .map((user) => ({
        params: {
          name: user.name as string,
        },
      })),
    fallback: 'blocking',
  }
}

const UserPage: NextPage<Props> = ({ user }) => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        {user.image !== undefined && (
          <div className="mb-4 relative w-28 h-28 rounded-full overflow-hidden">
            <Image src={user.image} alt="user-avatar" fill />
          </div>
        )}
        <h1 className="text-4xl font-extrabold mb-6">{`${user.name}'s Posts`}</h1>
        <PostCardGrid
          posts={user.posts}
          postUrl={generatePostUrl}
          showAuthor={false}
        />
      </div>
    </MainLayout>
  )
}

export default UserPage
