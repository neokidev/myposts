import ContentLoader from 'react-content-loader'

const backgroundColor = '#f3f3f3'
const foregroundColor = '#ecebeb'
const textRadius = '0.25rem'
const buttonRadius = '0.5rem'

const titleSkeletonUniqueKey = 'TitleSkeleton'
const TitleSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={titleSkeletonUniqueKey}
      speed={1}
      width={320}
      height={28}
      viewBox="0 0 320 28"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="4"
        rx={textRadius}
        ry={textRadius}
        width="320"
        height="20"
      />
    </ContentLoader>
  )
}

const updatedAtSkeletonUniqueKey = 'UpdatedAtSkeleton'
const UpdatedAtSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={updatedAtSkeletonUniqueKey}
      speed={1}
      width={160}
      height={20}
      viewBox="0 0 160 20"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="4"
        rx={textRadius}
        ry={textRadius}
        width="160"
        height="14"
      />
    </ContentLoader>
  )
}

const buttonSkeletonUniqueKey = 'ButtonSkeleton'
const ButtonSkeleton = () => {
  return (
    <ContentLoader
      uniqueKey={buttonSkeletonUniqueKey}
      speed={1}
      width={34}
      height={34}
      viewBox="0 0 34 34"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect
        x="0"
        y="0"
        rx={buttonRadius}
        ry={buttonRadius}
        width="34"
        height="34"
      />
    </ContentLoader>
  )
}

export const PostItemSkeleton = () => {
  return (
    <div className="flex items-center px-5 py-4">
      <div className="min-w-0 flex-1 pr-4">
        <div className="flex items-center space-x-1">
          <TitleSkeleton />
        </div>
        <UpdatedAtSkeleton />
      </div>
      <div className="col-span-1 flex items-center justify-center space-x-2">
        <ButtonSkeleton />
        <ButtonSkeleton />
      </div>
    </div>
  )
}
