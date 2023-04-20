import { nanoid } from "nanoid"
import type { CellData } from "~/types/visualizer"
import { availableAlgorithms } from "~/types/visualizer"

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type GenerateMazeOptions = {
  blockChance?: number
  defaultStart?: boolean
  defaultFinish?: boolean
  isWeighted?: boolean
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
        weight: null,
      }

      const shouldBlock = getRandomIntInclusive(1, 100)

      if (shouldBlock <= _options.blockChance) {
        cell.state = "block"
      }

      if (_options.isWeighted) {
        cell.weight = getRandomIntInclusive(0, 9)
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
  maze[finishRowIdx][finishColIdx].state = "finish"

  if (_options.isWeighted) {
    maze[startRowIdx][startColIdx].weight = null
    maze[finishRowIdx][finishColIdx].weight = null
  }

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

export function isValidAlgorithm(searchAlgorithm: string) {
  // TODO: Use ts-reset to fix `includes` typing
  // @ts-ignore
  return availableAlgorithms.includes(searchAlgorithm)
}

export function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
