import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import Button from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import { useAuth } from "@/context/auth-context"

const LoginForm = () => {
  const { registeredUser, setLoggedInUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)

  const email = watch("email", "")

  const handleLogin = (data) => {
    if (!data.email || !data.password) {
      toast.error("Fill all fields")
      return
    }

    setLoading(true)

    setTimeout(() => {
      // check if user exists
      if (!registeredUser) {
        toast.error("No user found. Please register first.")
        setLoading(false)
        return
      }

      // check credentials
      if (
        registeredUser.email !== data.email ||
        registeredUser.password !== data.password
      ) {
        toast.error("Invalid email or password")
        setLoading(false)
        return
      }

      // success
      setLoggedInUser(registeredUser)
      toast.success("Logged in successfully")
      navigate("/home")
      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
      {(errors.email || errors.password) && (
        <ErrorText>Invalid email or password</ErrorText>
      )}

      {email && registeredUser && registeredUser.email !== email && (
        <ErrorText>User not found</ErrorText>
      )}

      <Input
        icon={<Mail className='size-4 text-neutral-600' />}
        placeholder='Email address'
        register={register}
        name='email'
      />

      <Input
        icon={<Lock className='size-4 text-neutral-600' />}
        placeholder='Password'
        register={register}
        name='password'
        eye
      />

      <Button
        type='submit'
        disabled={loading}
        className={`flex gap-2 w-full items-center justify-center font-semibold text-lg py-3 transition-all ${
          loading
            ? "opacity-60 cursor-not-allowed pointer-events-none"
            : "hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {loading ? (
          <>
            <Spinner />
            <span className=''>Signing in...</span>
          </>
        ) : (
          <>
            <p>Sign in</p>
            <ArrowRight className='size-4.5' />
          </>
        )}
      </Button>
    </form>
  )
}

export default LoginForm

const Input = ({ icon, eye = false, placeholder, register, name = "text" }) => {
  const [view, setView] = useState(false)
  const inputType = eye ? (view ? "text" : "password") : name
  return (
    <div className='border border-neutral-700 rounded-2xl bg-neutral-800/60 px-3 py-1 flex items-center gap-1 focus-within:outline-2 focus-within:outline-(--brand)/30 focus-within:border-(--brand)'>
      {icon}
      <input
        type={inputType}
        className='w-full font-sans p-2 placeholder:text-neutral-600 text-sm outline-none'
        placeholder={placeholder}
        {...register(name)}
      />
      {eye && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            setView(!view)
          }}
        >
          {view ? (
            <EyeOff className='size-4 text-neutral-600 hover:text-neutral-500 cursor-pointer' />
          ) : (
            <Eye className='size-4 text-neutral-600 hover:text-neutral-500 cursor-pointer' />
          )}
        </button>
      )}
    </div>
  )
}

const ErrorText = ({ children }) => {
  return (
    <div className='border border-red-700/40 rounded-xl bg-red-400/10 px-4 py-3 flex items-center gap-1 '>
      <p className='text-sm text-red-400'>{children}</p>
    </div>
  )
}

const PasswordStrength = ({ password }) => {
  const getStrength = (password) => {
    if (!password) return { level: 0, label: "", color: "" }

    const hasMix = /[a-zA-Z]/.test(password) && /[0-9]/.test(password)

    if (password.length <= 5) {
      return { level: 1, label: "Weak", color: "bg-red-500" }
    }

    if (password.length <= 9) {
      return {
        level: 2,
        label: hasMix ? "Medium" : "Weak",
        color: hasMix ? "bg-yellow-500" : "bg-yellow-500",
      }
    }

    return { level: 3, label: "Strong", color: "bg-[var(--brand)]" }
  }
  const { level, label, color } = getStrength(password)

  return (
    <div className='flex items-center gap-0'>
      <div className='flex gap-1 w-full'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= level ? color : "bg-neutral-800"
            }`}
          />
        ))}
      </div>

      <p
        className={`text-xs font-medium min-w-12.5 text-right ${
          level === 1
            ? "text-red-400"
            : level === 2
              ? "text-yellow-400"
              : "text-(--brand)"
        }`}
      >
        {label}
      </p>
    </div>
  )
}
