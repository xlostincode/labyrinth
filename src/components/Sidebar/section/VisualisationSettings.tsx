import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import SidebarSection from "../SidebarSection"
import Range from "~/components/Range/Range"
import { setStepAnimationDelay } from "~/slices/visualizerSlice"

const VisualisationSettings = () => {
    const dispatch = useAppDispatch()
    const { stepAnimationDelay } = useAppSelector((state) => state.visualizer)

    return (
        <SidebarSection title="Visualization Settings">
            <Range
                minimum={0}
                maximum={100}
                initialValue={stepAnimationDelay}
                label="Animation Delay (MS)"
                debounce={500}
                onChange={(value) => dispatch(setStepAnimationDelay(value))}
            />
        </SidebarSection>
    )
}

export default VisualisationSettings
