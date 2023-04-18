import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const CurrentUserAvatar = () => {
  const { data: session } = useSession()

  return (
    <>
      {session?.user.image != null ? (
        <Image src={session.user.image} alt="avatar" width={32} height={32} />
      ) : (
        <></>
      )}
    </>
  )
}
