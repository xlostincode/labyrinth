import { useAppSelector } from "~/hooks/redux"
import { classNames } from "~/utils/style"
import { createRowId } from "~/utils/maze"
import Cell from "~/components/Cell/Cell"
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch"
import * as React from "react"
import usePanPinchZoom from "~/context/PanPinchZoom/usePanPinchZoom"

function Maze() {
    const { maze } = useAppSelector((state) => state.visualizer)
    const { isSidebarOpen } = useAppSelector((state) => state.ui)

    // START - To make `react-zoom-pan-pinch` available across components
    const panPinchZoomRef = React.useRef<ReactZoomPanPinchContentRef | null>(
        null
    )
    const { setPanPinchZoom } = usePanPinchZoom()

    React.useEffect(() => {
        if (panPinchZoomRef.current && setPanPinchZoom) {
            setPanPinchZoom(panPinchZoomRef.current)
        }
    }, [setPanPinchZoom])
    // END

    return (
        <section
            className={classNames(
                "duration-300 w-full max-h-screen overflow-hidden bg-zinc-950",
                isSidebarOpen ? "pl-72" : "pl-16"
            )}
        >
            <TransformWrapper
                ref={panPinchZoomRef}
                limitToBounds={false}
                panning={{
                    activationKeys: ["Shift"],
                }}
                centerOnInit
            >
                <TransformComponent wrapperClass="!w-full !h-screen">
                    <div className="flex flex-col border border-zinc-600 w-fit">
                        {maze.map((row, rowIdx) => (
                            <div
                                key={createRowId(row)}
                                className="flex"
                                draggable={false}
                            >
                                {row.map((cell, colIdx) => (
                                    <Cell
                                        key={cell.id}
                                        cell={cell}
                                        rowIdx={rowIdx}
                                        colIdx={colIdx}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </section>
    )
}

export default Maze
