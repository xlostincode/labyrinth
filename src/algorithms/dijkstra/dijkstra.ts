import { generateVisitedMaze, isValidCell } from "~/utils"
import type {
    AlgorithmFn,
    CellData,
    PathFromStartToFinish,
    Step,
    StepsToAnimate,
} from "~/types/visualizer"
import PriorityQueue from "~/ds/PriorityQueue"
import { OFFSETS_SIMPLE } from "~/algorithms/constants"

// TODO: Early exit
// TODO: Cleanup / Refactor / Improve typing
export const dijkstra: AlgorithmFn = (
    maze: CellData[][],
    start: [number, number],
    finish: [number, number]
) => {
    const mazeWidth = maze[0].length
    const mazeHeight = maze.length

    const visitedMaze = generateVisitedMaze(mazeWidth, mazeHeight)
    const distances = new Array(mazeHeight).fill(null).map((e) => {
        return new Array(mazeWidth).fill(Infinity)
    }) as number[][]

    const previousNodes = new Array(mazeHeight)
        .fill(null)
        .map((e) => new Array(mazeWidth).fill(null)) as (
        | [number, number]
        | null
    )[][]

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

        visitedMaze[currentRow][currentCol] = true

        const stepToAnimate: Step = [[currentRow, currentCol]]

        for (const [offsetX, offsetY] of OFFSETS_SIMPLE) {
            const nextRow = currentRow + offsetX
            const nextCol = currentCol + offsetY

            if (
                isValidCell(mazeWidth, mazeHeight, nextRow, nextCol) &&
                maze[nextRow][nextCol].state !== "block"
            ) {
                const distance =
                    distances[currentRow][currentCol] +
                    maze[nextRow][nextCol].weight

                if (distance < distances[nextRow][nextCol]) {
                    distances[nextRow][nextCol] = distance
                    previousNodes[nextRow][nextCol] = [currentRow, currentCol]
                }

                if (!visitedMaze[nextRow][nextCol]) {
                    queue.enqueue(
                        [nextRow, nextCol],
                        maze[nextRow][nextCol].weight
                    )

                    visitedMaze[nextRow][nextCol] = true

                    stepToAnimate.push([nextRow, nextCol])
                }
            }
        }

        stepsToAnimate.push(stepToAnimate)
    }

    const path = getPath(previousNodes, start, finish)

    return [stepsToAnimate, path]
}

const getPathCost = (maze: CellData[][], path: PathFromStartToFinish) => {
    return path.reduce((prev, curr) => prev + maze[curr[0]][curr[1]].weight, 0)
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
