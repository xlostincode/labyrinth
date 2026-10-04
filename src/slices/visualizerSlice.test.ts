import { describe, expect, it } from "vitest"
import { CELL_STATE_MAP } from "~/maze/const"
import visualizerReducer, {
    setFinish,
    setIsPickingFinish,
    setIsPickingStart,
    setStart,
} from "~/slices/visualizerSlice"

describe("Visualizer endpoint selection", () => {
    it("Should reject placing the start on the finish", () => {
        let state = visualizerReducer(undefined, { type: "init" })
        state = visualizerReducer(state, setIsPickingStart(true))

        const originalStart = state.start
        const [finishRow, finishCol] = state.finish
        const nextState = visualizerReducer(
            state,
            setStart({ rowIdx: finishRow, colIdx: finishCol })
        )

        expect(nextState.start).toEqual(originalStart)
        expect(nextState.maze[finishRow][finishCol].state).toBe(
            CELL_STATE_MAP.FINISH
        )
        expect(nextState.isPickingStart).toBe(true)
    })

    it("Should reject placing the finish on the start", () => {
        let state = visualizerReducer(undefined, { type: "init" })
        state = visualizerReducer(state, setIsPickingFinish(true))

        const originalFinish = state.finish
        const [startRow, startCol] = state.start
        const nextState = visualizerReducer(
            state,
            setFinish({ rowIdx: startRow, colIdx: startCol })
        )

        expect(nextState.finish).toEqual(originalFinish)
        expect(nextState.maze[startRow][startCol].state).toBe(
            CELL_STATE_MAP.START
        )
        expect(nextState.isPickingFinish).toBe(true)
    })
})
