import { useCart } from "@/context/cart-context"
import { useProduct } from "@/context/product-context"
import PackageIcon from "./icons/package-icon"
import StarIcon from "./icons/star-icon"
import TagIcon from "./icons/tag-icon"
import TrendingIcon from "./icons/trending-icon"

const Stats = () => {
  const { cart } = useCart()
  const { products } = useProduct()

  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Cart total value
  const cartValue = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  // Top products (rating >= 4.5 for example)
  const topProducts = products.filter((p) => p.rating >= 4.5).length

  // Unique categories
  const categories = new Set(products.map((p) => p.category)).size
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger'>
      <StatCard
        icon={<PackageIcon />}
        value={cartItems}
        label='Cart Items'
        sub='In your bag'
        color='bg-volt/10 text-volt'
      />

      <StatCard
        icon={<TrendingIcon />}
        value={`$${cartValue.toFixed(2)}`}
        label='Cart Value'
        sub='Ready to checkout'
        color='bg-blue-500/10 text-blue-400'
      />

      <StatCard
        icon={<StarIcon />}
        value={topProducts}
        label='Top Products'
        sub='Highly rated'
        color='bg-amber-500/10 text-amber-400'
      />

      <StatCard
        icon={<TagIcon />}
        value={categories}
        label='Categories'
        sub='To explore'
        color='bg-purple-500/10 text-purple-400'
      />
    </div>
  )
}

export default Stats

const StatCard = ({ icon, value, label, sub, color }) => {
  return (
    <div className='bg-[#111] border border-white rounded-3xl p-6 flex items-start gap-4'>
      <IconWrapper color={color}>{icon}</IconWrapper>

      <div>
        <p className='font-heading font-bold text-2xl text-white'>{value}</p>
        <p className='text-white/50 text-sm font-body'>{label}</p>
        <p className='text-white/25 text-xs font-body mt-0.5'>{sub}</p>
      </div>
    </div>
  )
}

const IconWrapper = ({ children, color }) => {
  return (
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}
    >
      {children}
    </div>
  )
}
