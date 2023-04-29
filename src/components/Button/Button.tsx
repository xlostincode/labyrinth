import { classNames } from "~/utils"
import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
  danger?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps) {
  const { onClick, disabled, danger, children, className } = props

  return (
    <button
      className={classNames(
        className ??
          "p-2 bg-violet-500 rounded-md w-full duration-300 flex items-center justify-center",
        "hover:bg-violet-600  active:bg-violet-500",
        danger && "bg-red-500 hover:bg-red-600  active:bg-red-500",
        "disabled:bg-zinc-800 disabled:text-zinc-600"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
