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

const CELL_STATES = [
    "EMPTY",
    "VISITED",
    "BLOCK",
    "START",
    "FINISH",
    "PATH",
] as const

type CellState = (typeof CELL_STATES)[number]

type CellStateMap = {
    [State in CellState]: State
}

export const CELL_STATE_MAP: CellStateMap = {
    EMPTY: "EMPTY",
    VISITED: "VISITED",
    BLOCK: "BLOCK",
    START: "START",
    FINISH: "FINISH",
    PATH: "PATH",
}

export type CellData = {
    id: string
    state: CellState
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
