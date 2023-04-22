import "./Cell.css"
import classnames from "classnames"
import useVisualizerStore from "~/stores/visualizerStore"
import type { CellData } from "~/types/visualizer"

type CellProps = {
  cell: CellData
  rowIdx: number
  colIdx: number
}

function Cell({ cell, rowIdx, colIdx }: CellProps) {
  const isRunning = useVisualizerStore((state) => state.isRunning)
  const isWeighted = useVisualizerStore((state) => state.isWeighted)
  const setCellState = useVisualizerStore((state) => state.setCellState)

  const handleOnClick = () => {
    if (isRunning) return

    setCellState(rowIdx, colIdx, cell.state === "block" ? "empty" : "block")
  }

  const shouldShowWeight = () => {
    // Only show cell weight when
    // - a weighed algorithm is selected
    // - cell is empty, visited or path
    // - cell has a numeric weight
    return (
      isWeighted &&
      (cell.state === "empty" ||
        cell.state === "visited" ||
        cell.state === "path")
    )
  }

  return (
    <div
      className={classnames(
        "flex items-center justify-center h-6 w-6 transition-all",
        cell.state === "block" && "bg-zinc-600",
        cell.state === "visited" && "bg-orange-500",
        cell.state === "finish" && "bg-green-500",
        cell.state === "path" && "bg-green-500 path",
        cell.state === "start" && "bg-yellow-500",
        (cell.state === "block" || cell.state === "empty") &&
          "hover:bg-zinc-400 cursor-pointer"
      )}
      onClick={handleOnClick}
    >
      {shouldShowWeight() && cell.weight}
    </div>
  )
}

export default Cell
