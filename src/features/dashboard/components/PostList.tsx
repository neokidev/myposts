import { PostItemSkeleton } from '@/features/dashboard/components/PostItemSkeleton'
import { type Post } from '@prisma/client'
import range from 'lodash/range'
import { type FC } from 'react'
import { PostItem } from './PostItem'

type PostListProps = { posts?: Post[] } & (
  | {
      isLoading?: false
      postUrl: (post: Post) => string
      editPostUrl: (post: Post) => string
      onDeletePost: (post: Post) => void
    }
  | {
      isLoading: true
      postUrl?: (post: Post) => string
      editPostUrl?: (post: Post) => string
      onDeletePost?: (post: Post) => void
    }
)

export const PostList: FC<PostListProps> = ({
  posts,
  isLoading,
  postUrl,
  editPostUrl,
  onDeletePost,
}) => {
  return (
    <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {isLoading
        ? range(5).map((index) => <PostItemSkeleton key={index} />)
        : posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              postUrl={postUrl(post)}
              editUrl={editPostUrl(post)}
              onDelete={onDeletePost}
            />
          ))}
    </div>
  )
}
