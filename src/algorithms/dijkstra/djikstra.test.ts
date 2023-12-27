import { describe, it, expect } from "vitest"
import { dijkstra } from "~/algorithms"
import { getRandomIntInclusive } from "~/utils/math"
import { generateMaze } from "~/utils/maze"
import {
    MAZE_WITH_BLOCKED_FINISH,
    MAZE_WITH_UNBLOCKED_FINISH,
    TEST_MAZE_START_AND_FINISH,
} from "~/algorithms/constants"

describe.concurrent("Djisktra's algorithm", () => {
    it("Should find a path when the maze has no blocks", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)
        const blockChance = 0

        const [maze, start, finish] = generateMaze(width, height, {
            blockChance,
        })

        const [stepsToAnimate, pathFromStartToFinish] = dijkstra(
            maze,
            start,
            finish
        )

        expect(stepsToAnimate.length).toBeGreaterThan(0)
        expect(pathFromStartToFinish.length).toBeGreaterThan(0)
    })

    it("Should not find a path when the maze has only blocks", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)
        const blockChance = 100

        const [maze, start, finish] = generateMaze(width, height, {
            blockChance,
        })

        const [stepsToAnimate, pathFromStartToFinish] = dijkstra(
            maze,
            start,
            finish
        )

        expect(stepsToAnimate.length).toBeGreaterThan(0)
        expect(pathFromStartToFinish.length).toBe(0)
    })

    it("Should not find a path when the finish is blocked", () => {
        const [start, finish] = TEST_MAZE_START_AND_FINISH

        const [stepsToAnimate, pathFromStartToFinish] = dijkstra(
            MAZE_WITH_BLOCKED_FINISH,
            start,
            finish
        )

        expect(stepsToAnimate.length).toBeGreaterThan(0)
        expect(pathFromStartToFinish.length).toBe(0)
    })

    it("Should find a path when the finish is not blocked", () => {
        const [start, finish] = TEST_MAZE_START_AND_FINISH

        const [stepsToAnimate, pathFromStartToFinish] = dijkstra(
            MAZE_WITH_UNBLOCKED_FINISH,
            start,
            finish
        )

        expect(stepsToAnimate.length).toBeGreaterThan(0)
        expect(pathFromStartToFinish.length).toBeGreaterThan(0)
    })
})
