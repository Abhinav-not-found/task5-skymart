import Logo from "@/components/general/logo"
import AuthUI from "@/components/ui/auth/auth-ui"
import LoginForm from "@/form/login-form"

const Login = () => {
  return (
    <main className='h-screen w-full flex divide-x divide-white'>
      <div className='w-1/2 h-full p-12 flex flex-col'>
        <Logo />

        <div className='flex-1 flex flex-col justify-center'>
          <p className='text-(--brand) text-sm font-medium mb-4 tracking-widest uppercase'>
            Welcome back
          </p>

          <h1 className='font-bold text-5xl leading-tight mb-6 text-white'>
            Shop the future.
            <br />
            <span className='text-(--brand)'>Today.</span>
          </h1>

          <p className='text-white/40 text-base max-w-sm leading-relaxed'>
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          <div className='grid grid-cols-3 gap-4 mt-12'>
            <Stat number='20K+' label='Products' />
            <Stat number='50K+' label='Users' />
            <Stat number='4.9★' label='Rating' />
          </div>
          <div className='size-80 bg-radial from-(--brand)/15 to-transparent absolute top-40 -left-20 rounded-full'></div>
        </div>
      </div>

      <div className='w-1/2 h-full p-12 flex items-center justify-center'>
        <AuthUI>
          <LoginForm />
        </AuthUI>
      </div>
    </main>
  )
}

export default Login
const Stat = ({ number, label }) => {
  return (
    <div className='bg-white/5 border border-white rounded-2xl p-4 text-center'>
      <p className='font-bold text-xl text-(--brand)'>{number}</p>
      <p className='text-white/40 text-xs mt-1'>{label}</p>
    </div>
  )
}
