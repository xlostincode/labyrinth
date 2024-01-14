import {
    CELL_STATE_MAP,
    CellData,
    MazeGenerationAlgorithmFn,
} from "~/maze/const"
import { nanoid } from "nanoid"
import { getRandomIntInclusive } from "~/utils/math"
import { Logger } from "~/utils/logging"

const ORIENTATION = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal",
} as const

const chooseOrientation = (mazeWidth: number, mazeHeight: number) => {
    if (mazeWidth < mazeHeight) {
        return ORIENTATION.HORIZONTAL
    } else if (mazeWidth > mazeHeight) {
        return ORIENTATION.VERTICAL
    } else {
        return Math.random() > 0.5
            ? ORIENTATION.HORIZONTAL
            : ORIENTATION.VERTICAL
    }
}

const recursivelyDivide = (maze: CellData[][], minRoomSize: number) => {
    const mazeHeight = maze.length - 1
    const mazeWidth = maze[0].length - 1

    const queue = [
        [
            [0, 0],
            [mazeHeight, mazeWidth],
        ],
    ]

    while (queue.length > 0) {
        const queueNode = queue.shift()

        if (!queueNode) {
            Logger.Dev.error(
                "Invalid recursive division maze generation state. queueNode was",
                queueNode
            )
            return
        }

        const [mazeTopLeft, mazeBottomRight] = queueNode

        const [mazeTopLeftRow, mazeTopLeftCol] = mazeTopLeft
        const [mazeBottomRightRow, mazeBottomRightCol] = mazeBottomRight

        const subMazeHeight = mazeBottomRightRow - mazeTopLeftRow
        const subMazeWidth = mazeBottomRightCol - mazeTopLeftCol

        const wallOrientation = chooseOrientation(subMazeWidth, subMazeHeight)

        switch (wallOrientation) {
            case ORIENTATION.VERTICAL:
                if (subMazeWidth <= minRoomSize) {
                    continue
                }

                const verticalWallCol = getRandomIntInclusive(
                    mazeTopLeftCol + minRoomSize,
                    mazeBottomRightCol - minRoomSize
                )

                for (
                    let index = mazeTopLeftRow;
                    index <= mazeBottomRightRow;
                    index++
                ) {
                    maze[index][verticalWallCol].state = CELL_STATE_MAP.BLOCK
                }

                const nextMazeLeft = [
                    [mazeTopLeftRow, mazeTopLeftCol],
                    [mazeBottomRightRow, verticalWallCol - 1],
                ]

                const nextMazeRight = [
                    [mazeTopLeftRow, verticalWallCol + 1],
                    [mazeBottomRightRow, mazeBottomRightCol],
                ]

                queue.push(nextMazeLeft, nextMazeRight)
                break
            case ORIENTATION.HORIZONTAL:
                if (subMazeHeight <= minRoomSize) {
                    continue
                }

                const horizontalWallRow = getRandomIntInclusive(
                    mazeTopLeftRow + minRoomSize,
                    mazeBottomRightRow - minRoomSize
                )

                for (
                    let index = mazeTopLeftCol;
                    index <= mazeBottomRightCol;
                    index++
                ) {
                    maze[horizontalWallRow][index].state = CELL_STATE_MAP.BLOCK
                }

                const nextMazeTop = [
                    [mazeTopLeftRow, mazeTopLeftCol],
                    [horizontalWallRow - 1, mazeBottomRightCol],
                ]

                const nextMazeBottom = [
                    [horizontalWallRow + 1, mazeTopLeftCol],
                    [mazeBottomRightRow, mazeBottomRightCol],
                ]

                queue.push(nextMazeTop, nextMazeBottom)
                break
        }
    }
}

type Options = {
    minRoomSize: number
}

export const generateRecursiveDivisionMaze: MazeGenerationAlgorithmFn<
    Options
> = (mazeWidth: number, mazeHeight: number, options: Options) => {
    if (mazeWidth < 5 || mazeHeight < 5) {
        throw Error(
            `Maze height and width should be greater than 5. Received ${mazeWidth} * ${mazeHeight}`
        )
    }

    const maze = new Array(mazeHeight).fill(null).map(() => {
        return new Array(mazeWidth).fill(null).map(() => {
            const cell: CellData = {
                id: nanoid(16),
                state: CELL_STATE_MAP.EMPTY,
                weight: getRandomIntInclusive(0, 9),
            }

            return cell
        })
    })

    recursivelyDivide(maze, options.minRoomSize)

    let startRowIdx = 0
    let startColIdx = 0

    let finishRowIdx = mazeHeight - 1
    let finishColIdx = mazeWidth - 1

    maze[startRowIdx][startColIdx].state = CELL_STATE_MAP.START
    maze[startRowIdx][startColIdx].weight = 0
    maze[finishRowIdx][finishColIdx].state = CELL_STATE_MAP.FINISH

    return [maze, [startRowIdx, startColIdx], [finishRowIdx, finishColIdx]]
}
