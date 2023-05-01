import clsx from 'clsx'
import { type FC, type MouseEventHandler } from 'react'
import { CheckIcon } from './CheckIcon'

type SubmitButtonItemProps = {
  label: string
  description: string
  active: boolean
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const SubmitButtonItem: FC<SubmitButtonItemProps> = ({
  label,
  description,
  active,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'group flex w-full p-3 text-start',
        active && 'bg-blue-500'
      )}
      onClick={onClick}
    >
      <div className="w-5">{selected && <CheckIcon active={active} />}</div>
      <div className="ml-2 flex-1">
        <h5
          className={clsx(
            'text-sm font-medium',
            active && 'bg-blue-500 text-white'
          )}
        >
          {label}
        </h5>
        <div
          className={clsx(
            'mt-0.5 text-[13px] font-light',
            active ? 'text-blue-200' : 'text-gray-500'
          )}
        >
          {description}
        </div>
      </div>
    </button>
  )
}
