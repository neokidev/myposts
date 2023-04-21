import { UserIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const CurrentUserAvatar = () => {
  const { data: session } = useSession()

  return (
    <div className="overflow-hidden rounded-full">
      {session?.user.image != null ? (
        <Image src={session.user.image} alt="avatar" width={32} height={32} />
      ) : (
        <UserIcon className="h-8 w-8 rounded-full bg-gray-400 p-1 text-white" />
      )}
    </div>
  )
}
