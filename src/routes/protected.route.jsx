import { Navigate, Outlet } from "react-router"
import Footer from "@/components/general/footer"
import Navbar from "@/components/general/navbar"
import { useAuth } from "@/context/auth-context"

export default function ProtectedRoute() {
  const { loggedInUser } = useAuth()

  if (!loggedInUser) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
