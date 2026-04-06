import AuthNav from "@/components/ui/auth/auth-nav"
import AuthUI from "@/components/ui/auth/auth-ui"
import RegisterForm from "@/form/register-form"

const Register = () => {
  return (
    <main className='h-screen flex flex-col items-center justify-center space-y-4'>
      <AuthNav />
      <AuthUI variant='register'>
        <RegisterForm />
      </AuthUI>
    </main>
  )
}

export default Register
