import { LinkButton } from '@/components/Button'
import { CurrentUserMenu } from '@/components/Layout/components/CurrentUserMenu'
import { SignInButton } from '@/components/Layout/components/SignInButton'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { status } = useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-b-gray-200 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between py-4">
          <Link href="/">
            <span className="font-bold">myposts</span>
          </Link>
          {status === 'unauthenticated' && <SignInButton />}
          {status === 'authenticated' && (
            <div className="flex justify-end items-center space-x-8">
              <LinkButton href="/posts/new">New Post</LinkButton>
              <CurrentUserMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
