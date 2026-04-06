import React from "react"
import { Link } from "react-router"

const AuthUI = ({ children, variant = "login" }) => {
  if (variant === "register") {
    return (
      <div className='w-md h-fit outline outline-neutral-800 rounded-3xl bg-neutral-900/40 p-8 space-y-6'>
        <Header
          title='Create account'
          desc='Join SkyMart and start shopping'
        />
        {children}
        <Footer variant={variant} />
      </div>
    )
  }
  return (
    <div className='w-md h-fit outline outline-neutral-800 rounded-3xl bg-neutral-900/40 p-8 space-y-6'>
      <Header />
      {children}
      <Footer variant={variant} />
    </div>
  )
}

export default AuthUI

const Header = ({ title, desc }) => {
  return (
    <div className='space-y-2'>
      <h1 className='text-2xl font-bold'>{title || "Sign in"}</h1>
      <p className='text-neutral-500 font-(--font-dm-sans) text-sm'>
        {desc || "Enter your credentials to continue"}
      </p>
    </div>
  )
}

const Footer = ({ variant }) => {
  return (
    <p className='text-neutral-600 font-(--font-dm-sans) text-sm text-center'>
      {variant === "register" ? "Already" : "Don't"} have an account?{" "}
      <Link
        to={variant === "register" ? "/login" : "/register"}
        className='text-(--brand) font-medium'
      >
        {variant === "register" ? "Sign in" : "Create one"}
      </Link>
    </p>
  )
}
