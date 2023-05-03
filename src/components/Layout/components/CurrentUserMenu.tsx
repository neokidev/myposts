import { DropdownMenu } from '@/components/DropdownMenu'
import { CurrentUserAvatar } from '@/components/Layout/components/CurrentUserAvatar'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export const CurrentUserMenu = () => {
  const { data: session } = useSession()
  const [isSignOutButtonClicked, setIsSignOutButtonClicked] =
    useState<boolean>(false)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex justify-center items-center">
          <CurrentUserAvatar />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Group>
          <div className="px-2.5 py-1.5 space-y-0.5">
            <div className="font-semibold">{session?.user.name}</div>
            <div className="text-gray-400 text-xs">{session?.user.email}</div>
          </div>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Link href="/dashboard">
              <button>Dashboard</button>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <button
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
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
