import { useAppSelector } from "~/hooks/redux"
import { classNames, createRowId } from "~/utils"
import Cell from "~/components/Cell/Cell"

function Maze() {
    const { maze } = useAppSelector((state) => state.visualizer)
    const { isSidebarOpen } = useAppSelector((state) => state.ui)

    return (
        <section
            className={classNames(
                "duration-300 w-full min-h-screen bg-zinc-950",
                isSidebarOpen ? "pl-[304px]" : "pl-20"
            )}
        >
            <div className="flex flex-col border border-zinc-600 w-fit">
                {maze.map((row, rowIdx) => (
                    <div
                        key={createRowId(row)}
                        className="flex"
                        draggable={false}
                    >
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
    )
}

export default Maze
