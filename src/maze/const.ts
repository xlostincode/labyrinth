// Cell
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

// Maze
export type Maze = CellData[][]
export type MazeIndex = [number, number]

const MAZE_GENERATION_ALGORITHM_IDS = ["RANDOM", "RECURSIVE_DIVISION"] as const

export type MazeGenerationAlgorithmId =
    (typeof MAZE_GENERATION_ALGORITHM_IDS)[number]

export type MazeGenerationAlgorithm<Id extends MazeGenerationAlgorithmId> = {
    id: Id
    name: string
}

type MazeGenerationAlgorithmMap = {
    [AlgorithmId in MazeGenerationAlgorithmId]: MazeGenerationAlgorithm<AlgorithmId>
}

export const MAZE_GENERATION_ALGORITHM_MAP: MazeGenerationAlgorithmMap = {
    RANDOM: {
        id: "RANDOM",
        name: "Random",
    },
    RECURSIVE_DIVISION: {
        id: "RECURSIVE_DIVISION",
        name: "Recursive Division",
    },
}

export const MAZE_GENERATION_ALGORITHM_LIST = Object.values(
    MAZE_GENERATION_ALGORITHM_MAP
)

export type MazeGenerationAlgorithmFn<Options> = (
    mazeWidth: number,
    mazeHeight: number,
    options: Options
) => [Maze, MazeIndex, MazeIndex]
