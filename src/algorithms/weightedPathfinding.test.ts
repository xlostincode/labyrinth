import { describe, expect, it } from "vitest"
import { astar, dijkstra } from "~/algorithms"
import { CELL_STATE_MAP, CellData, Maze, MazeIndex } from "~/maze/const"
import { getPathCost } from "~/utils/maze"
import { PathFromStartToFinish } from "~/visualizer/const"

const createCell = (
    id: string,
    state: CellData["state"] = CELL_STATE_MAP.EMPTY,
    weight = 0
): CellData => ({ id, state, weight })

const expectValidPath = (
    maze: Maze,
    path: PathFromStartToFinish,
    start: MazeIndex,
    finish: MazeIndex
) => {
    expect(path[0]).toEqual(start)
    expect(path[path.length - 1]).toEqual(finish)

    for (let index = 0; index < path.length; index++) {
        const [row, col] = path[index]

        expect(maze[row][col].state).not.toBe(CELL_STATE_MAP.BLOCK)

        if (index > 0) {
            const [previousRow, previousCol] = path[index - 1]
            const distanceFromPrevious =
                Math.abs(row - previousRow) + Math.abs(col - previousCol)

            expect(distanceFromPrevious).toBe(1)
        }
    }
}

describe("Weighted pathfinding optimality", () => {
    it("Should choose a longer zero-weight route when it has a lower total cost", () => {
        const maze: Maze = [
            [
                createCell("start", CELL_STATE_MAP.START),
                createCell("expensive-1", CELL_STATE_MAP.EMPTY, 9),
                createCell("expensive-2", CELL_STATE_MAP.EMPTY, 9),
                createCell("finish", CELL_STATE_MAP.FINISH),
            ],
            [
                createCell("detour-1"),
                createCell("detour-2"),
                createCell("detour-3"),
                createCell("detour-4"),
            ],
        ]
        const start: MazeIndex = [0, 0]
        const finish: MazeIndex = [0, 3]

        const [, dijkstraPath] = dijkstra(maze, start, finish)
        const [, astarPath] = astar(maze, start, finish)

        expectValidPath(maze, dijkstraPath, start, finish)
        expectValidPath(maze, astarPath, start, finish)
        expect(getPathCost(maze, dijkstraPath)).toBe(5)
        expect(getPathCost(maze, astarPath)).toBe(5)
    })

    it.each([
        ["Dijkstra", dijkstra],
        ["A*", astar],
    ] as const)(
        "Should return an optimal valid path around a block with %s",
        (_, algorithm) => {
            const maze: Maze = [
                [
                    createCell("start", CELL_STATE_MAP.START),
                    createCell("block", CELL_STATE_MAP.BLOCK),
                    createCell("finish", CELL_STATE_MAP.FINISH),
                ],
                [createCell("1-0"), createCell("1-1"), createCell("1-2")],
            ]
            const start: MazeIndex = [0, 0]
            const finish: MazeIndex = [0, 2]

            const [, path] = algorithm(maze, start, finish)

            expectValidPath(maze, path, start, finish)
            expect(getPathCost(maze, path)).toBe(4)
        }
    )
})
