import { type Post } from '@prisma/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

dayjs.extend(relativeTime)

type PostCardProps = {
  post: Post
  authorName: string
  width?: number
}

export const PostCard: FC<PostCardProps> = ({ post, authorName, width }) => {
  return (
    <article
      className="overflow-hidden rounded-lg border shadow-lg group"
      style={{ width: width !== undefined ? `${width}px` : undefined }}
    >
      <Link href="#">
        <div className="relative h-40 overflow-hidden">
          <Image
            alt="Placeholder"
            src="https://picsum.photos/600/400/?random"
            fill
            className="group-hover:scale-125 ease-in-out duration-500"
          />
        </div>
        <div className="p-4 space-y-3">
          <h1 className="text-xl font-bold line-clamp-3 group-hover:text-gray-600">
            {post.title}
          </h1>
          <Link
            className="flex items-center no-underline hover:underline"
            href="#"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden">
              <Image
                alt="Placeholder"
                src="https://picsum.photos/32/32/?random"
                fill
              />
            </div>
            <p className="ml-1.5 text-sm">{authorName}</p>
          </Link>
          <div className="text-xs text-gray-500 font-light">
            {dayjs(post.createdAt).fromNow()}
          </div>
        </div>
      </Link>
    </article>
  )
}
