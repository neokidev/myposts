import { type Post } from '@/features/post-card/types/post'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

dayjs.extend(relativeTime)

export type PostCardProps = {
  post: Post
  postUrl: string
}

export const PostCard: FC<PostCardProps> = ({ post, postUrl }) => {
  return (
    <article className="overflow-hidden rounded-lg border shadow-lg group">
      <Link href={postUrl} className="relative h-40 overflow-hidden block">
        <Image
          alt="Placeholder"
          src="https://picsum.photos/600/400/?random"
          fill
          className="group-hover:scale-125 ease-in-out duration-300"
        />
      </Link>
      <div className="p-4 space-y-3">
        <Link href={postUrl}>
          <h1 className="inline text-xl font-bold line-clamp-3 hover:text-gray-600">
            {post.title}
          </h1>
        </Link>
        <div className="flex items-center space-x-1.5">
          {post.authorImage && (
            <Link
              href="#"
              className="relative w-7 h-7 rounded-full overflow-hidden hover:opacity-75"
            >
              <Image alt="user-avatar" src={post.authorImage} fill />
            </Link>
          )}
          <Link
            href="#"
            className="inline text-sm no-underline hover:underline "
          >
            {post.authorName}
          </Link>
        </div>
        <div className="text-xs text-gray-500 font-light">
          {dayjs(post.createdAt).fromNow()}
        </div>
      </div>
    </article>
  )
}
