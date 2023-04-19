import { type Post } from '@prisma/client'
import { type FC } from 'react'
import { PostItem } from './PostItem'

type PostListProps = {
  posts: Post[]
  editPostUrl: (post: Post) => string
  onDeletePost: (post: Post) => void
}

export const PostList: FC<PostListProps> = ({
  posts,
  editPostUrl,
  onDeletePost,
}) => {
  return (
    <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          editUrl={editPostUrl(post)}
          onDelete={() => onDeletePost(post)}
        />
      ))}
    </div>
  )
}