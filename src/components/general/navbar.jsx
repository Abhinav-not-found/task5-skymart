import { LogOut, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import Button from "../ui/button"
import Cart from "./cart"
import Logo from "./logo"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-24 z-50 transition-all ${
        scrolled
          ? "border-b border-white bg-neutral-950/80 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Logo />
      <NavLinks />
      <div className='flex gap-2'>
        <ProfileCard />
        <CartBtn />
        <LogoutBtn />
      </div>
    </header>
  )
}

export default Navbar

const LogoutBtn = () => {
  const { logout } = useAuth()
  return (
    <Button
      onClick={() => logout()}
      size='icon'
      variant='outline'
      className={"hover:bg-red-800/30 hover:text-red-400 hover:border-red-400/40"}
    >
      <LogOut className='size-4' />
    </Button>
  )
}
const CartBtn = () => {
  const { cart } = useCart()
  const [cartView, setCartView] = useState(false)

  return (
    <>
      <div className='relative'>
        <Button
          onClick={() => setCartView(!cartView)}
          size='icon'
          variant='outline'
        >
          <ShoppingCart className='size-4 text-white' />
        </Button>
        {cart.length > 0 && <CartBadge count={cart.length} />}
      </div>
      {cartView && <Cart setCartView={setCartView} cartView={cartView} />}
    </>
  )
}

const ProfileCard = () => {
  const { registeredUser } = useAuth()
  return (
    <Button
      size='icon'
      variant='outline'
      className={"w-fit px-3 text-sm flex gap-2 active:scale-100"}
    >
      <div className='size-6 bg-(--brand) text-black rounded-lg flex items-center justify-center'>
        {registeredUser?.fullName?.charAt(0).toUpperCase()}
      </div>
      <p>{registeredUser?.fullName}</p>
    </Button>
  )
}

const NavLinks = () => {
  return (
    <nav className='flex gap-6 text-sm'>
      <NavLink
        to='/home'
        end
        className={({ isActive }) => {
          return isActive ? "text-(--brand)" : "text-neutral-400"
        }}
      >
        Home
      </NavLink>
      <NavLink
        to='/products'
        className={({ isActive }) =>
          isActive ? "text-(--brand)" : "text-neutral-400"
        }
      >
        Shop
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) =>
          isActive ? "text-(--brand)" : "text-neutral-400"
        }
      >
        About
      </NavLink>
    </nav>
  )
}

const CartBadge = ({ count }) => {
  return (
    <div className='flex items-center justify-center bg-(--brand) absolute top-0 right-0 size-4.5 rounded-full text-black text-xs select-none'>
      {count}
    </div>
  )
}
