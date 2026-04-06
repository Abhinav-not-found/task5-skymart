import Category from "@/components/home/category"
import Header from "@/components/home/header"
import Product from "@/components/home/product"
import Stats from "@/components/home/stats"

const Home = () => {
  return (
    <main className='h-full'>
      <Header />
      <Stats />
      <Category />
      <Product />
    </main>
  )
}

export default Home
