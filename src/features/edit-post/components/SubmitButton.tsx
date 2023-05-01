import { Menu } from '@headlessui/react'
import { useEffect, useState, type FC } from 'react'
import { usePreviousDifferent } from 'rooks'
import { SubmitButtonItem } from './SubmitButtonItem'

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
    <div className="relative inline-flex text-right h-10">
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-l-md border-r border-gray-500 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100"
      >
        {_published ? 'Publish' : 'Draft'}
      </button>
      <Menu>
        <Menu.Button
          type="button"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-r-md bg-gray-900 px-3 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100"
        >
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
            ></path>
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute right-0 top-9 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg shadow-black/25 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <div>
                <SubmitButtonItem
                  label="Publish"
                  description="This post can be viewed by anyone"
                  active={active}
                  selected={_published}
                  onClick={() => setPublished(true)}
                />
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div>
                <SubmitButtonItem
                  label="Draft"
                  description="This post will not be publicly accessible"
                  active={active}
                  selected={!_published}
                  onClick={() => setPublished(false)}
                />
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}
