import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useCart } from "@/context/cart-context"
import Button from "../ui/button"

const Cart = ({ setCartView, cartView }) => {
  const navigate = useNavigate()
  const { cart } = useCart()
  return (
    <Overlay setCartView={setCartView}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-neutral-900 w-104 h-full border-l border-neutral-700 flex flex-col'
        style={{
          animation: cartView
            ? "slideIn 0.3s ease-out forwards"
            : "slideOut 0.3s ease-out forwards",
        }}
      >
        <CartNavbar setCartView={setCartView} />
        <div className='p-5 space-y-4 overflow-y-auto'>
          {cart.length > 0 ? (
            cart.map((item) => <CartCard key={item.id} item={item} />)
          ) : (
            <CartEmpty setCartView={setCartView} navigate={navigate} />
          )}
        </div>
        {cart.length > 0 && <CartFooter setCartView={setCartView} />}
      </div>
    </Overlay>
  )
}

export default Cart

const CartEmpty = ({ setCartView, navigate }) => {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4 text-center py-16'>
      <div className='w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='36'
          height='36'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-package-open text-white/20'
        >
          <path d='M12 22v-9'></path>
          <path d='M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z'></path>
          <path d='M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13'></path>
          <path d='M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z'></path>
        </svg>
      </div>
      <div>
        <p className='font-heading font-semibold text-white/70 text-lg'>
          Cart is empty
        </p>
        <p className='text-white/30 text-sm mt-1'>Go shop something cool!</p>
      </div>
      <Button
        onClick={() => {
          navigate("/products")
          setCartView(false)
        }}
        className='mt-2'
      >
        Browse Products
      </Button>
    </div>
  )
}

const CartNavbar = ({ setCartView }) => {
  return (
    <div className='h-18 w-full border-b border-white'>
      <div className='h-full w-full flex items-center justify-between px-6'>
        <div className='flex items-center gap-2'>
          <ShoppingBag className='size-5 text-(--brand)' />
          <h2 className='text-xl font-semibold'>Cart</h2>
        </div>
        <button
          onClick={() => setCartView(false)}
          className='text-white hover:text-gray-300 transition-colors cursor-pointer'
        >
          <X className='size-4 text-neutral-400' />
        </button>
      </div>
    </div>
  )
}

const Overlay = ({ setCartView, children }) => {
  return (
    <div
      onClick={() => setCartView(false)}
      className='h-screen w-screen absolute top-0 left-0 text-white bg-black/40 flex justify-end backdrop-blur-sm'
    >
      {children}
    </div>
  )
}

const CartCard = ({ item }) => {
  console.log(item)
  const { removeFromCart, increaseQty, decreaseQty } = useCart()
  const handleDelete = () => {
    removeFromCart(item.id)
  }
  return (
    <div className='flex gap-4 p-3 bg-white/4 border border-white rounded-2xl animate-fade-in'>
      <div className='w-[72px] h-[72px] bg-white rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2'>
        <img
          src={item.thumbnail}
          alt='Smart Watch Series 5'
          className='w-full h-full object-contain'
        />
      </div>

      <div className='flex-1 min-w-0'>
        <p className='text-sm text-white/80 font-body clamp-2 leading-snug'>
          {item.title}
        </p>

        <p className='text-(--brand) font-heading font-bold text-base mt-1'>
          ${item.price}
        </p>

        <p className='text-white/40 text-xs font-mono'>
          ${item.price} × {item.quantity} = $
          {(item.price * item.quantity).toFixed(2)}
        </p>

        <div className='flex items-center gap-2 mt-2'>
          <button
            onClick={() => decreaseQty(item.id)}
            className='w-7 h-7 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-lg transition-colors border border-white/10'
          >
            <Minus className='size-4' />
          </button>

          <span className='text-sm font-bold font-body w-5 text-center'>
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQty(item.id)}
            className='w-7 h-7 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-lg transition-colors border border-white/10'
          >
            <Plus className='size-4' />
          </button>

          <button
            onClick={handleDelete}
            className='ml-auto text-red-400/60 hover:text-red-400 transition-colors cursor-pointer'
          >
            <Trash2 className='size-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

const CartFooter = ({ setCartView }) => {
  const { cart, clearCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty")
      return
    }

    clearCart()
    setCartView(false)

    toast.success("Order placed successfully")
  }
  return (
    <div className='px-6 py-5 border-t border-white space-y-4 fixed bottom-0 left-0 right-0 bg-black'>
      <div className='flex justify-between items-center'>
        <span className='text-white/50 text-sm font-body'>Total</span>
        <span className='font-heading font-bold text-2xl text-white'>
          ${total.toFixed(2)}
        </span>
      </div>
      <Button
        onClick={handleCheckout}
        className='w-full text-xl py-4 rounded-2xl flex items-center justify-center gap-2'
      >
        Checkout
        <ArrowRight />
      </Button>
      <button
        onClick={clearCart}
        className='w-full text-center text-xs text-white/25 hover:text-red-400 transition-colors py-1 cursor-pointer'
      >
        Clear cart
      </button>
    </div>
  )
}
