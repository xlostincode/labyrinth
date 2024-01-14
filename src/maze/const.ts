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
