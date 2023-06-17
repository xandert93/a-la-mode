import { getServerSession } from 'next-auth'
import { AuthButton } from './AuthButton'
import { redirect } from 'next/navigation'
import { PATHS } from '@/constants'

export default async function DashboardPage(context) {
  const session = await getServerSession()

  return <AuthButton />

  //   if (!session) return redirect('/login')
  //   else return <Dashboard user={session.user} />
}

// Component that contains the UI to be protected
const Dashboard = ({ user }) => {
  return `Welcome, ${user.name}`
}
