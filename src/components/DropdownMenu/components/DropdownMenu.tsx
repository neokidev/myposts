import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { type FC, type ReactNode } from 'react'

type RootProps = {
  children: ReactNode
}

const Root: FC<RootProps> = ({ children }) => {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>
}

type TriggerProps = {
  children: ReactNode
  className?: string
}

const Trigger: FC<TriggerProps> = ({ children, className }) => {
  return (
    <DropdownMenuPrimitive.Trigger asChild className={className}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
}

type ContentProps = {
  children: ReactNode
  className?: string
  align?: 'start' | 'end' | 'center'
}

const Content: FC<ContentProps> = ({ children, className, align }) => {
  return (
    <DropdownMenuPrimitive.Content
      className={clsx(
        'min-w-[12rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 text-sm overflow-hidden',
        className
      )}
      sideOffset={8}
      align={align}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )
}

type GroupProps = {
  children: ReactNode
  className?: string
}

const Group: FC<GroupProps> = ({ children, className }) => {
  return (
    <DropdownMenuPrimitive.Group className={clsx('p-1', className)}>
      {children}
    </DropdownMenuPrimitive.Group>
  )
}

type ItemProps = {
  children: ReactNode
  className?: string
  disableDefaultStyles?: boolean
}

const Item: FC<ItemProps> = ({ children, className, disableDefaultStyles }) => {
  return (
    <DropdownMenuPrimitive.Item
      asChild
      className={clsx(
        !disableDefaultStyles &&
          'w-full flex items-center rounded-md px-2.5 py-1.5 outline-none hover:bg-gray-100 focus:bg-gray-100 hover:bg-blue-500 focus:bg-blue-500',
        className
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Group,
  Item,
}
