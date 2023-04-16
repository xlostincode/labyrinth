import Button from "~/components/Button/Button"
import Cell from "~/components/Cell/Cell"
import { useAlgorithm } from "~/hooks/useAlgorithm"
import useVisualizerStore from "~/stores/visualizerStore"
import { createRowId } from "~/utils"

function Visualizer() {
  const maze = useVisualizerStore((state) => state.maze)
  const isRunning = useVisualizerStore((state) => state.isRunning)

  const runAlgorithm = useAlgorithm("bfs")

  return (
    <main className="relative h-screen max-h-screen w-full bg-zinc-950 text-zinc-100 font-poppins content-auto">
      <aside className="fixed w-16 md:hover:w-72 duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col">
        <div className="w-full flex-grow overflow-y-auto flex flex-col">
          <h1 className="p-2 font-semibold w-full text-center">
            Path Finding Visualizer
          </h1>
        </div>

        <div className="w-full flex-none py-4 px-2 flex flex-col gap-2">
          <Button onClick={runAlgorithm} disabled={isRunning}>
            {isRunning ? "Running" : "Run"}
          </Button>
          <Button disabled={!isRunning} danger>
            Reset
          </Button>
        </div>
      </aside>

      <section className="pl-72 w-full min-h-screen bg-zinc-950">
        <div className="flex flex-col border border-zinc-600 w-fit">
          {maze.map((row, rowIdx) => (
            <div key={createRowId(row)} className="flex">
              {row.map((cell, colIdx) => (
                <Cell
                  key={cell.id}
                  cell={cell}
                  rowIdx={rowIdx}
                  colIdx={colIdx}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Visualizer
