export const availableAlgorithms = ["bfs", "dfs"] as const

export type Algorithm = typeof availableAlgorithms[number]

export type CellData = {
  id: string
  state: "empty" | "visited" | "block" | "start" | "finish" | "path"
}

export type Step = [number, number][]
export type StepsToAnimate = [number, number][][]

export type PathFromStartToFinish = [number, number][]

export type AlgorithmFn = (
  maze: CellData[][],
  start: [number, number],
  finish: [number, number]
) => [StepsToAnimate, PathFromStartToFinish]
