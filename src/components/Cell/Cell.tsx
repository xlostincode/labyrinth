import "./Cell.css"
import { classNames } from "~/utils"
import type { CellData } from "~/types/visualizer"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { setCellState, setFinish, setStart } from "~/slices/visualizerSlice"
import { useCallback } from "react"

type CellProps = {
    cell: CellData
    rowIdx: number
    colIdx: number
}

// TODO: Check if the rowIdx, colIdx and cell need to be added to the useCallback dependancies
function Cell({ cell, rowIdx, colIdx }: CellProps) {
    const { isRunning, isWeighted, isPickingStart, isPickingFinish } =
        useAppSelector((state) => state.visualizer)
    const dispatch = useAppDispatch()

    const handleRightClick = useCallback(
        (event: React.MouseEvent) => {
            if (isRunning) return
            if (isPickingStart) dispatch(setStart({ rowIdx, colIdx }))
            if (isPickingFinish) dispatch(setFinish({ rowIdx, colIdx }))
            event.preventDefault()
        },
        [isRunning, isPickingStart, isPickingFinish]
    )

    const handleDrawing = useCallback(
        (event: React.MouseEvent) => {
            if (isRunning) return
            if (event.buttons === 0) return

            if (event.buttons === 1) {
                dispatch(
                    setCellState({
                        rowIdx,
                        colIdx,
                        newState: "block",
                    })
                )
            } else if (event.buttons === 2) {
                dispatch(
                    setCellState({
                        rowIdx,
                        colIdx,
                        newState: "empty",
                    })
                )
            }
        },
        [isRunning]
    )

    const shouldShowWeight = () => {
        return (
            isWeighted &&
            (cell.state === "empty" ||
                cell.state === "visited" ||
                cell.state === "path")
        )
    }

    return (
        <div
            className={classNames(
                "flex items-center justify-center h-6 w-6 transition-all",
                cell.state === "block" && "bg-zinc-600",
                cell.state === "visited" && "bg-orange-500",
                cell.state === "finish" && "bg-green-500",
                cell.state === "path" && "bg-green-500 path",
                cell.state === "start" && "bg-yellow-500",
                (cell.state === "block" || cell.state === "empty") &&
                    "hover:bg-zinc-400 cursor-pointer"
            )}
            onMouseDown={handleDrawing}
            onMouseEnter={handleDrawing}
            onContextMenu={handleRightClick}
            draggable={false}
        >
            {shouldShowWeight() && cell.weight}
        </div>
    )
}

export default Cell
