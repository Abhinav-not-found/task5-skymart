import { createRoot } from "react-dom/client"
import "./index.css"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/auth-context"
import { CartProvider } from "./context/cart-context"
import { ProductProvider } from "./context/product-context"
import AppRoute from "./routes/app.route"

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <div className='bg-neutral-950 text-white w-full h-full'>
          <Toaster
            position='bottom-right'
            toastOptions={{
              style: {
                background: "#171717",
                color: "#fff",
                border: "1px solid #262626",
                borderRadius: "12px",
              },
            }}
          />
          <AppRoute />
        </div>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>,
)
