import { nanoid } from "nanoid"
import type { CellData, PathFromStartToFinish } from "~/types/visualizer"
import { getRandomIntInclusive } from "~/utils/math"

type GenerateMazeOptions = {
    blockChance?: number
    defaultStart?: boolean
    defaultFinish?: boolean
}

export function generateMaze(
    mazeWidth: number,
    mazeHeight: number,
    options?: GenerateMazeOptions
): [CellData[][], [number, number], [number, number]] {
    if (mazeWidth < 5 || mazeHeight < 5) {
        throw Error(
            `Maze height and width should be greater than 5. Received ${mazeWidth} * ${mazeHeight}`
        )
    }

    // TODO: Does this need to be typed?
    const _options = {
        blockChance: 25,
        defaultFinish: true,
        defaultStart: true,
        isWeighted: false,
        ...options,
    }

    const maze = new Array(mazeHeight).fill(null).map((e) => {
        return new Array(mazeWidth).fill(null).map((e1) => {
            const cell: CellData = {
                id: nanoid(16),
                state: "empty",
                weight: getRandomIntInclusive(0, 9),
            }

            const shouldBlock = getRandomIntInclusive(1, 100)

            if (shouldBlock <= _options.blockChance) {
                cell.state = "block"
            }

            return cell
        })
    })

    let startRowIdx = _options.defaultStart
        ? 0
        : getRandomIntInclusive(0, mazeHeight - 1)
    let startColIdx = _options.defaultStart
        ? 0
        : getRandomIntInclusive(0, mazeWidth - 1)

    let finishRowIdx = _options.defaultFinish
        ? mazeHeight - 1
        : getRandomIntInclusive(0, mazeHeight - 1)
    let finishColIdx = _options.defaultFinish
        ? mazeWidth - 1
        : getRandomIntInclusive(0, mazeWidth - 1)

    // In case start and finish are same change the start
    while (startRowIdx === finishRowIdx && startColIdx === finishRowIdx) {
        startRowIdx = _options.defaultStart
            ? 0
            : getRandomIntInclusive(0, mazeHeight - 1)
        startColIdx = _options.defaultStart
            ? 0
            : getRandomIntInclusive(0, mazeWidth - 1)
    }

    maze[startRowIdx][startColIdx].state = "start"
    maze[startRowIdx][startColIdx].weight = 0
    maze[finishRowIdx][finishColIdx].state = "finish"

    return [maze, [startRowIdx, startColIdx], [finishRowIdx, finishColIdx]]
}

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

export const getPathCost = (
    maze: CellData[][],
    path: PathFromStartToFinish
) => {
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
