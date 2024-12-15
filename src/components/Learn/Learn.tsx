import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { classNames } from "~/utils/style"
import Button from "~/components/Button/Button"
import { setIsLearnSidebarOpen } from "~/slices/uiSlice"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { PATH_FINDING_ALGORITHM_MAP } from "~/algorithms/const"
import useLearnAlgorithmContent from "~/hooks/useLearnAlgorithmContent"

function Learn() {
    const dispatch = useAppDispatch()
    const isLearnSidebarOpen = useAppSelector(
        (state) => state.ui.isLearnSidebarOpen
    )
    const selectedPathFindingAlgorithm = useAppSelector(
        (state) => state.visualizer.selectedPathFindingAlgorithm
    )

    const { content } = useLearnAlgorithmContent(selectedPathFindingAlgorithm)

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
                    }}
                    secondary
                />
                <h2 className="w-full flex-1">
                    {`Learn ${PATH_FINDING_ALGORITHM_MAP[selectedPathFindingAlgorithm].name}`}
                </h2>
            </div>

            <Markdown
                remarkPlugins={[remarkGfm]}
                className="prose prose-invert p-4 font-poppins overflow-y-auto custom-scrollbar"
            >
                {content}
            </Markdown>
        </aside>
    )
}

export default Learn
