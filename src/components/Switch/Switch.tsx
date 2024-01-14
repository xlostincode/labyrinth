import { Switch as HUISwitch } from "@headlessui/react"
import * as React from "react"
import { classNames } from "~/utils/style"

type CustomSwitchProps = {
    label: string
    switchPosition?: "left" | "right"
}

type HUISwitch = React.ComponentProps<typeof HUISwitch>

type SwitchProps = CustomSwitchProps & HUISwitch

function Switch({ label, switchPosition = "left", ...rest }: SwitchProps) {
    return (
        <HUISwitch {...rest} as={React.Fragment}>
            {({ checked }) => (
                <div
                    role="switch"
                    className={classNames(
                        "flex gap-2",
                        switchPosition === "right" && "flex-row-reverse"
                    )}
                >
                    <button
                        className={`${
                            checked ? "bg-violet-500" : "bg-zinc-700"
                        } relative inline-flex h-6 w-10 items-center rounded-md`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${
                                checked ? "translate-x-5" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-md bg-white transition`}
                        />
                    </button>
                    {label}
                </div>
            )}
        </HUISwitch>
    )
}

export default Switch
