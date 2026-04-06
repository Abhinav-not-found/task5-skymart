import { ChevronDown, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import ProductCard from "@/components/general/product-card"
import { useProduct } from "@/context/product-context"

const Shop = () => {
  const { products, getAllProducts, loading, error } = useProduct()

  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = searchParams.get("category") || "all"

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(urlCategory)
  const [sort, setSort] = useState("default")

  useEffect(() => {
    if (products.length === 0) getAllProducts()
  }, [])

  // sync URL → state
  useEffect(() => {
    setCategory(urlCategory)
  }, [urlCategory])

  // sync state → URL
  useEffect(() => {
    setSearchParams({ category })
  }, [category])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // search
    result = result.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )

    // category
    if (category !== "all") {
      result = result.filter((product) => product.category === category)
    }

    // sorting (safe copy)
    if (sort === "price-asc") {
      result = result.sort((a, b) => a.price - b.price)
    } else if (sort === "price-desc") {
      result = result.sort((a, b) => b.price - a.price)
    } else if (sort === "rating-desc") {
      result = result.sort((a, b) => b.rating - a.rating)
    } else if (sort === "rating-asc") {
      result = result.sort((a, b) => a.rating - b.rating)
    }

    return result
  }, [products, search, category, sort])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className='h-full pt-10'>
      <ShopHeader count={filteredProducts.length} />

      <ShopSearch
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </main>
  )
}

export default Shop

const ShopHeader = ({ count }) => {
  return (
    <div className='mb-8'>
      <h1 className='font-heading font-bold text-3xl sm:text-4xl mb-2'>
        All Products
      </h1>
      <p className='text-white/40 font-body text-sm'>{count} products found</p>
    </div>
  )
}

const ShopSearch = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  return (
    <div className='bg-[#111] border border-white rounded-2xl p-4 mb-6'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <SearchInput search={search} setSearch={setSearch} />
        <CategorySelect category={category} setCategory={setCategory} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>
    </div>
  )
}

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className='relative flex-1 bg-neutral-800/50 rounded-2xl outline outline-neutral-700'>
      <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none size-4' />

      <input
        type='text'
        placeholder='Search products...'
        className='field pl-10 pr-8 h-10 w-full outline-none'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

const CategorySelect = ({ category, setCategory }) => {
  return (
    <div className='relative bg-neutral-800/50 rounded-2xl outline outline-neutral-700 pl-5'>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='field h-10 pr-8 appearance-none cursor-pointer min-w-40 outline-none'
      >
        <option value='all'>All Categories</option>
        <option value='smartphones'>Smartphones</option>
        <option value='laptops'>Laptops</option>
        <option value='fragrances'>Fragrances</option>
        <option value='skincare'>Skincare</option>
        <option value='groceries'>Groceries</option>
        <option value='home-decoration'>Home Decoration</option>
      </select>

      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-white/25 size-4' />
    </div>
  )
}

const SortSelect = ({ sort, setSort }) => {
  return (
    <div className='relative pl-5 bg-neutral-800/50 rounded-2xl outline outline-neutral-700'>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className='field h-10 pr-8 appearance-none cursor-pointer min-w-45 outline-none'
      >
        <option value='default'>Featured</option>
        <option value='price-asc'>Price: Low → High</option>
        <option value='price-desc'>Price: High → Low</option>
        <option value='rating-desc'>Top Rated</option>
        <option value='rating-asc'>Lowest Rated</option>
      </select>

      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-white/25 size-4' />
    </div>
  )
}
