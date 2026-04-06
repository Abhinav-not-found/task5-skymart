import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import Button from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

const Header = () => {
  const { loggedInUser } = useAuth()
  return (
    <div className='relative overflow-hidden rounded-3xl bg-[#111] border border-white p-8 sm:p-12 mt-10 mb-10'>
      <HeaderBackground />

      <div className='relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8'>
        <HeaderContent loggedInUser={loggedInUser} />
        <HeaderStats />
      </div>
    </div>
  )
}

export default Header

const HeaderBackground = () => {
  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden'>
      <div className='absolute -top-16 -right-16 w-80 h-80 bg-volt/8 rounded-full blur-3xl'></div>

      <div className='absolute bottom-0 left-1/4 w-60 h-60 bg-volt/4 rounded-full blur-3xl'></div>

      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            "linear-gradient(rgb(200, 244, 0) 1px, transparent 1px), linear-gradient(90deg, rgb(200, 244, 0) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  )
}

const HeaderButtons = () => {
  return (
    <div className='flex gap-3 mt-6 flex-wrap'>
      <Link to={"/products"}>
        <Button size='lg' className='flex items-center gap-2'>
          Shop now
          <ArrowRight className='size-4' />
        </Button>
      </Link>

      <Link to={"/products"}>
        <Button size='lg' variant='outline'>
          View All Products
        </Button>
      </Link>
    </div>
  )
}

const HeaderContent = ({ loggedInUser }) => {
  return (
    <div>
      <p className='text-(--brand)/70 text-sm font-body tracking-widest uppercase mb-3'>
        Good evening 👋
      </p>

      <h1 className='font-heading font-bold text-4xl sm:text-5xl text-white leading-tight mb-4'>
        Welcome back,
        <br />
        <span className='text-(--brand)'>{loggedInUser?.fullName}!</span>
      </h1>

      <p className='text-white/40 font-body max-w-md'>
        Discover today's picks — hand-curated products across electronics,
        fashion, and more.
      </p>

      <HeaderButtons />
    </div>
  )
}

const HeaderStats = () => {
  return (
    <div className='shrink-0 flex flex-col gap-3'>
      <div className='bg-(--brand)/10 border border-(--brand)/20 rounded-2xl px-6 py-4 text-center'>
        <p className='font-heading font-bold text-4xl text-(--brand)'>20+</p>
        <p className='text-white/40 text-xs font-body mt-1'>
          Products Available
        </p>
      </div>

      <div className='bg-white/4 border border-white rounded-2xl px-6 py-4 text-center'>
        <p className='font-heading font-bold text-2xl text-white'>Free</p>
        <p className='text-white/40 text-xs font-body mt-1'>
          Delivery on ₹999+
        </p>
      </div>
    </div>
  )
}
