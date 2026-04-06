import { Outlet } from "react-router"

const Container = () => {
  return (
    <div className='px-24 pt-16'>
      <Outlet />
    </div>
  )
}

export default Container
