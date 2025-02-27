import "./Sidebar.css"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { classNames } from "~/utils/style"
import { setIsSidebarOpen } from "~/slices/uiSlice"
import {
    performReset,
    setVisualizerStatus,
    setIsPickingFinish,
    setIsPickingStart,
    setShowCellWeights,
    setShowRawCellWeights,
} from "~/slices/visualizerSlice"
import { useAlgorithm } from "~/hooks/useAlgorithm"
import Button from "~/components/Button/Button"
import Icon from "~/components/Icon/Icon"
import Switch from "~/components/Switch/Switch"
import SidebarSection from "./SidebarSection"
import MazeGenerationSection from "./section/MazeGeneration"
import SearchAlgorithmSection from "./section/SearchAlgorithm"
import { VISUALIZER_STATUS_MAP } from "~/visualizer/const"
import usePanPinchZoom from "~/context/PanPinchZoom/usePanPinchZoom"
import { Popover, Transition } from "@headlessui/react"
import * as React from "react"

const ControlsInformation = () => {
    return (
        <div className="flex flex-col p-2 text-xs gap-2 text-zinc-400">
            <p>
                <span className="text-zinc-50">Left-click</span> to place a
                block
            </p>
            <p>
                <span className="text-zinc-50">Right-click</span> to erase a
                block
            </p>
            <p>
                <span className="text-zinc-50">Shift + Drag</span> to pan around
                the maze.
            </p>
            <p>
                <span className="text-zinc-50">Shift + Mouse wheel</span> to
                zoom in/out of the maze.
            </p>
        </div>
    )
}

function Sidebar() {
    const dispatch = useAppDispatch()
    const { isSidebarOpen } = useAppSelector((state) => state.ui)
    const {
        showCellWeights,
        showRawCellWeights,
        isRunning,
        isCompleted,
        isPickingStart,
        isPickingFinish,
    } = useAppSelector((state) => state.visualizer)

    const runAlgorithm = useAlgorithm()
    const { panPinchZoom } = usePanPinchZoom()

    const handleReset = () => {
        dispatch(performReset())
        dispatch(setVisualizerStatus(VISUALIZER_STATUS_MAP.READY))
    }

    React.useEffect(function showControlsInformation() {
        // Hack to make Headlessui.Popover open by default
        setTimeout(() => {
            const button = document.querySelector("#controlsInfo")
            if (button && button instanceof HTMLButtonElement) {
                button.click()
            }
        }, 500)
    }, [])

    return (
        <aside
            className={classNames(
                "duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col",
                isSidebarOpen ? "w-72" : "w-16"
            )}
        >
            <div className="w-full h-16 flex-none overflow-y-auto flex flex-col items-center justify-center overflow-hidden bg-zinc-800/50">
                {isSidebarOpen && (
                    <div className="p-4 gap-4 w-full flex items-center overflow-hidden sidebar-fade-in">
                        <Icon
                            name="IconLayoutSidebarLeftCollapse"
                            onClick={() =>
                                dispatch(setIsSidebarOpen(!isSidebarOpen))
                            }
                            className="h-8 w-8 text-violet-500 cursor-pointer"
                        />
                        <div>
                            <h1 className="font-semibold grow">Labyrinth</h1>
                            <p className="text-xs text-zinc-500">
                                An algorithm visualizer
                            </p>
                        </div>
                    </div>
                )}
                {!isSidebarOpen && (
                    <img
                        src="logo.png"
                        className="h-10 w-10 font-semibold text-center bg-zinc-500"
                    ></img>
                )}
            </div>

            <div className="flex flex-col grow overflow-y-auto items-center custom-scrollbar">
                {!isSidebarOpen && (
                    <Icon
                        name="IconAdjustments"
                        onClick={() =>
                            dispatch(setIsSidebarOpen(!isSidebarOpen))
                        }
                        className="h-8 w-8 text-zinc-500 cursor-pointer mt-2"
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

                        <SidebarSection title="Controls">
                            <ControlsInformation />
                            <Button
                                onClick={() => panPinchZoom?.centerView(1)}
                                secondary
                            >
                                Center Maze
                            </Button>
                        </SidebarSection>

                        <SidebarSection title="Maze Settings">
                            <div className="flex flex-col py-2 text-xs gap-2 text-zinc-400">
                                <p className="text-zinc-400">
                                    Cell weights are hidden by default. For
                                    algorithms that work with weighted graphs,
                                    like Dijkstras, you can enable them from
                                    this panel.
                                </p>
                                <p>
                                    <span className="text-zinc-50">
                                        Mouse-wheel up
                                    </span>{" "}
                                    over a cell to increase it's weight
                                </p>
                                <p>
                                    <span className="text-zinc-50">
                                        Mouse-wheel down
                                    </span>{" "}
                                    over a cell to decrease it's weight
                                </p>
                            </div>

                            <Switch
                                label="Visual cell weights"
                                checked={showCellWeights}
                                onChange={(show) =>
                                    dispatch(setShowCellWeights(show))
                                }
                            />
                            <Switch
                                label="Raw cell weights"
                                checked={showRawCellWeights}
                                onChange={(show) =>
                                    dispatch(setShowRawCellWeights(show))
                                }
                            />
                        </SidebarSection>

                        <p className="text-xs text-zinc-500 text-right">
                            Made with ❤️ by Vihar
                        </p>
                    </div>
                )}
            </div>

            <div className="w-full flex-none py-4 px-2 flex flex-col items-center gap-2">
                {!isSidebarOpen && (
                    <Popover className="relative h-8 w-8 mb-2">
                        {({ open }) => (
                            <>
                                <Popover.Button id="controlsInfo">
                                    <Icon
                                        name="IconBulb"
                                        className={classNames(
                                            "h-8 w-8 cursor-pointer",
                                            open
                                                ? "text-yellow-500"
                                                : "text-zinc-500"
                                        )}
                                    />
                                </Popover.Button>

                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Popover.Panel
                                        className={`
                            fixed z-10 w-52 bottom-1
                            ${isSidebarOpen ? "left-72" : "left-16"}
                            bg-zinc-900 border-2 border-zinc-700
                            rounded-md`}
                                    >
                                        <ControlsInformation />
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                )}

                {!isSidebarOpen && (
                    <Icon
                        name="IconFocusCentered"
                        onClick={() => panPinchZoom?.centerView(1)}
                        className="h-8 w-8 text-zinc-500 cursor-pointer mb-4"
                    />
                )}

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
