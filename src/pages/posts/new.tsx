import { BlankLayout } from '@/components/Layout'
import {
  EditPost,
  type EditPostValues,
} from '@/features/edit-post/pages/EditPost'
import { api } from '@/utils/api'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast.error('Cannot create post')

const NewPage: NextPage = () => {
  const router = useRouter()

  const createPost = api.post.createPost.useMutation({
    onSuccess: async () => {
      await router.push('/dashboard')
    },
    onError: () => {
      notify()
    },
  })

  const handleSubmit = useCallback(
    (values: EditPostValues) => {
      createPost.mutate(values)
    },
    [createPost]
  )

  return (
    <BlankLayout>
      <EditPost backUrl="/dashboard" onSubmit={handleSubmit} />
      <Toaster />
    </BlankLayout>
  )
}

export default NewPage
