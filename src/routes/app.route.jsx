import { createBrowserRouter, RouterProvider } from "react-router"
import Container from "@/components/general/container"
import About from "@/pages/about"
import Home from "@/pages/home"
import Login from "@/pages/login"
import ProductDetail from "@/pages/product-detail"
import Register from "@/pages/register"
import Shop from "@/pages/shop"
import ProtectedRoute from "./protected.route"
import PublicRoute from "./public.route"

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Container />,
          children: [
            { path: "home", element: <Home /> },
            { path: "products", element: <Shop /> },
            { path: "about", element: <About /> },
            { path: "products/:id", element: <ProductDetail /> },
          ],
        },
      ],
    },

    {
      path: "/login",
      element: <PublicRoute />,
      children: [{ index: true, element: <Login /> }],
    },

    {
      path: "/register",
      element: <PublicRoute />,
      children: [{ index: true, element: <Register /> }],
    },

    {
      path: "/", // optional redirect
      element: <PublicRoute />,
      children: [{ index: true, element: <Login /> }],
    },
  ])
  return <RouterProvider router={router} />
}

export default AppRoute
