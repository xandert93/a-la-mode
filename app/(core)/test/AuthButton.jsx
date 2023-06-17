'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@mui/material'

export const AuthButton = () => {
  const { data } = useSession()

  return <Button onClick={data ? signOut : () => signIn()} children={data ? '👋' : '🔐'} />
}
