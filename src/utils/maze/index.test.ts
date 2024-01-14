import { describe, it, expect } from "vitest"
import { getRandomIntInclusive } from "~/utils/math"
import { isValidCell } from "~/utils/maze"
import { generateRandomMaze } from "~/maze/random"
import { CELL_STATE_MAP } from "~/maze/const"

describe.concurrent("Maze related utilities", () => {
    it("Should generate a random maze with given width / height and default start / finish", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)

        const [maze, start, finish] = generateRandomMaze(width, height, {
            blockChance: 25,
            defaultFinish: true,
            defaultStart: true,
        })

        expect(maze.length).toBe(height)
        expect(maze[0].length).toBe(width)

        expect(start).toEqual([0, 0])
        expect(finish).toEqual([height - 1, width - 1])
    })

    it("Should not have same start and finish", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)

        const [_, start, finish] = generateRandomMaze(width, height, {
            defaultFinish: false,
            defaultStart: false,
        })

        expect(start).not.toEqual(finish)
    })

    it("Should not allow generating a maze smaller than 5 * 5", () => {
        const width = 4
        const height = 4

        expect(() =>
            generateRandomMaze(width, height, {
                blockChance: 25,
                defaultFinish: true,
                defaultStart: true,
            })
        ).toThrowError()
    })

    it("Should not have any blocks when block chance is 0", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)

        const [maze] = generateRandomMaze(width, height, { blockChance: 0 })

        const blockRow = maze.find((row) =>
            row.some((cell) => cell.state === CELL_STATE_MAP.BLOCK)
        )

        expect(blockRow).toBeUndefined()
    })

    it("Should only have blocks when block chance is 100", () => {
        const width = getRandomIntInclusive(5, 100)
        const height = getRandomIntInclusive(5, 100)

        const [maze] = generateRandomMaze(width, height, { blockChance: 100 })

        const emptyRow = maze.find((row) =>
            row.some((cell) => cell.state === CELL_STATE_MAP.EMPTY)
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
