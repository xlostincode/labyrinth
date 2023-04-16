import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { generateMaze } from "~/utils"

interface VisualizerState {
  mazeWidth: number
  mazeHeight: number
  maze: CellData[][]
  start: [number, number]
  finish: [number, number]
  blockChance: number
  isRunning: boolean
  stepAnimationDelay: number
  setCellState: (
    rowIdx: number,
    colIdx: number,
    newState: CellData["state"]
  ) => void
  setIsRunning: (running: boolean) => void
  setStepAnimationDelay: (delay: number) => void
}

const [randomMaze, start, finish] = generateMaze(30, 30, 25)

const useVisualizerStore = create<VisualizerState, [["zustand/immer", never]]>(
  immer((set) => ({
    mazeWidth: 30,
    mazeHeight: 30,
    blockChance: 25,
    maze: randomMaze,
    start: start,
    finish: finish,
    isRunning: false,
    stepAnimationDelay: 0,

    setCellState(rowIdx, colIdx, newState) {
      set((state) => {
        const cell = state.maze[rowIdx][colIdx]

        if (cell.state === "start" || cell.state === "finish") return

        state.maze[rowIdx][colIdx].state = newState
      })
    },

    setIsRunning(running) {
      set((state) => {
        state.isRunning = running
      })
    },

    setStepAnimationDelay(delay) {
      set((state) => {
        state.stepAnimationDelay = delay
      })
    },
  }))
)

export default useVisualizerStore
