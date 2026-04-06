import { Link } from "react-router"

const topRated = [
  {
    id: 6,
    name: "Professional Camera Lens",
    price: "$599.99",
    img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: "$199.99",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  },
  {
    id: 13,
    name: "4K Ultra HD Monitor",
    price: "$349.99",
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
  },
]

const newArrivals = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$99.99",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: "$299.99",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 3,
    name: "Comfortable Cotton T-Shirt",
    price: "$24.99",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
]

const Product = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10'>
      <ProductSection
        title='⭐ Top Rated'
        link='/products?sort=rating'
        products={topRated}
      />

      <ProductSection
        title='⚡ New Arrivals'
        link='/products'
        products={newArrivals}
      />
    </div>
  )
}

const ProductSection = ({ title, link, products }) => {
  return (
    <div className='bg-neutral-950 border border-white/20 rounded-3xl p-6'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='font-heading font-bold text-lg flex items-center gap-2 text-ink'>
          {title}
        </h2>

        <Link
          to={link}
          className='text-(--brand) text-xs hover:text-(--brand)-light flex items-center gap-1'
        >
          See all →
        </Link>
      </div>

      <div className='space-y-2'>
        {products.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

const ProductItem = ({ id, name, price, img }) => {
  return (
    <Link
      to={`/products/${id}`}
      className='group flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/6 hover:border-(--brand)/30 rounded-2xl transition-all duration-200'
    >
      <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5'>
        <img src={img} alt={name} className='w-full h-full object-contain' />
      </div>

      <div className='flex-1 min-w-0'>
        <p className='text-white/80 text-xs font-body truncate'>{name}</p>
        <p className='text-(--brand) font-heading font-bold text-sm mt-0.5'>
          {price}
        </p>
      </div>

      <button className='shrink-0 w-7 h-7 bg-(--brand)/10 hover:bg-(--brand) text-(--brand) hover:text-ink rounded-lg flex items-center justify-center transition-all'>
        🛒
      </button>
    </Link>
  )
}

export default Product
