import { type FC } from 'react'

type CheckIconProps = {
  active: boolean
}

export const CheckIcon: FC<CheckIconProps> = ({ active }) => {
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
