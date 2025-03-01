import { bfs, dfs, dijkstra } from "~/algorithms"
import { delay } from "~/utils/logic"
import { useAppDispatch, useAppSelector } from "./redux"
import {
    renderVisitedSteps,
    setVisualizerStatus,
    setCellState,
} from "~/slices/visualizerSlice"
import { PATH_FINDING_ALGORITHM_MAP } from "~/algorithms/const"
import { VISUALIZER_STATUS_MAP } from "~/visualizer/const"
import { CELL_STATE_MAP } from "~/maze/const"
import { astar } from "~/algorithms/astar/astar"

export function useAlgorithm() {
    const {
        maze,
        start,
        finish,
        selectedPathFindingAlgorithm,
        stepAnimationDelay,
    } = useAppSelector((state) => state.visualizer)
    const dispatch = useAppDispatch()

    const getAlgorithm = () => {
        switch (selectedPathFindingAlgorithm) {
            case PATH_FINDING_ALGORITHM_MAP.BFS.id:
                return bfs
            case PATH_FINDING_ALGORITHM_MAP.DFS.id:
                return dfs
            case PATH_FINDING_ALGORITHM_MAP.DIJKSTRA.id:
                return dijkstra
            case PATH_FINDING_ALGORITHM_MAP.ASTAR.id:
                return astar
        }
    }

    const runAlgorithm = async () => {
        dispatch(setVisualizerStatus(VISUALIZER_STATUS_MAP.RUNNING))
        const algorithmFn = getAlgorithm()

        const [stepsToAnimate, pathFromStartToFinish] = algorithmFn(
            maze,
            start,
            finish
        )

        // Draw the visited cells in order
        for (let i = 0; i < stepsToAnimate.length; i++) {
            dispatch(renderVisitedSteps(stepsToAnimate[i]))
            await delay(stepAnimationDelay)
        }

        // Draw the path from start to finish
        for (let i = 0; i < pathFromStartToFinish.length; i++) {
            const [row, col] = pathFromStartToFinish[i]

            dispatch(
                setCellState({
                    rowIdx: row,
                    colIdx: col,
                    newState: CELL_STATE_MAP.PATH,
                })
            )

            await delay(stepAnimationDelay)
        }

        dispatch(setVisualizerStatus(VISUALIZER_STATUS_MAP.COMPLETED))
    }

    return runAlgorithm
}
