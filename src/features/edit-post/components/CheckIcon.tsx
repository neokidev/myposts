import clsx from 'clsx'
import { type FC } from 'react'

type CheckIconProps = {
  className?: string
}

export const CheckIcon: FC<CheckIconProps> = ({ className }) => {
  return (
    <svg
      className={clsx('stroke-2', className)}
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
