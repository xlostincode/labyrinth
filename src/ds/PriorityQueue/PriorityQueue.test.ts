import { describe, expect, it } from "vitest"
import PriorityQueue from "~/ds/PriorityQueue/PriorityQueue"
import { getRandomIntInclusive } from "~/utils/math"

describe.concurrent("Priority queue (Min Heap)", () => {
    it("Should return null when queue has no elements", () => {
        const queue = new PriorityQueue<number>()

        const node = queue.dequeue()

        expect(node).toBeNull()
    })

    it("Should not return null when queue has some elements", () => {
        const queue = new PriorityQueue<number>()

        queue.enqueue(
            getRandomIntInclusive(1, 100),
            getRandomIntInclusive(1, 100)
        )

        const node = queue.dequeue()

        expect(node).not.toBeNull()
    })

    it("Should return the lowest priority element from a fixed set of elements.", () => {
        // [Priority, Value]
        const minNode = [23, 10]
        const nodes = [[65, 1], [123, 8], [77, 11], [43, 7], minNode, [29, 12]]

        const queue = new PriorityQueue<number>()

        nodes.forEach(([priority, value]) => queue.enqueue(value, priority))

        const node = queue.dequeue()

        expect(node).toBeDefined()
        expect(node!.priority).toBe(minNode[0])
        expect(node!.value).toBe(minNode[1])
    })

    it("Should return the lowest priority element from a random set of elements. 1000 runs with array size of 100.", () => {
        const ARR_SIZE = 100
        const LOOP_COUNT = 1000

        const MAX_PRIORITY = 1000
        const MIN_PRIORITY = 1

        const MAX_VALUE = 100
        const MIN_VALUE = 1

        for (let loop = 0; loop < LOOP_COUNT; loop++) {
            // [Priority, Value]
            const nodes = new Array(ARR_SIZE)
                .fill(null)
                .map(() => [
                    getRandomIntInclusive(MIN_PRIORITY, MAX_PRIORITY),
                    getRandomIntInclusive(MIN_VALUE, MAX_VALUE),
                ])

            const queue = new PriorityQueue<number>()
            let lowestPriority = Infinity

            for (let index = 0; index < nodes.length; index++) {
                const [priority, value] = nodes[index]

                if (priority < lowestPriority) lowestPriority = priority

                queue.enqueue(value, priority)
            }

            const node = queue.dequeue()

            expect(node).toBeDefined()
            expect(node!.priority).toBe(lowestPriority)
        }
    })
})
