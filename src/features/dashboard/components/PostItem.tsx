import { DropdownMenu } from '@/components/DropdownMenu'
import { ConfirmDeleteModal } from '@/features/dashboard/components/ConfirmDeleteModal'
import { type Post } from '@prisma/client'
import { IconAlertCircle, IconDots, IconPencil } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useCallback, useState, type FC, type ReactNode } from 'react'

dayjs.extend(relativeTime)

const buttonClassName =
  'flex items-center rounded-lg border border-gray-200 bg-white p-2 text-xs font-medium text-gray-400 shadow-sm hover:bg-gray-50 hover:text-gray-500 focus:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 '

const DraftBadge = () => {
  return (
    <span className="mr-2 rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-500">
      Draft
    </span>
  )
}

type DetailButtonProps = {
  children: ReactNode
  deletePost: () => void
}

const DetailButton: FC<DetailButtonProps> = ({ children, deletePost }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const openModal = () => setIsModalOpened(true)
  const closeModal = useCallback(() => {
    setIsModalOpened(false)
  }, [setIsModalOpened])

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <button
                onClick={openModal}
                className="font-medium text-red-500 hover:bg-red-50"
              >
                <IconAlertCircle
                  className="mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Delete this post
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ConfirmDeleteModal
        isOpen={isModalOpened}
        onClose={closeModal}
        deletePost={deletePost}
      />
    </>
  )
}

type PostItemProps = {
  post: Post
  postUrl: string
  editUrl: string
  onDelete: (post: Post) => void
}

export const PostItem: FC<PostItemProps> = ({
  post,
  postUrl,
  editUrl,
  onDelete,
}) => {
  const deletePost = useCallback(() => onDelete(post), [post, onDelete])

  return (
    <div className="flex items-center px-5 py-4">
      <div className="min-w-0 flex-1 pr-4">
        <div className="flex items-center space-x-1">
          <Link href={postUrl}>
            <h5 className="break-words text-xl font-bold line-clamp-2 hover:text-gray-700">
              {post.title}
            </h5>
          </Link>
          <div className="pb-1">{!post.published && <DraftBadge />}</div>
        </div>
        <div className="text-sm font-light text-gray-400">
          updated {dayjs(post.updatedAt).fromNow()}
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center space-x-2">
        <Link href={editUrl} className={buttonClassName}>
          <IconPencil className="h-4 w-4" />
        </Link>
        <DetailButton deletePost={deletePost}>
          <button className={buttonClassName}>
            <IconDots className="h-4 w-4" />
          </button>
        </DetailButton>
      </div>
    </div>
  )
}
