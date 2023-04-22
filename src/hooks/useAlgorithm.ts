import { bfs, dfs } from "~/algorithms"
import { delay } from "~/utils"
import { useAppDispatch, useAppSelector } from "./redux"
import { setAlgorithmStatus, setCellState } from "~/slices/visualizerSlice"

export function useAlgorithm() {
  const { maze, start, finish, selectedAlgorithm, stepAnimationDelay } =
    useAppSelector((state) => state.visualizer)
  const dispatch = useAppDispatch()

  const getAlgorithm = () => {
    switch (selectedAlgorithm) {
      case "bfs":
        return bfs
      case "dfs":
        return dfs
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
      const steps = stepsToAnimate[i]

      for (let j = 0; j < steps.length; j++) {
        const [row, col] = steps[j]

        dispatch(
          setCellState({
            rowIdx: row,
            colIdx: col,
            newState: "visited",
          })
        )
      }

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
