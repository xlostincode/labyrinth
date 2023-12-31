import { AVAILABLE_ALGORITHMS } from "~/algorithms/constants"

export type Algorithm = (typeof AVAILABLE_ALGORITHMS)[number]

export type AlgorithmStatus = "ready" | "running" | "completed"

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
