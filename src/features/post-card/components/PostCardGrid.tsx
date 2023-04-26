import { PostCard } from '@/features/post-card/components/PostCard'
import { type Post } from '@/features/post-card/types/post'
import { type FC } from 'react'

type PostCardGridProps = {
  posts: Post[]
}

export const PostCardGrid: FC<PostCardGridProps> = ({ posts }) => {
  return (
    <div className="flex">
      <div className="m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="w-[18rem]">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
