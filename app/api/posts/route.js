import { getServerSession } from 'next-auth'
import { NextResponse as res } from 'next/server'

export const GET = async () => {
  const session = await getServerSession()

  if (!session) return res.json({ error: 'Unauthorized' }, { status: 401 })

  return res.json({ message: 'Welcome!' }) // default status appears to be 200
}
