import { DropdownMenu } from '@/components/DropdownMenu'
import { SubmitButtonItem } from '@/features/edit-post/components/SubmitButtonItem'
import { useCallback, useEffect, useState, type FC } from 'react'
import { usePreviousDifferent } from 'rooks'

type SubmitButtonProps = {
  disabled?: boolean
  published?: boolean
  onChangePublished?: (published: boolean) => void
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  disabled,
  published,
  onChangePublished,
}) => {
  const [_published, setPublished] = useState(published ?? true)
  const prevPublished = usePreviousDifferent(_published)
  const handlePublishMenuClicked = useCallback(() => setPublished(true), [])
  const handleDraftMenuClicked = useCallback(() => setPublished(false), [])

  useEffect(() => {
    published !== undefined && setPublished(published)
  }, [published])

  useEffect(() => {
    if (prevPublished !== null) {
      onChangePublished?.(_published)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevPublished])

  return (
    <div className="flex h-10">
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-l-md border-r border-gray-500 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {_published ? 'Publish' : 'Draft'}
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="inline-flex items-center justify-center rounded-r-md bg-gray-900 px-3 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <svg
              aria-hidden="true"
              viewBox="0 0 8 6"
              width="8"
              height="6"
              fill="none"
              className="stroke-white"
            >
              <path
                d="M7 1.5l-3 3-3-3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-80" align="end">
          <DropdownMenu.Item>
            <SubmitButtonItem
              label="Publish"
              description="This post can be viewed by anyone"
              selected={_published}
              onClick={handlePublishMenuClicked}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <SubmitButtonItem
              label="Draft"
              description="This post will not be publicly accessible"
              selected={!_published}
              onClick={handleDraftMenuClicked}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
