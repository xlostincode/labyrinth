import { generate2DArray, isValidCell } from "~/utils/maze"
import { PathFromStartToFinish, Step, StepsToAnimate } from "~/visualizer/const"
import PriorityQueue from "~/ds/PriorityQueue/PriorityQueue"
import { OFFSETS_SIMPLE, PathFindingAlgorithmFn } from "~/algorithms/const"
import { CELL_STATE_MAP } from "~/maze/const"

export const dijkstra: PathFindingAlgorithmFn = (maze, start, finish) => {
    const mazeWidth = maze[0].length
    const mazeHeight = maze.length

    const distances = generate2DArray(mazeWidth, mazeHeight, Infinity)
    const previousNodes = generate2DArray<[number, number] | null>(
        mazeWidth,
        mazeHeight,
        null
    )

    distances[start[0]][start[1]] = 0

    const queue = new PriorityQueue<[number, number]>()

    queue.enqueue([start[0], start[1]], 0)

    const stepsToAnimate: StepsToAnimate = []

    while (queue.size() > 0) {
        const currentNode = queue.dequeue()

        if (currentNode === null) {
            break
        }

        const [currentRow, currentCol] = currentNode.value

        // Path from start to finish found
        if (currentRow === finish[0] && currentCol === finish[1]) {
            break
        }

        const stepToAnimate: Step = [[currentRow, currentCol]]

        for (const [offsetX, offsetY] of OFFSETS_SIMPLE) {
            const nextRow = currentRow + offsetX
            const nextCol = currentCol + offsetY

            if (
                isValidCell(mazeWidth, mazeHeight, nextRow, nextCol) &&
                maze[nextRow][nextCol].state !== CELL_STATE_MAP.BLOCK
            ) {
                const distanceToNextNode =
                    distances[currentRow][currentCol] +
                    maze[nextRow][nextCol].weight

                if (distanceToNextNode < distances[nextRow][nextCol]) {
                    distances[nextRow][nextCol] = distanceToNextNode
                    previousNodes[nextRow][nextCol] = [currentRow, currentCol]

                    queue.enqueue(
                        [nextRow, nextCol],
                        distances[nextRow][nextCol]
                    )

                    stepToAnimate.push([nextRow, nextCol])
                }
            }
        }

        stepsToAnimate.push(stepToAnimate)
    }
    const path = getPath(previousNodes, start, finish)

    return [stepsToAnimate, path]
}

const getPath = (
    previousNodes: ([number, number] | null)[][],
    start: [number, number],
    finish: [number, number]
) => {
    const path = []

    /**
     * If finish does not have a previous cell reference it means
     * there is no path from start to finish. We can safely return empty array here.
     */
    let cell = previousNodes[finish[0]][finish[1]]
    if (cell === null) {
        return []
    }

    let [currentRow, currentCol] = cell

    while (currentRow !== start[0] || currentCol !== start[1]) {
        path.push([currentRow, currentCol])

        const next = previousNodes[currentRow][currentCol]

        if (next === null) {
            /**
             * This condition should never occur. Its only here to make Typescript happy.
             * This loop only runs when finish is not null and that means there is a path from start to finish.
             * It means we can safely assume that each cell will have a reference to the previous cell.
             */
            throw new Error(
                "Bad Dijkstra state. Something is wrong with the universe."
            )
        }

        currentRow = next[0]
        currentCol = next[1]
    }

    return path.reverse() as PathFromStartToFinish
}
