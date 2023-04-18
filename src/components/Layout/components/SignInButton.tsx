import { IconBrandGithubFilled } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const SignInButton = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  return (
    <button
      onClick={() => {
        setIsClicked(true)
        signIn('github').catch(() => {
          throw new Error('An error occurred while signing in')
        })
      }}
      disabled={isClicked}
      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100"
    >
      Sign in with
      <IconBrandGithubFilled size={18} className="ml-1" />
    </button>
  )
}
