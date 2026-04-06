import { createContext, useContext, useEffect, useState } from "react"
import axiosInstance from "@/config/axios"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const data = localStorage.getItem("products")
    return data ? JSON.parse(data) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products))
    }
  }, [products])

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/products")
      setProducts(res.data.products)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch products", err)
      setError("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }
  const getSingleProduct = async (id) => {
    try {
      setLoading(true)
      const res = await axiosInstance.get(`/products/${id}`)
      return res.data
    } catch (err) {
      console.error("Failed to fetch product", err)
      setError("Failed to fetch product")
      return null
    } finally {
      setLoading(false)
    }
  }

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getAllProducts,
        loading,
        error,
        getSingleProduct,
        categories,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
