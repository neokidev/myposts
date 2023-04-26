import ContentLoader from 'react-content-loader'

const backgroundColor = '#f3f3f3'
const foregroundColor = '#ecebeb'
const textRadius = '0.25rem'

const imageSkeletonUniqueKey = 'ImageSkeleton'
const ImageSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={imageSkeletonUniqueKey}
      speed={1}
      width={10000}
      height={160}
      viewBox="0 0 10000 160"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect x="0" y="0" width="10000" height="160" />
    </ContentLoader>
  )
}

const titleSkeletonUniqueKey = 'TitleSkeleton'
const TitleSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={titleSkeletonUniqueKey}
      speed={1}
      width={240}
      height={28}
      viewBox="0 0 240 28"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="4"
        rx={textRadius}
        ry={textRadius}
        width="240"
        height="20"
      />
    </ContentLoader>
  )
}

const authorAvatarSkeletonUniqueKey = 'AvatarTitleSkeleton'

const AuthorAvatarSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={authorAvatarSkeletonUniqueKey}
      speed={1}
      width={28}
      height={28}
      viewBox="0 0 28 28"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect rx="100%" ry="100%" width="28" height="28" />
    </ContentLoader>
  )
}

const authorNameSkeletonUniqueKey = 'authorNameSkeleton'
const AuthorNameSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={authorNameSkeletonUniqueKey}
      speed={1}
      width={80}
      height={16}
      viewBox="0 0 80 16"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="0"
        rx={textRadius}
        ry={textRadius}
        width="80"
        height="16"
      />
    </ContentLoader>
  )
}

const createdAtSkeletonUniqueKey = 'CreatedAtSkeleton'
const CreatedAtSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={createdAtSkeletonUniqueKey}
      speed={1}
      width={80}
      height={16}
      viewBox="0 0 80 16"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="2"
        rx={textRadius}
        ry={textRadius}
        width="80"
        height="12"
      />
    </ContentLoader>
  )
}

export const PostCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-lg border shadow-lg group">
      <ImageSkeleton />
      <div className="p-4 space-y-3">
        <TitleSkeleton />
        <div className="flex items-center no-underline hover:underline space-x-1.5">
          <AuthorAvatarSkeleton />
          <AuthorNameSkeleton />
        </div>
        <CreatedAtSkeleton />
      </div>
    </article>
  )
}
