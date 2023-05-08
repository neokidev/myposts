import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { SubmitButton } from '@/features/edit-post/components/SubmitButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArticleOff } from '@tabler/icons-react'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState, type FC } from 'react'
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

type FormValues = {
  title: string
  content: string
}

export type EditPostValues = FormValues & {
  published: boolean
}

type Mode = 'edit' | 'preview'

const schema = z.object({
  title: z.string().min(1, { message: "Title can't be blank." }),
  content: z.string(),
})

const notify = () => toast.error("Title can't be blank")

type PreviewAreaProps = {
  title: string
  content: string
}

type EditPostProps = {
  backUrl: string
  onSubmit?: (values: EditPostValues) => void | Promise<void>
  initialValues?: EditPostValues
}

const NoContent = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-2 text-gray-400">
        <div className=" w-20 h-20 rounded-full bg-gray-100 flex justify-center items-center">
          <IconArticleOff size={32} strokeWidth={1.75} />
        </div>
        <div className="font-medium">No Content</div>
      </div>
    </div>
  )
}

const PreviewArea: FC<PreviewAreaProps> = ({ title, content }) => {
  return (
    <>
      {title === '' && content === '' ? (
        <NoContent />
      ) : (
        <>
          <h1 className="mb-4 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
            {title}
          </h1>
          <MarkdownRenderer content={content} />
        </>
      )}
    </>
  )
}

export const EditPost: FC<EditPostProps> = ({
  backUrl,
  onSubmit,
  initialValues,
}) => {
  const [published, setPublished] = useState(initialValues?.published ?? true)
  const [submitting, setSubmitting] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  const [mode, setMode] = useState<Mode>('edit')

  const handleEdit = () => setMode('edit')
  const handlePreview = () => setMode('preview')

  const { register, handleSubmit, getValues } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? '',
      content: initialValues?.content ?? '',
    },
  })

  const title = getValues('title')
  const content = getValues('content')

  const { ref, ...rest } = register('content')

  const _onSubmit: SubmitHandler<FormValues> = async ({ title, content }) => {
    setSubmitting(true)
    await onSubmit?.({ title, content, published })
    setSubmitting(false)
  }

  const onError: SubmitErrorHandler<FormValues> = () => notify()

  function autoResizeTextarea() {
    const textarea = contentRef.current
    if (textarea !== null) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    if (mode === 'edit') {
      autoResizeTextarea()
    }
  }, [mode])

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(_onSubmit, onError)}>
        <div className="flex flex-col bg-gray-50 min-h-screen">
          <header className="sticky top-0 z-10 h-16 backdrop-blur bg-gray-50/50">
            <div className="container mx-auto grid h-full w-full grid-cols-3 items-center">
              <div className="flex items-center justify-start">
                <Link
                  className="group flex text-sm font-medium leading-6 text-slate-500 hover:text-slate-600"
                  href={backUrl}
                >
                  <svg
                    viewBox="0 -9 3 24"
                    className="mr-3 h-6 w-auto overflow-visible text-slate-400 group-hover:text-slate-500"
                  >
                    <path
                      d="M3 0L0 3L3 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Go back
                </Link>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex items-center justify-end space-x-10">
                <div>
                  <button
                    type="button"
                    className={clsx(
                      'px-3 py-1.5 rounded-md hover:bg-gray-200',
                      mode === 'preview' && 'text-gray-400 hover:text-gray-500'
                    )}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      'px-3 py-1.5 rounded-md hover:bg-gray-200',
                      mode === 'edit' && 'text-gray-400 hover:text-gray-500'
                    )}
                    onClick={handlePreview}
                  >
                    Preview
                  </button>
                </div>
                <div className="flex justify-end w-[8rem]">
                  <SubmitButton
                    disabled={submitting}
                    published={published}
                    onChangePublished={setPublished}
                  />
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="flex-1 container pt-2 pb-8">
              <div className="rounded-lg border shadow-xl bg-white">
                {mode === 'edit' && (
                  <div className="flex flex-col px-12">
                    <div className="px-4 py-7">
                      <input
                        className="block w-full rounded-md ring-0 outline-none text-5xl font-extrabold"
                        placeholder="Post title here..."
                        {...register('title')}
                      />
                    </div>
                    <hr />
                    <div className="flex-1 px-4 py-8">
                      <textarea
                        className="w-full resize-none rounded-md outline-none ring-0 font-mono h-auto min-h-[20rem] overflow-hidden"
                        placeholder="Post content here..."
                        onInput={autoResizeTextarea}
                        {...rest}
                        ref={(e) => {
                          ref(e)
                          contentRef.current = e
                        }}
                      />
                    </div>
                  </div>
                )}
                {mode === 'preview' && (
                  <div className="flex flex-col px-12">
                    <div className="px-4 py-8">
                      <PreviewArea title={title} content={content} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </form>
      <Toaster />
    </>
  )
}
