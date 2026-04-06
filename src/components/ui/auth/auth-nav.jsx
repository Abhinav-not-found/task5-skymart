import { Zap } from "lucide-react"
import Button from "../button"

const AuthNav = () => {
  return (
    <nav className='w-fit h-16 flex items-center gap-2'>
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
    </nav>
  )
}

export default AuthNav
