import { type Post } from '@/features/post-card/types/post'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

dayjs.extend(relativeTime)

export type PostCardProps = {
  post: Post
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <article className="overflow-hidden rounded-lg border shadow-lg group">
      <Link href="#">
        <div className="relative h-40 overflow-hidden">
          <Image
            alt="Placeholder"
            src="https://picsum.photos/600/400/?random"
            fill
            className="group-hover:scale-125 ease-in-out duration-300"
          />
        </div>
        <div className="p-4 space-y-3">
          <h1 className="text-xl font-bold line-clamp-3 group-hover:text-gray-600">
            {post.title}
          </h1>
          <Link
            className="flex items-center no-underline hover:underline space-x-1.5"
            href="#"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden">
              <Image
                alt="Placeholder"
                src="https://picsum.photos/32/32/?random"
                fill
              />
            </div>
            <p className="text-sm">{post.authorName}</p>
          </Link>
          <div className="text-xs text-gray-500 font-light">
            {dayjs(post.createdAt).fromNow()}
          </div>
        </div>
      </Link>
    </article>
  )
}
