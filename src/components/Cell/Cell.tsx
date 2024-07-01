import "./Cell.css"
import { classNames } from "~/utils/style"
import { CELL_STATE_MAP, CellData } from "~/maze/const"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import {
    setCellState,
    setFinish,
    setStart,
    increaseOrDecreaseCellWeight,
} from "~/slices/visualizerSlice"
import * as React from "react"

type CellProps = {
    cell: CellData
    rowIdx: number
    colIdx: number
}

// TODO: Check if the rowIdx, colIdx and cell need to be added to the useCallback dependancies
function Cell({ cell, rowIdx, colIdx }: CellProps) {
    const { isRunning, showCellWeights, isPickingStart, isPickingFinish } =
        useAppSelector((state) => state.visualizer)
    const dispatch = useAppDispatch()

    const handleRightClick = React.useCallback(
        (event: React.MouseEvent) => {
            if (isRunning) return
            if (isPickingStart) dispatch(setStart({ rowIdx, colIdx }))
            if (isPickingFinish) dispatch(setFinish({ rowIdx, colIdx }))
            event.preventDefault()
        },
        [isRunning, isPickingStart, isPickingFinish]
    )

    const handleDrawing = React.useCallback(
        (event: React.MouseEvent) => {
            if (isRunning) return
            if (event.buttons === 0) return
            if (event.shiftKey) return

            if (event.buttons === 1) {
                // Left-click
                dispatch(
                    setCellState({
                        rowIdx,
                        colIdx,
                        newState: CELL_STATE_MAP.BLOCK,
                    })
                )
            } else if (event.buttons === 2) {
                // Right-click
                dispatch(
                    setCellState({
                        rowIdx,
                        colIdx,
                        newState: CELL_STATE_MAP.EMPTY,
                    })
                )
            }
        },
        [isRunning]
    )

    // TODO: Figure out a way to handle this while keeping the zoom
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY < 0) {
            // Scrolling Up
            dispatch(
                increaseOrDecreaseCellWeight({
                    rowIdx,
                    colIdx,
                    operation: "increase",
                })
            )
        } else if (event.deltaY > 0) {
            // Scrolling Down
            dispatch(
                increaseOrDecreaseCellWeight({
                    rowIdx,
                    colIdx,
                    operation: "decrease",
                })
            )
        }
    }

    const shouldShowWeight = () => {
        return (
            showCellWeights &&
            (cell.state === CELL_STATE_MAP.EMPTY ||
                cell.state === CELL_STATE_MAP.VISITED ||
                cell.state === CELL_STATE_MAP.PATH)
        )
    }

    return (
        <div
            className={classNames(
                "flex items-center justify-center h-6 w-6 transition-all",
                cell.state === CELL_STATE_MAP.BLOCK && "bg-zinc-600",
                cell.state === CELL_STATE_MAP.VISITED && "bg-orange-500",
                cell.state === CELL_STATE_MAP.FINISH && "bg-green-500",
                cell.state === CELL_STATE_MAP.PATH && "bg-green-500 path",
                cell.state === CELL_STATE_MAP.START && "bg-yellow-500",
                (cell.state === CELL_STATE_MAP.BLOCK ||
                    cell.state === CELL_STATE_MAP.EMPTY) &&
                    "hover:bg-zinc-400 cursor-pointer"
            )}
            onMouseDown={handleDrawing}
            onMouseEnter={handleDrawing}
            onContextMenu={handleRightClick}
            onWheel={handleWheel}
            draggable={false}
        >
            {shouldShowWeight() && cell.weight}
        </div>
    )
}

export default Cell
