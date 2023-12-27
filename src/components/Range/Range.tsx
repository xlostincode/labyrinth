import * as React from "react"

type Props = {
    minimum: number
    maximum: number
    step?: number
    name?: string
    initialValue?: number
    label?: string
    debounce?: number
    onChange?: (value: number) => void
}

function Range({
    minimum,
    maximum,
    debounce = 0,
    step = 1,
    initialValue,
    label,
    name,
    onChange,
}: Props) {
    const debounceTimerRef = React.useRef<number | undefined>()
    const [value, setValue] = React.useState(initialValue || minimum)

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <div className="flex gap-2">
                <input
                    type="range"
                    name={name}
                    min={minimum}
                    max={maximum}
                    step={step}
                    value={value}
                    className="flex-1 accent-violet-500"
                    onChange={(event) => {
                        setValue(event.target.valueAsNumber)

                        if (debounce > 0) {
                            window.clearTimeout(debounceTimerRef.current)

                            debounceTimerRef.current = window.setTimeout(() => {
                                onChange?.(event.target.valueAsNumber)
                                debounceTimerRef.current = undefined
                            }, 500)
                        } else {
                            onChange?.(event.target.valueAsNumber)
                        }
                    }}
                ></input>
                <p className="w-8 text-center">{value}</p>
            </div>
        </>
    )
}

export default Range
