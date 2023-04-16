import { describe, it, expect } from "vitest"
import { bfs } from "~/algorithms"
import { generateMaze } from "~/utils"

describe.concurrent("Breadth first search algorithm", () => {
  it("Should find a path when the maze has no blocks", () => {
    const width = 30
    const height = 30
    const blockChance = 0

    const [maze, start, finish] = generateMaze(width, height, blockChance)

    const [stepsToAnimate, pathFromStartToFinish] = bfs(maze, start, finish)

    expect(stepsToAnimate.length).toBeGreaterThan(0)
    expect(pathFromStartToFinish.length).toBeGreaterThan(0)
  })

  it("Should not find a path when the maze has only blocks", () => {
    const width = 30
    const height = 30
    const blockChance = 100

    const [maze, start, finish] = generateMaze(width, height, blockChance)

    const [stepsToAnimate, pathFromStartToFinish] = bfs(maze, start, finish)

    expect(stepsToAnimate.length).toBeGreaterThan(0)
    expect(pathFromStartToFinish.length).toBe(0)
  })
})
