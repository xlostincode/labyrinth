import { nanoid } from "nanoid"
import type { CellData } from "~/types/visualizer"
import { getRandomIntInclusive } from "~/utils/math"

type Options = {
    blockChance?: number
    defaultStart?: boolean
    defaultFinish?: boolean
}

export function generateRandomMaze(
    mazeWidth: number,
    mazeHeight: number,
    options?: Options
): [CellData[][], [number, number], [number, number]] {
    if (mazeWidth < 5 || mazeHeight < 5) {
        throw Error(
            `Maze height and width should be greater than 5. Received ${mazeWidth} * ${mazeHeight}`
        )
    }

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
