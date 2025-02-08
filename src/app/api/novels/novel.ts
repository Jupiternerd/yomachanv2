import type { NextApiRequest, NextApiResponse } from 'next'
 import serverAuth from '@/app/components/auth/ServerAuth'
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await serverAuth(req, res)
 
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.status(200).json({ message: 'Hello from the server!' })
}