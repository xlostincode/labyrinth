import { bfs, dfs, dijkstra } from "~/algorithms"
import { delay } from "~/utils/logic"
import { useAppDispatch, useAppSelector } from "./redux"
import {
    renderVisitedSteps,
    setAlgorithmStatus,
    setCellState,
} from "~/slices/visualizerSlice"
import { PATH_FINDING_ALGORITHM_MAP } from "~/algorithms/const"

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
        }
    }

    const runAlgorithm = async () => {
        dispatch(setAlgorithmStatus("running"))
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
                    newState: "path",
                })
            )

            // TODO: Maybe have this fixed
            await delay(stepAnimationDelay)
        }

        dispatch(setAlgorithmStatus("completed"))
    }

    return runAlgorithm
}
