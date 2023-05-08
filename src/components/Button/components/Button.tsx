import { type FC, type ReactNode } from 'react'
import { DEFAULT_BUTTON_STYLES } from '../constants'

type ButtonProps = {
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ children }) => {
  return <button className={DEFAULT_BUTTON_STYLES}>{children}</button>
}
