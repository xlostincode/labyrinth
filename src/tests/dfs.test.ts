import { describe, it, expect } from "vitest"
import { dfs } from "~/algorithms"
import { generateMaze, getRandomIntInclusive } from "~/utils"

describe.concurrent("Depth first search algorithm", () => {
  it("Should find a path when the maze has no blocks", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)
    const blockChance = 0

    const [maze, start, finish] = generateMaze(width, height, { blockChance })

    const [stepsToAnimate, pathFromStartToFinish] = dfs(maze, start, finish)

    expect(stepsToAnimate.length).toBeGreaterThan(0)
    expect(pathFromStartToFinish.length).toBeGreaterThan(0)
  })

  it("Should not find a path when the maze has only blocks", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)
    const blockChance = 100

    const [maze, start, finish] = generateMaze(width, height, { blockChance })

    const [stepsToAnimate, pathFromStartToFinish] = dfs(maze, start, finish)

    expect(stepsToAnimate.length).toBeGreaterThan(0)
    expect(pathFromStartToFinish.length).toBe(0)
  })
})
