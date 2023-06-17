export const revalidatePost = async (postId: string) => {
  await fetch('/api/revalidate-post', {
    method: 'POST',
    body: JSON.stringify({
      id: postId,
    }),
  }).catch((error) => {
    console.error('error', error)
  })
}

export const revalidateUser = async (userId: string) => {
  await fetch('/api/revalidate-user', {
    method: 'POST',
    body: JSON.stringify({
      id: userId,
    }),
  }).catch((error) => {
    console.error('error', error)
  })
}
