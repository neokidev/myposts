import { type Post } from '@/features/dashboard/types/post'
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
    <div className="flex flex-col space-y-2">
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
