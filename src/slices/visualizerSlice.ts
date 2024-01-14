import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { AlgorithmStatus, CellData, Step } from "~/types/visualizer"
import {
    MAZE_GENERATION_ALGORITHM_MAP,
    MazeGenerationAlgorithmId,
} from "~/maze/const"
import { generateRandomMaze, generateRecursiveDivisionMaze } from "~/maze"
import {
    PATH_FINDING_ALGORITHM_MAP,
    PathFindingAlgorithmId,
} from "~/algorithms/const"

interface VisualizerState {
    mazeWidth: number
    mazeHeight: number
    maze: CellData[][]
    start: [number, number]
    finish: [number, number]

    algorithmStatus: AlgorithmStatus
    isReady: boolean
    isRunning: boolean
    isCompleted: boolean
    stepAnimationDelay: number
    selectedPathFindingAlgorithm: PathFindingAlgorithmId
    showCellWeights: boolean
    isPickingStart: boolean
    isPickingFinish: boolean

    selectedMazeGenerationAlgorithm: MazeGenerationAlgorithmId
    // TODO: There may be a better way to represent this
    mazeGenerationOptions: {
        // random
        blockChance: number
        defaultStart: boolean
        defaultFinish: boolean
        // recursiveDivision
        roomSize: number
    }
}

const [initialMaze, initialStart, initialFinish] = generateRandomMaze(30, 30, {
    blockChance: 30,
    defaultFinish: false,
    defaultStart: false,
})

const initialState: VisualizerState = {
    mazeWidth: 30,
    mazeHeight: 30,
    maze: initialMaze,
    start: initialStart,
    finish: initialFinish,

    algorithmStatus: "ready",
    isReady: true,
    isRunning: false,
    isCompleted: false,
    stepAnimationDelay: 0,
    selectedPathFindingAlgorithm: PATH_FINDING_ALGORITHM_MAP.BFS.id,
    showCellWeights: false,
    isPickingStart: false,
    isPickingFinish: false,

    selectedMazeGenerationAlgorithm: MAZE_GENERATION_ALGORITHM_MAP.RANDOM.id,
    mazeGenerationOptions: {
        blockChance: 25,
        defaultStart: false,
        defaultFinish: false,
        roomSize: 3,
    },
}

export const visualizerSlice = createSlice({
    name: "visualizer",
    initialState,
    reducers: {
        setSelectedPathFindingAlgorithm(
            state,
            action: PayloadAction<
                VisualizerState["selectedPathFindingAlgorithm"]
            >
        ) {
            state.selectedPathFindingAlgorithm = action.payload
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
            state.maze[rowIdx][colIdx].weight = 0

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
            state.maze[rowIdx][colIdx].weight = 0

            state.finish = [rowIdx, colIdx]
            state.isPickingFinish = false
        },
        setShowCellWeights(
            state,
            action: PayloadAction<VisualizerState["showCellWeights"]>
        ) {
            state.showCellWeights = action.payload
        },
        increaseOrDecreaseCellWeight(
            state,
            action: PayloadAction<{
                rowIdx: number
                colIdx: number
                operation: "increase" | "decrease"
            }>
        ) {
            const { rowIdx, colIdx, operation } = action.payload

            if (state.maze[rowIdx][colIdx].state === "start") return
            if (state.maze[rowIdx][colIdx].state === "finish") return
            if (state.maze[rowIdx][colIdx].state === "block") return

            const currentCellWeight = state.maze[rowIdx][colIdx].weight

            if (operation === "increase") {
                state.maze[rowIdx][colIdx].weight = Math.min(
                    currentCellWeight + 1,
                    9
                )
            } else if (operation === "decrease") {
                state.maze[rowIdx][colIdx].weight = Math.max(
                    currentCellWeight - 1,
                    0
                )
            }
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
        setMazeHeight(
            state,
            action: PayloadAction<VisualizerState["mazeHeight"]>
        ) {
            state.mazeHeight = action.payload
        },
        setMazeWidth(
            state,
            action: PayloadAction<VisualizerState["mazeWidth"]>
        ) {
            state.mazeWidth = action.payload
        },
        generateMaze(state) {
            // TODO: Refactor
            // TODO: Improve and centralize types
            let maze: CellData[][] | undefined
            let start: [number, number] | undefined
            let finish: [number, number] | undefined

            switch (state.selectedMazeGenerationAlgorithm) {
                case MAZE_GENERATION_ALGORITHM_MAP.RANDOM.id:
                    const randomMazeOutput = generateRandomMaze(
                        state.mazeWidth,
                        state.mazeHeight,
                        {
                            blockChance:
                                state.mazeGenerationOptions.blockChance,
                            defaultStart:
                                state.mazeGenerationOptions.defaultStart,
                            defaultFinish:
                                state.mazeGenerationOptions.defaultFinish,
                        }
                    )

                    maze = randomMazeOutput[0]
                    start = randomMazeOutput[1]
                    finish = randomMazeOutput[2]
                    break
                case MAZE_GENERATION_ALGORITHM_MAP.RECURSIVE_DIVISION.id:
                    const recursiveDivisionMazeOutput =
                        generateRecursiveDivisionMaze(
                            state.mazeWidth,
                            state.mazeHeight,
                            {
                                minRoomSize:
                                    state.mazeGenerationOptions.roomSize,
                            }
                        )

                    maze = recursiveDivisionMazeOutput[0]
                    start = recursiveDivisionMazeOutput[1]
                    finish = recursiveDivisionMazeOutput[2]
                    break
            }

            state.maze = maze
            state.start = start
            state.finish = finish
        },
        setSelectedMazeGenerationAlgorithm(
            state,
            action: PayloadAction<
                VisualizerState["selectedMazeGenerationAlgorithm"]
            >
        ) {
            state.selectedMazeGenerationAlgorithm = action.payload
        },
        setMazeGenerationOptions(
            state,
            action: PayloadAction<
                Partial<VisualizerState["mazeGenerationOptions"]>
            >
        ) {
            state.mazeGenerationOptions = {
                ...state.mazeGenerationOptions,
                ...action.payload,
            }
        },
    },
})

export const {
    setCellState,
    setSelectedPathFindingAlgorithm,
    setAlgorithmStatus,
    setStepAnimationDelay,
    setIsPickingStart,
    setStart,
    setIsPickingFinish,
    setFinish,
    setShowCellWeights,
    performReset,
    renderVisitedSteps,
    increaseOrDecreaseCellWeight,
    setMazeWidth,
    setMazeHeight,
    generateMaze,
    setSelectedMazeGenerationAlgorithm,
    setMazeGenerationOptions,
} = visualizerSlice.actions

export default visualizerSlice.reducer
