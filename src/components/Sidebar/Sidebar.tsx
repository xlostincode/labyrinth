import "./Sidebar.css"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { classNames } from "~/utils/style"
import { setIsSidebarOpen } from "~/slices/uiSlice"
import {
    performReset,
    setAlgorithmStatus,
    setIsPickingFinish,
    setIsPickingStart,
    setShowCellWeights,
} from "~/slices/visualizerSlice"
import { useAlgorithm } from "~/hooks/useAlgorithm"
import Button from "~/components/Button/Button"
import Icon from "~/components/Icon/Icon"
import Switch from "~/components/Switch/Switch"
import SidebarSection from "./SidebarSection"
import MazeGenerationSection from "./section/MazeGeneration"
import SearchAlgorithmSection from "./section/SearchAlgorithm"

function Sidebar() {
    const dispatch = useAppDispatch()
    const { isSidebarOpen } = useAppSelector((state) => state.ui)
    const {
        showCellWeights,
        isRunning,
        isCompleted,
        isPickingStart,
        isPickingFinish,
    } = useAppSelector((state) => state.visualizer)

    const runAlgorithm = useAlgorithm()

    const handleReset = () => {
        dispatch(performReset())
        dispatch(setAlgorithmStatus("ready"))
    }

    return (
        <aside
            className={classNames(
                "fixed duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col",
                isSidebarOpen ? "w-72" : "w-16"
            )}
        >
            <div className="w-full h-16 flex-none overflow-y-auto flex flex-col items-center justify-center overflow-hidden bg-zinc-800/50">
                {isSidebarOpen && (
                    <div className="p-4 w-full flex items-center overflow-hidden sidebar-fade-in">
                        <Icon
                            name="IconLayoutSidebarLeftCollapse"
                            onClick={() =>
                                dispatch(setIsSidebarOpen(!isSidebarOpen))
                            }
                            className="h-8 w-8 text-violet-500 cursor-pointer"
                        />
                        <h1 className="font-semibold grow text-center">
                            Path Finding Visualizer
                        </h1>
                    </div>
                )}
                {/* TODO: Replace with icon */}
                {!isSidebarOpen && (
                    <div className="h-10 w-10 font-semibold text-center bg-zinc-500 rounded-md"></div>
                )}
            </div>

            <div className="flex flex-col grow overflow-y-auto items-center custom-scrollbar">
                {!isSidebarOpen && (
                    <Icon
                        name="IconAdjustments"
                        onClick={() =>
                            dispatch(setIsSidebarOpen(!isSidebarOpen))
                        }
                        className="h-8 w-8 text-violet-500 cursor-pointer"
                    />
                )}

                {isSidebarOpen && (
                    <div className="flex-col w-full justify-center p-2 gap-4 flex sidebar-fade-in">
                        {/* Start and Finish picker */}
                        <SidebarSection className="items-center">
                            <div className="flex gap-2">
                                <button
                                    className={classNames(
                                        "flex gap-2 items-center",
                                        isPickingStart &&
                                            "text-violet-400 font-semibold"
                                    )}
                                    onClick={() =>
                                        dispatch(
                                            setIsPickingStart(!isPickingStart)
                                        )
                                    }
                                >
                                    <Icon name="IconHome" />
                                    Pick Start
                                </button>

                                <button
                                    className={classNames(
                                        "flex gap-2 items-center",
                                        isPickingFinish &&
                                            "text-violet-400 font-semibold"
                                    )}
                                    onClick={() =>
                                        dispatch(
                                            setIsPickingFinish(!isPickingFinish)
                                        )
                                    }
                                >
                                    <Icon name="IconPennant" />
                                    Pick Finish
                                </button>
                            </div>
                            {isPickingStart && (
                                <span className="font-small text-zinc-500 text-center">
                                    Right-click on a cell to set as starting
                                    point
                                </span>
                            )}

                            {isPickingFinish && (
                                <span className="font-small text-zinc-500 text-center">
                                    Right-click on a cell to set as finishing
                                    point
                                </span>
                            )}
                        </SidebarSection>

                        <SearchAlgorithmSection />

                        <MazeGenerationSection />

                        <SidebarSection title="Maze Settings">
                            <Switch
                                label="Show cell weights"
                                checked={showCellWeights}
                                onChange={(show) =>
                                    dispatch(setShowCellWeights(show))
                                }
                            />
                        </SidebarSection>
                    </div>
                )}
            </div>

            <div className="w-full flex-none py-4 px-2 flex flex-col gap-2">
                <Button
                    onClick={runAlgorithm}
                    disabled={isRunning || isCompleted}
                >
                    {isSidebarOpen ? (
                        <span>
                            {isCompleted
                                ? "Completed"
                                : isRunning
                                ? "Running"
                                : "Run"}
                        </span>
                    ) : (
                        <Icon name="IconPlayerPlay" className="h-6 w-6" />
                    )}
                </Button>
                <Button onClick={handleReset} disabled={!isCompleted} danger>
                    {isSidebarOpen ? (
                        <span>Reset</span>
                    ) : (
                        <Icon name="IconRefresh" className="h-6 w-6" />
                    )}
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar
