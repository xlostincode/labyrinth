import { describe, it, expect } from "vitest"
import { generateMaze } from "~/utils"

describe.concurrent("Maze generation utility", () => {
  it("Should generate a random maze with given width / height and default start / finish", () => {
    const width = 30
    const height = 20

    const [maze, start, finish] = generateMaze(width, height, 30)

    expect(maze.length).toBe(height)
    expect(maze[0].length).toBe(width)

    expect(start).toEqual([0, 0])
    expect(finish).toEqual([height - 1, width - 1])
  })

  it("Should not have same start and finish", () => {
    const width = 30
    const height = 20

    const [maze, start, finish] = generateMaze(width, height, 30)

    expect(start).not.toEqual(finish)
  })

  it("Should not allow generating a maze smaller than 5 * 5", () => {
    const width = 4
    const height = 4

    expect(() => generateMaze(width, height, 30)).toThrowError()
  })

  it("Should not have any blocks when block chance is 0", () => {
    const width = 20
    const height = 20

    const [maze] = generateMaze(width, height, 0)

    const blockRow = maze.find((row) =>
      row.some((cell) => cell.state === "block")
    )

    expect(blockRow).toBeUndefined()
  })

  it("Should only have blocks when block chance is 100", () => {
    const width = 20
    const height = 20

    const [maze] = generateMaze(width, height, 100)

    const emptyRow = maze.find((row) =>
      row.some((cell) => cell.state === "empty")
    )

    expect(emptyRow).toBeUndefined()
  })
})
