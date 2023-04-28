import { PostCard } from '@/features/post-card/components/PostCard'
import { PostCardSkeleton } from '@/features/post-card/components/PostCardSkeleton'
import { type Post } from '@/features/post-card/types/post'
import range from 'lodash/range'
import { type FC } from 'react'

type PostCardGridProps = { posts?: Post[] } & (
  | {
      isLoading: true
      postUrl?: (post: Post) => string
    }
  | {
      isLoading?: false
      postUrl: (post: Post) => string
    }
) &
  (
    | {
        showAuthor: true
        authorUrl: (post: Post) => string
      }
    | {
        showAuthor: false
        authorUrl?: (post: Post) => string
      }
  )

export const PostCardGrid: FC<PostCardGridProps> = ({
  posts,
  isLoading,
  postUrl,
  authorUrl,
  showAuthor,
}) => {
  if (showAuthor && authorUrl === undefined) {
    throw new Error('authorUrl is required if showAuthor is true')
  }

  return (
    <div className="flex">
      <div className="m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? range(10).map((index) => (
                <div key={index} className="w-[18rem]">
                  <PostCardSkeleton key={index} />
                </div>
              ))
            : posts?.map((post) => (
                <div key={post.id} className="w-[18rem]">
                  {showAuthor && authorUrl !== undefined ? (
                    <PostCard
                      post={post}
                      postUrl={postUrl(post)}
                      authorUrl={authorUrl(post)}
                      showAuthor={true}
                    />
                  ) : (
                    <PostCard
                      post={post}
                      postUrl={postUrl(post)}
                      showAuthor={false}
                    />
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
