import { IconFileDescription } from '@tabler/icons-react'
import Link from 'next/link'
import { type FC, type ReactNode } from 'react'

type ItemProps = {
  label: string
  icon: ReactNode
  active?: boolean
}

const Item: FC<ItemProps> = ({ label, icon, active }) => {
  return (
    <li className="hover:bg-gray-100 rounded-md">
      <Link
        href="/dashboard"
        className={`${
          !active ? 'text-gray-400' : ''
        } group flex items-center p-2`}
      >
        <div className="mr-1 w-5 h-5 flex justify-center items-center">
          {icon}
        </div>
        {label}
      </Link>
    </li>
  )
}

export const Navbar = () => {
  return (
    <aside className="hidden md:block overflow-y-auto">
      <nav className="relative">
        <ul>
          <Item label="Posts" icon={<IconFileDescription />} active />
        </ul>
      </nav>
    </aside>
  )
}
