import { generateVisitedMaze, isValidCell, OFFSETS_SIMPLE } from "~/utils"
import type {
  AlgorithmFn,
  CellData,
  Step,
  StepsToAnimate,
} from "~/types/visualizer"

export const dfs: AlgorithmFn = (
  maze: CellData[][],
  start: [number, number],
  finish: [number, number]
) => {
  const mazeWidth = maze[0].length
  const mazeHeight = maze.length

  const visitedMaze = generateVisitedMaze(mazeWidth, mazeHeight)

  const queue: [number, number, [number, number][]][] = []

  queue.push([start[0], start[1], [[start[0], start[1]]]])

  const stepsToAnimate: StepsToAnimate = []

  while (queue.length > 0) {
    const element = queue.pop()

    if (!element) {
      throw new Error("Bad DFS state. Something is wrong with the universe.")
    }

    const [currentRow, currentCol, pathSoFar] = element

    visitedMaze[currentRow][currentCol] = true

    // Path from start to finish found
    if (currentRow === finish[0] && currentCol === finish[1]) {
      return [stepsToAnimate, pathSoFar]
    }

    const stepToAnimate: Step = [[currentRow, currentCol]]

    for (const [offsetX, offsetY] of OFFSETS_SIMPLE) {
      const nextRow = currentRow + offsetX
      const nextCol = currentCol + offsetY

      if (
        isValidCell(mazeWidth, mazeHeight, nextRow, nextCol) &&
        !visitedMaze[nextRow][nextCol] &&
        maze[nextRow][nextCol].state !== "block"
      ) {
        queue.push([nextRow, nextCol, [...pathSoFar, [nextRow, nextCol]]])
        stepToAnimate.push([nextRow, nextCol])

        visitedMaze[nextRow][nextCol] = true
      }
    }

    stepsToAnimate.push(stepToAnimate)
  }

  return [stepsToAnimate, []]
}
