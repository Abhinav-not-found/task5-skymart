import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/context/auth-context"

export default function ProtectedRoute() {
  const { loggedInUser } = useAuth()

  if (loggedInUser) {
    return <Navigate to='/home' />
  }

  return <Outlet />
}
