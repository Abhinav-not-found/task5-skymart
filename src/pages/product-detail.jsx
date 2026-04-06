import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import ProductCard from "@/components/general/product-card"
import ProductDetailSkeleton from "@/components/skeleton/product-detail-skeleton"
import Button from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useProduct } from "@/context/product-context"

const ProductDetail = () => {
  const { id } = useParams()
  const { getSingleProduct } = useProduct()

  const [singleProduct, setSingleProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const data = await getSingleProduct(id)
      setSingleProduct(data)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) return <ProductDetailSkeleton />
  if (!singleProduct) return <div>Product not found</div>

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 animate-fade-in'>
      <ProductBreadcrumb product={singleProduct} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-18 mb-16'>
        <ProductImage
          image={singleProduct.images?.[0]}
          title={singleProduct.title}
        />
        <ProductInfo product={singleProduct} />
      </div>

      <RelatedProducts
        category={singleProduct.category}
        currentId={singleProduct.id}
      />
    </div>
  )
}
export default ProductDetail

const ProductBreadcrumb = ({ product }) => {
  return (
    <nav className='flex items-center gap-2 text-sm text-white/30 mb-8'>
      <Link to='/products' className='hover:text-white'>
        ← Products
      </Link>
      <span>/</span>
      <span className='capitalize'>{product.category}</span>
      <span>/</span>
      <span className='text-white/70'>{product.title}</span>
    </nav>
  )
}

const ProductImage = ({ image, title }) => {
  return (
    <div className='bg-white rounded-3xl p-10 flex items-center justify-center aspect-square'>
      <img src={image} alt={title} className='w-full h-full object-contain' />
    </div>
  )
}

const ProductInfo = ({ product }) => {
  const { cart, setCart, increaseQty, decreaseQty } = useCart()

  const itemInCart = cart.find((item) => item.id === product.id)

  const handleAddToCart = () => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }])
  }

  const { products } = useProduct()
  const currentIndex = products.findIndex((p) => p.id === product.id)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === products.length - 1
  return (
    <div className='flex flex-col gap-2'>
      <span className='px-3 py-1 rounded-full text-xs bg-(--brand)/10 text-(--brand)'>
        {product.category}
      </span>

      <h1 className='text-xl font-bold text-white'>{product.title}</h1>

      <RatingStars rating={product.rating} reviews={product.reviews} />

      <div className='py-5 border-y border-white'>
        <span className='text-4xl font-bold text-(--brand)'>
          ${product.price}
        </span>
      </div>

      <p className='text-white/60 text-sm max-w-md'>{product.description}</p>

      {itemInCart && (
        <div className='flex items-center gap-3 mt-3'>
          <button
            onClick={() => decreaseQty(product.id)}
            className='w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg'
          >
            <Minus />
          </button>

          <span className='text-lg font-bold w-6 text-center'>
            {itemInCart.quantity}
          </span>

          <button
            onClick={() => increaseQty(product.id)}
            className='w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg'
          >
            <Plus />
          </button>
        </div>
      )}

      <div className='flex flex-row gap-2 mt-2'>
        <button
          onClick={handleAddToCart}
          disabled={!!itemInCart}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 active:scale-95
    ${
      itemInCart
        ? "bg-green-500/20 text-green-400 border border-green-500/30"
        : "bg-(--brand) text-black hover:bg-(--brand)-light"
    }`}
        >
          <ShoppingCart className='size-5' />
          {itemInCart ? "Added" : "Add to Cart"}
        </button>

        <button className='w-14 flex items-center justify-center rounded-2xl border border-white/10 hover:border-red-400/40 transition group'>
          <Heart className='size-5 text-white/60 group-hover:text-red-400 transition' />
        </button>

        {/* {itemInCart && (
          <Button
            variant='outline'
            onClick={() => {}}
            className='w-full py-3 rounded-2xl flex items-center justify-center gap-2'
          >
            View Cart <ArrowRight className='size-4' />
          </Button>
        )} */}
      </div>

      <ProductFeatures />

      <div className='flex gap-3 mt-6'>
        {!isFirst && (
          <Link
            to={`/products/${products[currentIndex - 1].id}`}
            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl transition-all text-white text-sm font-body'
          >
            <ChevronLeft className='size-4' />
            Previous
          </Link>
        )}

        {!isLast && (
          <Link
            to={`/products/${products[currentIndex + 1].id}`}
            className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-(--brand) hover:bg-(--brand)-light text-black border border-(--brand) rounded-2xl transition-all font-heading font-semibold text-sm'
          >
            Next
            <ChevronRight className='size-4' />
          </Link>
        )}
      </div>
    </div>
  )
}

const RatingStars = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating)

  return (
    <div className='flex items-center gap-2'>
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < fullStars ? (
            <Star className='size-4 text-yellow-500 fill-yellow-500' />
          ) : (
            <Star className='size-4 text-yellow-500' />
          )}
        </span>
      ))}
      <span className='text-sm text-white/50'>
        {rating} ({reviews?.length || 0} reviews)
      </span>
    </div>
  )
}

const RelatedProducts = ({ category, currentId }) => {
  const { products } = useProduct()
  const { id } = useParams()

  const related = products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 5)

  if (!related.length) return null

  return (
    <section>
      <h2 className='text-2xl font-bold mb-6 text-white'>Related Products</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {related.map((item, i) => (
          <ProductCard key={item.id} data={{ ...item, delay: i * 100 }} />
        ))}
      </div>
    </section>
  )
}

const ProductFeatures = () => {
  const features = [
    {
      icon: "🚚",
      title: "Free Delivery",
      desc: "On orders $50+",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      desc: "256-bit SSL",
    },
    {
      icon: "🔁",
      title: "Easy Returns",
      desc: "30-day policy",
    },
  ]

  return (
    <div className='grid grid-cols-3 gap-3 mt-4'>
      {features.map((item, i) => (
        <div
          key={i}
          className='bg-white/5 border border-white rounded-2xl p-3 text-center'
        >
          <p className='text-lg mb-1'>{item.icon}</p>
          <p className='text-white/70 text-[11px] font-semibold'>
            {item.title}
          </p>
          <p className='text-white/30 text-[10px]'>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
