import SidebarSection from "../SidebarSection"
import Button from "~/components/Button/Button"
import Range from "~/components/Range/Range"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import {
    setMazeHeight,
    setMazeWidth,
    generateMaze,
    setSelectedMazeGenerationAlgorithm,
    setMazeGenerationOptions,
} from "~/slices/visualizerSlice"

import { Listbox } from "@headlessui/react"
import {
    MAZE_GENERATION_ALGORITHM_MAP,
    MAZE_GENERATION_ALGORITHM_LIST,
    MazeGenerationAlgorithmId,
} from "~/maze/const"
import { classNames } from "~/utils/style"
import Icon from "~/components/Icon/Icon"

function MazeGeneration() {
    const dispatch = useAppDispatch()
    const {
        mazeWidth,
        mazeHeight,
        selectedMazeGenerationAlgorithm,
        mazeGenerationOptions,
    } = useAppSelector((state) => state.visualizer)

    return (
        <SidebarSection title="Maze Generation">
            <Listbox
                as="div"
                value={selectedMazeGenerationAlgorithm}
                onChange={(value) => {
                    dispatch(
                        setSelectedMazeGenerationAlgorithm(
                            value as MazeGenerationAlgorithmId
                        )
                    )
                }}
                className="relative"
            >
                <Listbox.Button className="flex justify-between w-full p-2 rounded-md bg-zinc-700">
                    {
                        MAZE_GENERATION_ALGORITHM_MAP[
                            selectedMazeGenerationAlgorithm
                        ].name
                    }
                    <Icon name="IconChevronDown" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-zinc-600 cursor-pointer select-none rounded-md overflow-hidden">
                    {MAZE_GENERATION_ALGORITHM_LIST.map((algorithm) => (
                        <Listbox.Option
                            key={algorithm.id}
                            value={algorithm.id}
                            className={({ selected }) =>
                                classNames(
                                    "p-2 hover:bg-violet-500",
                                    selected && "bg-violet-500"
                                )
                            }
                        >
                            {algorithm.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            <Range
                minimum={5}
                maximum={100}
                initialValue={mazeWidth}
                label="Width"
                debounce={500}
                onChange={(value) => dispatch(setMazeWidth(value))}
            />
            <Range
                minimum={5}
                maximum={100}
                initialValue={mazeHeight}
                label="Height"
                debounce={500}
                onChange={(value) => dispatch(setMazeHeight(value))}
            />
            {selectedMazeGenerationAlgorithm ===
                MAZE_GENERATION_ALGORITHM_MAP.RANDOM.id && (
                <Range
                    minimum={0}
                    maximum={100}
                    initialValue={mazeGenerationOptions.blockChance}
                    label="Block (%)"
                    debounce={500}
                    onChange={(value) =>
                        dispatch(
                            setMazeGenerationOptions({ blockChance: value })
                        )
                    }
                />
            )}
            {selectedMazeGenerationAlgorithm ===
                MAZE_GENERATION_ALGORITHM_MAP.RECURSIVE_DIVISION.id && (
                <Range
                    minimum={3}
                    maximum={10}
                    initialValue={mazeGenerationOptions.roomSize}
                    label="Room Size"
                    debounce={500}
                    onChange={(value) =>
                        dispatch(setMazeGenerationOptions({ roomSize: value }))
                    }
                />
            )}
            <Button
                className="mt-2"
                icon="IconHammer"
                onClick={() => dispatch(generateMaze())}
            >
                Generate
            </Button>
        </SidebarSection>
    )
}

export default MazeGeneration
