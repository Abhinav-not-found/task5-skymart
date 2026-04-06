import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router"
import { useProduct } from "@/context/product-context"

const Category = () => {
  const { categories, getCategories } = useProduct()
  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
  }, [])
  return (
    <section className='mb-10'>
      <CategoryHeader />

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
        {categories.slice(0, 7).map((cat) => {
          const name = typeof cat === "string" ? cat : cat.slug

          return <CategoryCard key={name} name={name} />
        })}
      </div>
    </section>
  )
}
export default Category

const CategoryHeader = () => {
  return (
    <div className='flex items-center justify-between mb-5'>
      <h2 className='font-heading font-bold text-xl'>Shop by Category</h2>

      <Link
        to='/products'
        className='text-(--brand) text-sm hover:text-(--brand) transition-colors flex items-center gap-1'
      >
        View All
        <ArrowRight className='size-4' />
      </Link>
    </div>
  )
}

const CategoryCard = ({ name }) => {
  const icon = categoryIcons[name] || "📦"
  return (
    <Link
      to={`/products?category=${name}`}
      className='group bg-neutral-950 border border-white/20 hover:border-white/40 hover:bg-white/1 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5'
    >
      <div className='text-3xl mb-3'>{icon}</div>

      <p className='font-body font-semibold text-ink/80 text-sm capitalize'>
        {name.replace("-", " ")}
      </p>
    </Link>
  )
}

const categoryIcons = {
  smartphones: "📱",
  laptops: "💻",
  fragrances: "🌸",
  skincare: "🧴",
  groceries: "🛒",
  "home-decoration": "🏠",
}
