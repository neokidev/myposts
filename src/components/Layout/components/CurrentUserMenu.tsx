import { CurrentUserAvatar } from '@/components/Layout/components/CurrentUserAvatar'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export const CurrentUserMenu = () => {
  const { data: session } = useSession()
  const [isSignOutButtonClicked, setIsSignOutButtonClicked] =
    useState<boolean>(false)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative overflow-hidden rounded-full">
          <CurrentUserAvatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 min-w-[12rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
          <div className="p-1">
            <div className="px-2.5 py-1.5 space-y-0.5">
              <div className="font-semibold">{session?.user.name}</div>
              <div className="text-gray-400 text-xs">{session?.user.email}</div>
            </div>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/dashboard">
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2.5 py-1.5`}
                  >
                    Dashboard
                  </button>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center rounded-md px-2.5 py-1.5`}
                  onClick={() => {
                    setIsSignOutButtonClicked(true)
                    signOut().catch(() => {
                      throw new Error('An error occurred while signing out')
                    })
                  }}
                  disabled={isSignOutButtonClicked}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
