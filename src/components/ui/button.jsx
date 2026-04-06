import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const variants = {
  default: "bg-(--brand) text-black hover:brightness-110",
  ghost: "text-black hover:bg-neutral-100",
  outline:
    "text-black border border-neutral-700 text-neutral-400 hover:bg-neutral-900",
}

const sizes = {
  default: "py-2 px-3 text-sm",
  sm: "py-2 px-3 text-xs",
  icon: "size-10 flex items-center justify-center",
  lg: "py-2.5 px-4 text-base",
}

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          "rounded-xl cursor-pointer active:scale-97 font-(--font-brand) tracking-normal",
          variants[variant],
          sizes[size],
          className,
        ),
      )}
    >
      {children}
    </button>
  )
}

export default Button
