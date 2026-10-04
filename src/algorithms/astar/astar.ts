import { generate2DArray, isValidCell } from "~/utils/maze"
import { PathFromStartToFinish, Step, StepsToAnimate } from "~/visualizer/const"
import PriorityQueue from "~/ds/PriorityQueue/PriorityQueue"
import { OFFSETS_SIMPLE, PathFindingAlgorithmFn } from "~/algorithms/const"
import { CELL_STATE_MAP } from "~/maze/const"

// Manhattan distance heuristic
const heuristic = (node: [number, number], goal: [number, number]) => {
    return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1])
}

export const astar: PathFindingAlgorithmFn = (maze, start, finish) => {
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
    queue.enqueue([start[0], start[1]], heuristic(start, finish))

    const stepsToAnimate: StepsToAnimate = []

    while (queue.size() > 0) {
        const currentNode = queue.dequeue()
        if (currentNode === null) {
            break
        }

        const [currentRow, currentCol] = currentNode.value

        const currentFCost =
            distances[currentRow][currentCol] +
            heuristic([currentRow, currentCol], finish)

        // A better route may have re-enqueued this node at a lower priority.
        if (currentNode.priority > currentFCost) {
            continue
        }

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
                // A base cost of 1 keeps the Manhattan heuristic admissible.
                const gCost =
                    distances[currentRow][currentCol] +
                    1 +
                    maze[nextRow][nextCol].weight
                const hCost = heuristic([nextRow, nextCol], finish)
                const fCost = gCost + hCost

                if (gCost < distances[nextRow][nextCol]) {
                    distances[nextRow][nextCol] = gCost
                    previousNodes[nextRow][nextCol] = [currentRow, currentCol]
                    queue.enqueue([nextRow, nextCol], fCost)

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
    let cell = previousNodes[finish[0]][finish[1]]
    if (cell === null) {
        return []
    }

    const path = [finish]
    let [currentRow, currentCol] = cell

    while (currentRow !== start[0] || currentCol !== start[1]) {
        path.push([currentRow, currentCol])
        const next = previousNodes[currentRow][currentCol]

        if (next === null) {
            throw new Error(
                "Bad A* state. Something is wrong with the universe."
            )
        }

        currentRow = next[0]
        currentCol = next[1]
    }

    path.push(start)

    return path.reverse() as PathFromStartToFinish
}
