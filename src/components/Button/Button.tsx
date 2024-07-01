import { classNames } from "~/utils/style"
import { ButtonHTMLAttributes } from "react"
import Icon from "~/components/Icon/Icon"

type ButtonProps = {
    icon?: React.ComponentProps<typeof Icon>["name"]
    secondary?: boolean
    danger?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps) {
    const { onClick, secondary, disabled, danger, icon, children, className } =
        props

    return (
        <button
            className={classNames(
                "p-2 rounded-md w-full duration-300 flex items-center justify-center",
                danger
                    ? "bg-red-500 hover:bg-red-600  active:bg-red-500"
                    : secondary
                    ? "text-violet-500 hover:text-violet-600  active:text-violet-500"
                    : "bg-violet-500 hover:bg-violet-600  active:bg-violet-500",
                secondary
                    ? "disabled:text-zinc-600"
                    : "disabled:bg-zinc-800 disabled:text-zinc-600",
                className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {icon && <Icon name={icon} className="mr-1" />}
            {children}
        </button>
    )
}

export default Button
