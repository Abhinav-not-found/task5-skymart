import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import Button from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"
import { useAuth } from "@/context/auth-context"

//add button loading state

const RegisterForm = () => {
  const { registeredUser, setRegisteredUser, setLoggedInUser } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch("password", "")
  const email = watch("email", "")
  const [loading, setLoading] = useState(false)

  const handleRegister = (data) => {
    if (
      !data.fullName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("Fill all fields")
      return
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setRegisteredUser(data)
      setLoggedInUser(data)
      toast.success("Account created successfully")
      navigate("/home")
      setLoading(false)
    }, 1000)
  }
  return (
    <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
      {errors.email ||
        (errors.password && <ErrorText>Invalid email or password</ErrorText>)}
      {email && registeredUser?.email === email && (
        <ErrorText>Email already registered!</ErrorText>
      )}
      <Input
        icon={<User className='size-4 text-neutral-600' />}
        eye={false}
        placeholder='Full name'
        register={register}
        name='fullName'
      />
      <Input
        icon={<Mail className='size-4 text-neutral-600' />}
        eye={false}
        placeholder='Email address'
        register={register}
        name='email'
      />
      <Input
        icon={<Lock className='size-4 text-neutral-600' />}
        placeholder='Password (min 6 chars)'
        register={register}
        name='password'
        eye={true}
      />
      {password && <PasswordStrength password={password} />}
      <Input
        icon={<Lock className='size-4 text-neutral-600' />}
        placeholder='Confirm password'
        register={register}
        name='confirmPassword'
        eye={true}
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
            <span className=''>Creating account...</span>
          </>
        ) : (
          <>
            <p>Create Account</p>
          </>
        )}
      </Button>
    </form>
  )
}

export default RegisterForm

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
