import type { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  id: string
}

type ResponseData = {
  revalidated: boolean
}

function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  if (typeof body !== 'string') {
    return false
  }

  let parsedBody: object
  try {
    parsedBody = JSON.parse(body) as object
  } catch (err) {
    return false
  }

  return Object.keys(parsedBody).every((key) => fields.includes(key))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  switch (req.method) {
    case 'GET':
      await res.revalidate(`/posts/${req.query.postId as string}`)
      return res.json({ revalidated: true })
    case 'POST':
      if (!isValidBody<RequestBody>(req.body, ['id'])) {
        return res.status(400).send('Invalid body')
      }

      const { id: postId } = JSON.parse(
        req.body as unknown as string
      ) as RequestBody

      try {
        console.log('revalidating:', `/posts/${postId}`)
        await res.revalidate(`/posts/${postId}`)
        return res.json({ revalidated: true })
      } catch (err) {
        console.log('error:', err)
        return res.status(500).send('Error revalidating')
      }
    default:
      return res.status(404).send('Not found')
  }
}
