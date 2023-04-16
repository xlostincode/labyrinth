type AvailableAlgorithms = "bfs" | "dfs"

type CellData = {
  id: string
  state: "empty" | "visited" | "block" | "start" | "finish" | "path"
}

type Step = [number, number][]
type StepsToAnimate = [number, number][][]

type PathFromStartToFinish = [number, number][]

type AlgorithmFn = (
  maze: CellData[][],
  start: [number, number],
  finish: [number, number]
) => [StepsToAnimate, PathFromStartToFinish]
