import { BlankLayout } from '@/components/Layout'
import { EditPost, type EditPostValues } from '@/features/edit-post'
import { prisma } from '@/server/prisma'
import { api } from '@/utils/api'
import { type GetServerSideProps, type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast.error('Cannot update post')

type Props = {
  post: {
    id: string
    title: string
    content: string
    published: boolean
  }
}

type Params = {
  id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
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

  return {
    props: {
      post: {
        id: post.id,
        title: post.title,
        content: post.content ?? '',
        published: post.published,
      },
    },
  }
}

const EditPage: NextPage<Props> = ({ post }) => {
  const router = useRouter()

  const updatePost = api.post.updatePost.useMutation({
    onSuccess: async () => {
      await router.push('/dashboard')
    },
    onError: () => {
      notify()
    },
  })

  const handleSubmit = useCallback(
    (values: EditPostValues) => {
      updatePost.mutate({ id: post.id, ...values })
    },
    [post.id, updatePost]
  )

  return (
    <BlankLayout>
      <EditPost
        backUrl="/dashboard"
        onSubmit={handleSubmit}
        initialValues={post}
      />
      <Toaster />
    </BlankLayout>
  )
}

export default EditPage
