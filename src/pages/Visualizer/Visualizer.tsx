import "./Visualizer.css"
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
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react"
import { classNames } from "~/utils"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import {
  performReset,
  setAlgorithmStatus,
  setIsPickingFinish,
  setIsPickingStart,
  setSelectedAlgorithm,
} from "~/slices/visualizerSlice"
import { Algorithm, availableAlgorithms } from "~/types/visualizer"
import React, { useCallback, useEffect, useState } from "react"

function Visualizer() {
  const {
    maze,
    selectedAlgorithm,
    isRunning,
    isCompleted,
    isPickingStart,
    isPickingFinish,
  } = useAppSelector((state) => state.visualizer)
  const dispatch = useAppDispatch()

  const runAlgorithm = useAlgorithm()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleAlgorithmSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSelectedAlgorithm(event.target.value as Algorithm))
    },
    []
  )

  const handleReset = () => {
    dispatch(performReset())
    dispatch(setAlgorithmStatus("ready"))
  }

  return (
    <main className="relative h-screen max-h-screen w-full bg-zinc-950 text-zinc-100 font-poppins content-auto">
      <aside
        className={classNames(
          "fixed duration-300 min-h-screen max-h-screen bg-zinc-900 flex flex-col",
          isSidebarOpen ? "w-72" : "w-16"
        )}
      >
        <div className="w-full h-16 flex-none overflow-y-auto flex flex-col items-center justify-center overflow-hidden bg-zinc-800/50">
          {isSidebarOpen && (
            <div className="p-4 w-full flex items-center overflow-hidden sidebar-fade-in">
              <IconLayoutSidebarLeftCollapse
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="h-8 w-8 text-violet-500 cursor-pointer"
              />
              <h1 className="font-semibold grow text-center">
                Path Finding Visualizer
              </h1>
            </div>
          )}
          {/* TODO: Replace with icon */}
          {!isSidebarOpen && (
            <div className="h-10 w-10 font-semibold text-center bg-zinc-500 rounded-md"></div>
          )}
        </div>

        <div className="flex flex-col grow overflow-y-auto items-center">
          {!isSidebarOpen && (
            <IconAdjustments
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="h-8 w-8 text-violet-500 cursor-pointer"
            />
          )}

          {isSidebarOpen && (
            <div className="flex-col justify-center p-2 gap-4 flex sidebar-fade-in">
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
                    onClick={() =>
                      dispatch(setIsPickingFinish(!isPickingFinish))
                    }
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
          )}
        </div>

        <div className="w-full flex-none py-4 px-2 flex flex-col gap-2">
          <Button onClick={runAlgorithm} disabled={isRunning || isCompleted}>
            {isSidebarOpen ? (
              <span>
                {isCompleted ? "Completed" : isRunning ? "Running" : "Run"}
              </span>
            ) : (
              <IconPlayerPlay className="h-6 w-6" />
            )}
          </Button>
          <Button onClick={handleReset} disabled={!isCompleted} danger>
            {isSidebarOpen ? (
              <span>Reset</span>
            ) : (
              <IconRefresh className="h-6 w-6" />
            )}
          </Button>
        </div>
      </aside>

      <section
        className={classNames(
          "duration-300 w-full min-h-screen bg-zinc-950",
          isSidebarOpen ? "pl-[304px]" : "pl-20"
        )}
      >
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
