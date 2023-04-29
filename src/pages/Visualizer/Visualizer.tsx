import Button from "~/components/Button/Button"
import Cell from "~/components/Cell/Cell"
import { useAlgorithm } from "~/hooks/useAlgorithm"
import { createRowId } from "~/utils"
import {
  IconPlayerPlay,
  IconRefresh,
  IconAdjustments,
  IconHome,
  IconPennant,
} from "@tabler/icons-react"
import { classNames } from "~/utils"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import {
  setIsPickingFinish,
  setIsPickingStart,
  setSelectedAlgorithm,
} from "~/slices/visualizerSlice"
import { Algorithm, availableAlgorithms } from "~/types/visualizer"
import React, { useCallback } from "react"

function Visualizer() {
  const {
    maze,
    selectedAlgorithm,
    isRunning,
    isPickingStart,
    isPickingFinish,
  } = useAppSelector((state) => state.visualizer)
  const dispatch = useAppDispatch()

  const runAlgorithm = useAlgorithm()

  const handleAlgorithmSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSelectedAlgorithm(event.target.value as Algorithm))
    },
    []
  )

  return (
    <main className="relative h-screen max-h-screen w-full bg-zinc-950 text-zinc-100 font-poppins content-auto">
      <aside className="fixed w-16 peer group hover:w-72 duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col">
        <div className="w-full h-16 flex-none overflow-y-auto flex flex-col items-center overflow-hidden">
          <h1 className="p-2 font-semibold w-full text-center hidden group-hover:block overflow-hidden">
            Path Finding Visualizer
          </h1>
          {/* TODO: Replace with icon */}
          <h1 className="h-10 w-10 font-semibold text-center block group-hover:hidden bg-zinc-500 rounded-md"></h1>
        </div>

        <div className="flex flex-col grow overflow-y-auto items-center">
          <IconAdjustments className="h-8 w-8 text-zinc-600 block group-hover:hidden" />
          <div className="flex-col  justify-center p-2 gap-4 hidden group-hover:flex">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  className={classNames(
                    "flex gap-2 items-center",
                    isPickingStart && "text-indigo-400 font-semibold"
                  )}
                  onClick={() => dispatch(setIsPickingStart(!isPickingStart))}
                >
                  <IconHome />
                  Set Start
                </button>

                <button
                  className={classNames(
                    "flex gap-2 items-center",
                    isPickingFinish && "text-indigo-400 font-semibold"
                  )}
                  onClick={() => dispatch(setIsPickingFinish(!isPickingFinish))}
                >
                  <IconPennant />
                  Set Finish
                </button>
              </div>
              {isPickingStart && (
                <span className="font-small text-zinc-500 text-center">
                  Right-click on a cell to set as starting point
                </span>
              )}

              {isPickingFinish && (
                <span className="font-small text-zinc-500 text-center">
                  Right-click on a cell to set as finishing point
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="algorithm" className="text-zinc-400">
                Search Algorithm
              </label>
              <select
                id="algorithm"
                name="algorithm"
                className="bg-zinc-700"
                value={selectedAlgorithm}
                onChange={handleAlgorithmSelect}
              >
                {availableAlgorithms.map((algorithm) => (
                  <option>{algorithm}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex-none py-4 px-2 flex flex-col gap-2">
          <Button onClick={runAlgorithm} disabled={isRunning}>
            <span className="hidden group-hover:block">
              {isRunning ? "Running" : "Run"}
            </span>
            <IconPlayerPlay className="h-6 w-6 block group-hover:hidden" />
          </Button>
          <Button disabled={!isRunning} danger>
            <span className="hidden group-hover:block">Reset</span>
            <IconRefresh className="h-6 w-6 block group-hover:hidden" />
          </Button>
        </div>
      </aside>

      <section className="pl-20 peer-hover:pl-[304px] duration-300 w-full min-h-screen bg-zinc-950">
        <div className="flex flex-col border border-zinc-600 w-fit">
          {maze.map((row, rowIdx) => (
            <div key={createRowId(row)} className="flex" draggable={false}>
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
