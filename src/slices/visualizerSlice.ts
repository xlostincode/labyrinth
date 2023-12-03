import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type {
    Algorithm,
    AlgorithmStatus,
    CellData,
    Step,
} from "~/types/visualizer"
import { generateMaze } from "~/utils"

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
    showCellWeights: boolean
    isPickingStart: boolean
    isPickingFinish: boolean
}

const [randomMaze, start, finish] = generateMaze(30, 30, {
    blockChance: 30,
    defaultFinish: false,
    defaultStart: false,
})

const initialState: VisualizerState = {
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
    selectedAlgorithm: "dijkstra",
    showCellWeights: false,
    isPickingStart: false,
    isPickingFinish: false,
}

export const visualizerSlice = createSlice({
    name: "visualizer",
    initialState,
    reducers: {
        setSelectedAlgorithm(state, action: PayloadAction<Algorithm>) {
            state.selectedAlgorithm = action.payload
        },
        setCellState(
            state,
            action: PayloadAction<{
                rowIdx: number
                colIdx: number
                newState: CellData["state"]
            }>
        ) {
            const { rowIdx, colIdx, newState } = action.payload

            const cell = state.maze[rowIdx][colIdx]

            if (cell.state === "start" || cell.state === "finish") return

            state.maze[rowIdx][colIdx].state = newState
        },
        setAlgorithmStatus(state, action: PayloadAction<AlgorithmStatus>) {
            state.algorithmStatus = action.payload

            state.isReady = action.payload === "ready"
            state.isRunning = action.payload === "running"
            state.isCompleted = action.payload === "completed"
        },
        setStepAnimationDelay(state, action: PayloadAction<number>) {
            state.stepAnimationDelay = action.payload
        },
        setIsPickingStart(state, action: PayloadAction<boolean>) {
            state.isPickingStart = action.payload
            if (action.payload) state.isPickingFinish = false
        },
        setStart(
            state,
            action: PayloadAction<{
                rowIdx: number
                colIdx: number
            }>
        ) {
            const { rowIdx, colIdx } = action.payload

            if (rowIdx === state.start[0] && colIdx === state.start[1]) return

            const [currentStartRow, currentStartCol] = state.start

            state.maze[currentStartRow][currentStartCol].state = "empty"
            state.maze[rowIdx][colIdx].state = "start"

            state.start = [rowIdx, colIdx]
            state.isPickingStart = false
        },
        setIsPickingFinish(state, action: PayloadAction<boolean>) {
            state.isPickingFinish = action.payload
            if (action.payload) state.isPickingStart = false
        },
        setFinish(
            state,
            action: PayloadAction<{
                rowIdx: number
                colIdx: number
            }>
        ) {
            const { rowIdx, colIdx } = action.payload

            if (rowIdx === state.finish[0] && colIdx === state.finish[1]) return

            const [currentFinishRow, currentFinishCol] = state.finish

            state.maze[currentFinishRow][currentFinishCol].state = "empty"
            state.maze[rowIdx][colIdx].state = "finish"

            state.finish = [rowIdx, colIdx]
            state.isPickingFinish = false
        },
        setShowCellWeights(
            state,
            action: PayloadAction<VisualizerState["showCellWeights"]>
        ) {
            state.showCellWeights = action.payload
        },
        performReset(state, action: PayloadAction<void>) {
            for (let i = 0; i < state.maze.length; i++) {
                for (let j = 0; j < state.maze[i].length; j++) {
                    if (
                        state.maze[i][j].state === "visited" ||
                        state.maze[i][j].state === "path"
                    ) {
                        state.maze[i][j].state = "empty"
                    }
                }
            }
        },
        renderVisitedSteps(state, action: PayloadAction<Step>) {
            const steps = action.payload

            for (let i = 0; i < steps.length; i++) {
                const [row, col] = steps[i]

                if (
                    state.maze[row][col].state === "start" ||
                    state.maze[row][col].state === "finish"
                ) {
                    return
                }

                state.maze[row][col].state = "visited"
            }
        },
    },
})

export const {
    setCellState,
    setSelectedAlgorithm,
    setAlgorithmStatus,
    setStepAnimationDelay,
    setIsPickingStart,
    setStart,
    setIsPickingFinish,
    setFinish,
    setShowCellWeights,
    performReset,
    renderVisitedSteps,
} = visualizerSlice.actions

export default visualizerSlice.reducer
