import { Maze, MazeIndex } from "~/maze/const"

const VISUALIZER_STATUSES = ["READY", "RUNNING", "COMPLETED"] as const

export type VisualizerStatus = (typeof VISUALIZER_STATUSES)[number]

type VisualizerStatusMap = {
    [Status in VisualizerStatus]: Status
}

export const VISUALIZER_STATUS_MAP: VisualizerStatusMap = {
    READY: "READY",
    RUNNING: "RUNNING",
    COMPLETED: "COMPLETED",
}

export type Step = MazeIndex[]
export type StepsToAnimate = MazeIndex[][]

export type PathFromStartToFinish = MazeIndex[]

// export type AlgorithmFn = (
//     maze: Maze,
//     start: MazeIndex,
//     finish: MazeIndex
// ) => [StepsToAnimate, PathFromStartToFinish]
