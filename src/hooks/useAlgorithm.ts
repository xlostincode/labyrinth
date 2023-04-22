import useVisualizerStore from "~/stores/visualizerStore"
import { bfs, dfs } from "~/algorithms"
import { delay } from "~/utils"

export function useAlgorithm() {
  const maze = useVisualizerStore((state) => state.maze)
  const start = useVisualizerStore((state) => state.start)
  const finish = useVisualizerStore((state) => state.finish)
  const selectedAlgorithm = useVisualizerStore(
    (state) => state.selectedAlgorithm
  )

  const stepAnimationDelay = useVisualizerStore(
    (state) => state.stepAnimationDelay
  )

  const setCellState = useVisualizerStore((state) => state.setCellState)
  const setAlgorithmStatus = useVisualizerStore(
    (state) => state.setAlgorithmStatus
  )

  const getAlgorithm = () => {
    switch (selectedAlgorithm) {
      case "bfs":
        return bfs
      case "dfs":
        return dfs
    }
  }

  const runAlgorithm = async () => {
    setAlgorithmStatus("running")
    const algorithmFn = getAlgorithm()

    const [stepsToAnimate, pathFromStartToFinish] = algorithmFn(
      maze,
      start,
      finish
    )

    for (const steps of stepsToAnimate) {
      for (const [row, col] of steps) {
        setCellState(row, col, "visited")
      }

      await delay(stepAnimationDelay)
    }

    for (const [row, col] of pathFromStartToFinish) {
      setCellState(row, col, "path")

      // TODO: Maybe have this fixed
      await delay(stepAnimationDelay)
    }
    setAlgorithmStatus("completed")
  }

  return runAlgorithm
}
