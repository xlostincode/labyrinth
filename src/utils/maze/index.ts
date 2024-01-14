import type { PathFromStartToFinish } from "~/visualizer/const"
import type { CellData, Maze } from "~/maze/const"

export function generateVisitedMaze(mazeWidth: number, mazeHeight: number) {
    const visitedMaze = new Array(mazeHeight).fill(null).map((e) => {
        return new Array(mazeWidth).fill(false)
    })

    return visitedMaze as boolean[][]
}

export function createRowId(row: CellData[]) {
    const parts = []

    for (let i = 0; i < row.length; i++) {
        parts.push(row[i].id.slice(0, 4))
    }

    return parts.join("")
}

export function isValidCell(
    mazeWidth: number,
    mazeHeight: number,
    cellRowIdx: number,
    cellColIdx: number
) {
    if (cellRowIdx < 0 || cellRowIdx >= mazeHeight) return false
    if (cellColIdx < 0 || cellColIdx >= mazeWidth) return false

    return true
}

export const getPathCost = (maze: Maze, path: PathFromStartToFinish) => {
    return path.reduce((prev, curr) => prev + maze[curr[0]][curr[1]].weight, 0)
}

export const generate2DArray = <T>(
    mazeWidth: number,
    mazeHeight: number,
    fillWith: T
) =>
    new Array(mazeHeight).fill(null).map((e) => {
        return new Array(mazeWidth).fill(fillWith)
    }) as T[][]
