import * as TablerIconsList from "@tabler/icons-react"
import { type TablerIconsProps } from "@tabler/icons-react"

type IconProps = TablerIconsProps & {
    name: Exclude<keyof typeof TablerIconsList, "createReactComponent">
}

// TODO: Optimize for bundle size
function Icon({ name, ...rest }: IconProps) {
    const TablerIcon = TablerIconsList[name]

    return <TablerIcon {...rest} />
}

export default Icon
