import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { classNames } from "~/utils/style"
import Button from "~/components/Button/Button"
import { setIsLearnSidebarOpen } from "~/slices/uiSlice"
import { PATH_FINDING_ALGORITHM_MAP } from "~/algorithms/const"
import useLearnAlgorithmContent from "~/hooks/useLearnAlgorithmContent"
import Markdown from "~/components/Markdown/Markdown"
import usePanPinchZoom from "~/context/PanPinchZoom/usePanPinchZoom"

function Learn() {
    const dispatch = useAppDispatch()
    const isLearnSidebarOpen = useAppSelector(
        (state) => state.ui.isLearnSidebarOpen
    )
    const selectedPathFindingAlgorithm = useAppSelector(
        (state) => state.visualizer.selectedPathFindingAlgorithm
    )

    const { content } = useLearnAlgorithmContent(selectedPathFindingAlgorithm)

    const { panPinchZoom } = usePanPinchZoom()

    return (
        <aside
            className={classNames(
                "duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col overflow-hidden",
                isLearnSidebarOpen ? "w-2/5" : "w-0"
            )}
        >
            {!isLearnSidebarOpen && (
                <Button
                    className="absolute bottom-4 right-4 !w-fit"
                    icon="IconSparkles"
                    onClick={() => {
                        dispatch(setIsLearnSidebarOpen(true))
                        setTimeout(() => panPinchZoom?.centerView(1), 400)
                    }}
                >
                    Learn
                </Button>
            )}

            <div className="flex gap-2 items-center bg-zinc-800">
                <Button
                    className="!w-fit"
                    icon="IconLayoutSidebarRightCollapse"
                    onClick={() => {
                        dispatch(setIsLearnSidebarOpen(false))
                        setTimeout(() => panPinchZoom?.centerView(1), 400)
                    }}
                    secondary
                />
                <h2 className="w-full flex-1">
                    {`Learn ${PATH_FINDING_ALGORITHM_MAP[selectedPathFindingAlgorithm].name}`}
                </h2>
            </div>

            {content && <Markdown content={content} />}
        </aside>
    )
}

export default Learn
