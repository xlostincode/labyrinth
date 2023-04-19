import useVisualizerStore from "~/stores/visualizerStore"
import { bfs, dfs } from "~/algorithms"
import { delay } from "~/utils"
import type { Algorithm } from "~/types/visualizer"

export function useAlgorithm(algorithm: Algorithm) {
  const maze = useVisualizerStore((state) => state.maze)
  const start = useVisualizerStore((state) => state.start)
  const finish = useVisualizerStore((state) => state.finish)

  const stepAnimationDelay = useVisualizerStore(
    (state) => state.stepAnimationDelay
  )

  const setCellState = useVisualizerStore((state) => state.setCellState)
  const setIsRunning = useVisualizerStore((state) => state.setIsRunning)

  const getAlgorithm = () => {
    switch (algorithm) {
      case "bfs":
        return bfs
      case "dfs":
        return dfs
    }
  }

  const runAlgorithm = async () => {
    setIsRunning(true)
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

      await delay(stepAnimationDelay)
    }
    setIsRunning(false)
  }

  return runAlgorithm
}
