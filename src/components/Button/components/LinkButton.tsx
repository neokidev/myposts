import Link from 'next/link'
import { type FC, type ReactNode } from 'react'
import { DEFAULT_BUTTON_STYLES } from '../constants'

type LinkButtonProps = {
  children: ReactNode
  href: string
}

export const LinkButton: FC<LinkButtonProps> = ({ children, href }) => {
  return (
    <Link href={href} className={DEFAULT_BUTTON_STYLES}>
      {children}
    </Link>
  )
}
