import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, type FC, type ReactNode } from 'react'

type ProtectedLayoutProps = {
  children: ReactNode
}

export const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/').catch(() => {
        throw new Error()
      })
    }
  }, [status, router])

  if (status !== 'authenticated') {
    return null
  }

  return <>{children}</>
}
