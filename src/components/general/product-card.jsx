import { ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router"
import { useCart } from "@/context/cart-context"

const ProductCard = ({ data }) => {
  return (
    <Link
      to={`/products/${data.id}`}
      className='product-card flex flex-col group animate-fade-up rounded-3xl outline outline-neutral-800 hover:outline-(--brand)/40'
      style={{ animationDelay: `${data.delay}ms` }}
    >
      <ProductImage
        img={data.thumbnail}
        name={data.title}
        category={data.category}
      />

      <div className='p-4 flex flex-col flex-1 gap-2'>
        <ProductInfo category={data.category} name={data.title} />

        <ProductRating rating={data.rating} reviews={data.reviews} />

        <ProductFooter data={data} />
      </div>
    </Link>
  )
}

const ProductImage = ({ img, name, category }) => {
  return (
    <div className='relative aspect-square bg-white rounded-t-3xl overflow-hidden'>
      <img
        src={img}
        alt={name}
        loading='lazy'
        className='w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500'
      />

      <span className='absolute top-3 left-3 badge bg-black/60 text-white/80 backdrop-blur-sm capitalize text-[10px] rounded-full px-2 py-1'>
        {category}
      </span>
    </div>
  )
}

const ProductInfo = ({ category, name }) => {
  return (
    <>
      <p className='text-white/30 text-[10px] tracking-widest font-body capitalize'>
        {category}
      </p>

      <h3 className='font-body font-medium text-white/85 text-sm leading-snug line-clamp-2 flex-1'>
        {name}
      </h3>
    </>
  )
}

const ProductRating = ({ rating, reviews }) => {
  return (
    <div className='flex items-center gap-1.5'>
      <div className='flex items-center'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`size-3 ${
              i < rating ? "text-amber-400 fill-amber-400" : "text-white/20"
            }`}
          />
        ))}
      </div>
      <span className='text-white/30 text-[10px]'>
        ({reviews?.length || 0})
      </span>
    </div>
  )
}

const ProductFooter = ({ data }) => {
  const { setCart, cart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const existing = cart.find((item) => item.id === data.id)

    if (existing) {
      setCart(cart.filter((item) => item.id !== data.id))
    } else {
      setCart([
        ...cart,
        {
          id: data.id,
          title: data.title,
          price: data.price,
          thumbnail: data.thumbnail,
          quantity: 1,
        },
      ])
    }
  }

  const isInCart = cart.some((item) => item.id === data.id)

  return (
    <div className='flex items-center justify-between mt-auto pt-3 border-t border-white'>
      <span className='font-heading font-bold text-(--brand) text-lg'>
        {data.price}
      </span>

      <button
        onClick={handleAddToCart}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-body transition-all duration-200 active:scale-95
  ${
    isInCart
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : "bg-(--brand) text-black hover:bg-(--brand)-light"
  }`}
      >
        <ShoppingCart className='size-3' />
        {isInCart ? "Added" : "Add"}
      </button>
    </div>
  )
}

export default ProductCard
