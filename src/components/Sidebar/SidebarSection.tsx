import { classNames } from "~/utils/style"

type Props = React.PropsWithChildren<{
    className?: string
    title?: string
}>

function SidebarSection({ title, className, children }: Props) {
    return (
        <section
            className={classNames(
                "flex flex-col gap-2 bg-zinc-800/50 rounded-md p-2",
                className
            )}
        >
            {title && <h3 className="text-zinc-400">{title}</h3>}
            {children}
        </section>
    )
}

export default SidebarSection
