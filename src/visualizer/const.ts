export type AlgorithmStatus = "ready" | "running" | "completed"
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

export type CellData = {
    id: string
    state: "empty" | "visited" | "block" | "start" | "finish" | "path"
    weight: number
}

export type Step = [number, number][]
export type StepsToAnimate = [number, number][][]

export type PathFromStartToFinish = [number, number][]

export type AlgorithmFn = (
    maze: CellData[][],
    start: [number, number],
    finish: [number, number]
) => [StepsToAnimate, PathFromStartToFinish]
