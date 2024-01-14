import { Listbox } from "@headlessui/react"
import SidebarSection from "../SidebarSection"
import { useAppDispatch, useAppSelector } from "~/hooks/redux"
import { setSelectedPathFindingAlgorithm } from "~/slices/visualizerSlice"
import {
    PATH_FINDING_ALGORITHM_LIST,
    PATH_FINDING_ALGORITHM_MAP,
    PathFindingAlgorithmId,
} from "~/algorithms/const"
import Icon from "~/components/Icon/Icon"
import { classNames } from "~/utils/style"

function SearchAlgorithm() {
    const dispatch = useAppDispatch()
    const { selectedPathFindingAlgorithm } = useAppSelector(
        (state) => state.visualizer
    )

    return (
        <SidebarSection title="Search Algorithm">
            <Listbox
                as="div"
                value={selectedPathFindingAlgorithm}
                onChange={(value) => {
                    dispatch(
                        setSelectedPathFindingAlgorithm(
                            value as PathFindingAlgorithmId
                        )
                    )
                }}
                className="relative"
            >
                <Listbox.Button className="flex justify-between w-full p-2 rounded-md bg-zinc-700">
                    {
                        PATH_FINDING_ALGORITHM_MAP[selectedPathFindingAlgorithm]
                            .name
                    }
                    <Icon name="IconChevronDown" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-zinc-600 cursor-pointer select-none rounded-md overflow-hidden">
                    {PATH_FINDING_ALGORITHM_LIST.map((algorithm) => (
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
        </SidebarSection>
    )
}

export default SearchAlgorithm
