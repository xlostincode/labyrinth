import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { generateMaze } from "~/utils"
import type { Algorithm, AlgorithmStatus, CellData } from "~/types/visualizer"

interface VisualizerState {
  mazeWidth: number
  mazeHeight: number
  maze: CellData[][]
  start: [number, number]
  finish: [number, number]
  blockChance: number

  algorithmStatus: AlgorithmStatus
  isReady: boolean
  isRunning: boolean
  isCompleted: boolean
  stepAnimationDelay: number
  selectedAlgorithm: Algorithm
  isWeighted: boolean

  setSelectedAlgorithm: (algorithm: Algorithm) => void
  setCellState: (
    rowIdx: number,
    colIdx: number,
    newState: CellData["state"]
  ) => void
  setAlgorithmStatus: (status: AlgorithmStatus) => void
  setStepAnimationDelay: (delay: number) => void
}

const [randomMaze, start, finish] = generateMaze(30, 30, { isWeighted: true })

const useVisualizerStore = create<VisualizerState, [["zustand/immer", never]]>(
  immer((set) => ({
    mazeWidth: 30,
    mazeHeight: 30,
    blockChance: 25,
    maze: randomMaze,
    start: start,
    finish: finish,

    algorithmStatus: "ready",
    isReady: true,
    isRunning: false,
    isCompleted: false,
    stepAnimationDelay: 0,
    selectedAlgorithm: "bfs",
    isWeighted: true,

    setSelectedAlgorithm(algorithm: Algorithm) {
      set((state) => {
        state.selectedAlgorithm = algorithm
      })
    },

    setCellState(rowIdx, colIdx, newState) {
      set((state) => {
        const cell = state.maze[rowIdx][colIdx]

        if (cell.state === "start" || cell.state === "finish") return

        state.maze[rowIdx][colIdx].state = newState
      })
    },

    setAlgorithmStatus(status) {
      set((state) => {
        state.algorithmStatus = status

        state.isReady = status === "ready"
        state.isRunning = status === "running"
        state.isCompleted = status === "completed"
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
