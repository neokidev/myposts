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
