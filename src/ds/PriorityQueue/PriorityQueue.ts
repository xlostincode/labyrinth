class QueueNode<T> {
    public value: T
    public priority: number

    constructor(value: T, priority: number) {
        this.value = value
        this.priority = priority
    }
}

class PriorityQueue<T> {
    private _nodes: QueueNode<T>[]

    constructor() {
        this._nodes = []
    }

    private _parentIndex(index: number) {
        return (index - 1) >> 1
    }

    private _rightChildIndex(index: number) {
        return index * 2 + 2
    }

    private _leftChildIndex(index: number) {
        return index * 2 + 1
    }

    private _swap(indexFrom: number, indexTo: number) {
        const temp = this._nodes[indexFrom]
        this._nodes[indexFrom] = this._nodes[indexTo]
        this._nodes[indexTo] = temp
    }

    private _moveUp(index: number) {
        const node = this._nodes[index]
        let indexToMove = index

        while (indexToMove > 0) {
            const parentIndex = this._parentIndex(indexToMove)
            const parent = this._nodes[parentIndex]

            if (parent.priority > node.priority) {
                this._swap(parentIndex, indexToMove)
                indexToMove = parentIndex
            } else {
                break
            }
        }
    }

    private _hasChildren(index: number) {
        const leftIndex = this._leftChildIndex(index)
        const rightIndex = this._rightChildIndex(index)

        return (
            this._nodes[leftIndex] !== undefined ||
            this._nodes[rightIndex] !== undefined
        )
    }

    private _moveDown(index: number) {
        const node = this._nodes[index]
        let indexToMove = index

        while (this._hasChildren(indexToMove)) {
            const leftChildIndex = this._leftChildIndex(indexToMove)
            const rightChildIndex = this._rightChildIndex(indexToMove)

            const leftChild = this._nodes[leftChildIndex]
            const rightChild = this._nodes[rightChildIndex]

            let smallerChildIndex = -1

            if (rightChild === undefined) {
                smallerChildIndex = leftChildIndex
            } else if (leftChild === undefined) {
                // TODO: Will this ever be true?
                smallerChildIndex = rightChildIndex
            } else if (leftChild.priority < rightChild.priority) {
                smallerChildIndex = leftChildIndex
            } else {
                smallerChildIndex = rightChildIndex
            }

            const smallerChild = this._nodes[smallerChildIndex]

            if (node.priority < smallerChild.priority) {
                break
            }

            this._swap(indexToMove, smallerChildIndex)
            indexToMove = smallerChildIndex
        }
    }

    enqueue(value: T, priority: number) {
        const node = new QueueNode(value, priority)
        this._nodes.push(node)
        this._moveUp(this._nodes.length - 1)
    }

    dequeue() {
        const length = this._nodes.length
        const node = this._nodes[0]

        if (length <= 0) {
            return null
        } else if (length === 1) {
            this._nodes.length = 0
        } else {
            this._nodes[0] = this._nodes.pop()!
            this._moveDown(0)
        }

        return node
    }

    size() {
        return this._nodes.length
    }
}

export default PriorityQueue
