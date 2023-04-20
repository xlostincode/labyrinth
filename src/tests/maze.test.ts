import { describe, it, expect } from "vitest"
import { generateMaze, getRandomIntInclusive, isValidCell } from "~/utils"

describe.concurrent("Maze related utilities", () => {
  it("Should generate a random maze with given width / height and default start / finish", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const [maze, start, finish] = generateMaze(width, height, 30)

    expect(maze.length).toBe(height)
    expect(maze[0].length).toBe(width)

    expect(start).toEqual([0, 0])
    expect(finish).toEqual([height - 1, width - 1])
  })

  it("Should not have same start and finish", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const [_, start, finish] = generateMaze(width, height, 30, false, false)

    expect(start).not.toEqual(finish)
  })

  it("Should not allow generating a maze smaller than 5 * 5", () => {
    const width = 4
    const height = 4

    expect(() => generateMaze(width, height)).toThrowError()
  })

  it("Should not have any blocks when block chance is 0", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const [maze] = generateMaze(width, height, 0)

    const blockRow = maze.find((row) =>
      row.some((cell) => cell.state === "block")
    )

    expect(blockRow).toBeUndefined()
  })

  it("Should only have blocks when block chance is 100", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const [maze] = generateMaze(width, height, 100)

    const emptyRow = maze.find((row) =>
      row.some((cell) => cell.state === "empty")
    )

    expect(emptyRow).toBeUndefined()
  })

  it("Should be a valid cell when random index is within the size", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const row = getRandomIntInclusive(0, height - 1)
    const col = getRandomIntInclusive(0, width - 1)

    const isValid = isValidCell(width, height, row, col)

    const message = `height: ${height}, width: ${width} | row: ${row}, col: ${col}`

    expect(isValid, message).toBeTruthy()
  })

  it("Should not be a valid cell when random index is outside the size", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const row = getRandomIntInclusive(height, height * 2)
    const col = getRandomIntInclusive(width, width * 2)

    const isValid = isValidCell(width, height, row, col)

    const message = `height: ${height}, width: ${width} | row: ${row}, col: ${col}`

    expect(isValid, message).toBeFalsy()
  })

  it("Should be a valid cell when index is same as the size", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const row = height - 1
    const col = width - 1

    const isValid = isValidCell(width, height, height - 1, width - 1)

    const message = `height: ${height}, width: ${width} | row: ${row}, col: ${col}`

    expect(isValid, message).toBeTruthy()
  })

  it("Should not be a valid cell when row index is outside the size", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const row = getRandomIntInclusive(height, height * 2)
    const col = width - 1

    const isValid = isValidCell(width, height, row, col)

    const message = `height: ${height}, width: ${width} | row: ${row}, col: ${col}`

    expect(isValid, message).toBeFalsy()
  })

  it("Should not be a valid cell when col index is outside the size", () => {
    const width = getRandomIntInclusive(5, 100)
    const height = getRandomIntInclusive(5, 100)

    const row = height - 1
    const col = getRandomIntInclusive(width, width * 2)

    const isValid = isValidCell(width, height, row, col)

    const message = `height: ${height}, width: ${width} | row: ${row}, col: ${col}`

    expect(isValid, message).toBeFalsy()
  })
})
