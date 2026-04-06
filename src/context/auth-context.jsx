import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(() => {
    const data = localStorage.getItem("registeredUser")
    return data ? JSON.parse(data) : null
  })
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const data = localStorage.getItem("loggedInUser")
    return data ? JSON.parse(data) : null
  })
  useEffect(() => {
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser))
  }, [registeredUser])

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
  }, [loggedInUser])

  const logout = () => {
    localStorage.removeItem("loggedInUser")
    setLoggedInUser(null)
    toast.success("Logged Out. See you soon 👋")
  }

  return (
    <AuthContext.Provider
      value={{
        registeredUser,
        loggedInUser,
        setRegisteredUser,
        setLoggedInUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
