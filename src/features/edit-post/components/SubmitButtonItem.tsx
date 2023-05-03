import { type FC, type MouseEventHandler } from 'react'
import { CheckIcon } from './CheckIcon'

type SubmitButtonItemProps = {
  label: string
  description: string
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const SubmitButtonItem: FC<SubmitButtonItemProps> = ({
  label,
  description,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="group flex w-full p-3 text-start hover:bg-blue-500"
      onClick={onClick}
    >
      <div className="w-5">
        {selected && (
          <CheckIcon className="stroke-blue-500 group-hover:stroke-white" />
        )}
      </div>
      <div className="ml-2 flex-1">
        <h5 className="text-sm font-medium group-hover:bg-blue-500 group-hover:text-white">
          {label}
        </h5>
        <div className="mt-0.5 text-[13px] font-light text-gray-500 group-hover:text-blue-200">
          {description}
        </div>
      </div>
    </button>
  )
}
