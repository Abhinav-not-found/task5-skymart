import { Zap } from "lucide-react"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/auth-context"
import Button from "../ui/button"

const Logo = () => {
  const { loggedInUser } = useAuth()
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(loggedInUser ? "/home" : "/")}
      className='flex items-center gap-2 cursor-pointer select-none'
    >
      <Button
        variant='outline'
        size='icon'
        className='rounded-2xl size-10.5 active:scale-100 bg-(--brand) hover:bg-(--brand) outline-neutral-800'
      >
        <Zap className='text-black fill-black size-4.5' />
      </Button>
      <p className='flex font-(--font-brand) text-2xl'>
        <span className='text-white'>Sky</span>{" "}
        <span className='text-(--brand)'>Mart</span>
      </p>
    </div>
  )
}

export default Logo
