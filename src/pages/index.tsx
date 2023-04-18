import { MainLayout } from '@/components/Layout/components/MainLayout'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <MainLayout>
      {session && <span>Logged in as {session.user?.name}</span>}
    </MainLayout>
  )
}

export default Home
