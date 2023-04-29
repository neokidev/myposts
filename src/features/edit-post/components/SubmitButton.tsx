import { Menu } from '@headlessui/react'
import { useEffect, useState, type FC } from 'react'
import { usePreviousDifferent } from 'rooks'

type CheckIconProps = {
  active: boolean
}

const CheckIcon: FC<CheckIconProps> = ({ active }) => {
  return (
    <svg
      className={`${active ? 'stroke-white' : 'stroke-blue-500'} stroke-2`}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  )
}

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
        data-testid="save-button"
      >
        {_published ? 'Publish' : 'Draft'}
      </button>

      <Menu>
        <Menu.Button
          type="button"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-r-md bg-gray-900 px-3 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100"
          data-testid="menu-button"
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
        <Menu.Items className="absolute right-0 top-9 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg shadow-black/25 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item data-testid="menu-item-publish">
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active ? 'bg-blue-500' : ''
                } group flex w-full rounded-t-md p-3 text-start`}
                onClick={() => setPublished(true)}
              >
                <div className="w-5">
                  {_published && (
                    <div data-testid="check-icon-publish">
                      <CheckIcon active={active} />
                    </div>
                  )}
                </div>

                <div className="ml-2 flex-1">
                  <h5
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-slate-600'
                    } text-sm font-medium`}
                  >
                    Publish
                  </h5>
                  <div
                    className={`${
                      active ? 'text-blue-200' : 'text-slate-400'
                    } mt-0.5 text-[13px] font-light`}
                  >
                    This post can be viewed by anyone
                  </div>
                </div>
              </button>
            )}
          </Menu.Item>
          <Menu.Item data-testid="menu-item-draft">
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active ? 'bg-blue-500' : ''
                } group flex w-full rounded-b-md p-3 text-start`}
                onClick={() => setPublished(false)}
              >
                <div className="w-5">
                  {!_published && (
                    <div data-testid="check-icon-draft">
                      <CheckIcon active={active} />
                    </div>
                  )}
                </div>

                <div className="ml-2 flex-1">
                  <h5
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-slate-600'
                    } text-sm font-medium`}
                  >
                    Draft
                  </h5>
                  <div
                    className={`${
                      active ? 'text-blue-200' : 'text-slate-400'
                    } mt-0.5 text-[13px] font-light`}
                  >
                    This post will not be publicly accessible
                  </div>
                </div>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}
