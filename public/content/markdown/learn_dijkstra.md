### Djikstra's algorithm

**Dijkstra’s Algorithm** is like BFS’s **more advanced, more strategic sibling**. While BFS is great for finding the shortest path in an unweighted world, **Dijkstra’s algorithm is built for a world where distances matter**. It doesn’t just find **any** path—it finds the **best** path.

### Let’s break it down with a fun example:

Imagine you’re a **delivery driver** navigating a massive city. You need to get from **your warehouse** to a **customer’s house**.

But here’s the twist: **Not all roads are the same!** Some roads are wide and fast (highways), while others are slow and bumpy (narrow alleyways). If you just used BFS, you might end up on **the shortest route in terms of turns, but not in terms of time**.

Instead, you need a **smarter** approach.

1. 🚗 You start at the warehouse and mark it as having a distance of 0.

2. 🛣 You explore all possible roads leading away from it, keeping track of the shortest known distance to each location.

3. 📍 At each step, you pick the location with the shortest known distance (not just the closest road, but the closest total distance so far).

4. 🏁 You continue this process—always updating distances and choosing the next best-known location—until you reach your destination.

### How Is It Different from BFS?

-   **BFS** treats all paths as equal—great for mazes but bad for roads.
-   **Dijkstra’s Algorithm** understands that some paths are better than others.

---

### Try it yourself!

![video](content/video/dijkstra.mp4)

Notice how **Dijkstra’s algorithm doesn’t just spread out evenly like BFS**. Instead, it **carefully weighs each option** before moving. We can even increase the weights of some cells along the path it finds, then re-run the algorithm and watch it avoid that route due to the higher costs!

---

### Fun facts

-   Edsger Dijkstra, the author of this algorithm, came up with it in under 20 minutes one morning at a coffee shop.
-   Due to its versatility with weighted graphs, it is used in a wide range of real-world applications, from GPS navigation to efficient network routing.

---

### Let’s talk about code

```
Dijkstra(Graph, StartNode):
// Create a priority queue to always process
// the shortest path first
let PQ be priority_queue

// Create a dictionary to store shortest distances
let Distances be dictionary with default value ∞

// The start node has a distance of 0
Distances[StartNode] = 0
PQ.enqueue(StartNode, 0)

while (PQ is not empty)
    // Get the node with the smallest known distance
    CurrentNode = PQ.dequeue()

    // Process each neighbor of CurrentNode
    for all neighbors Neighbor of CurrentNode in Graph

        // Calculate the distance to this neighbor
        NewDistance = Distances[CurrentNode] + Weight(CurrentNode, Neighbor)

        // If we found a shorter path, update and enqueue
        if NewDistance < Distances[Neighbor]
            Distances[Neighbor] = NewDistance
            PQ.enqueue(Neighbor, NewDistance)

```

---

### **That's It!**

No guesswork, no random wandering—just a **smart, calculated approach** to finding the shortest path in a weighted graph.
So next time you use Google Maps, **thank Dijkstra** for getting you there on time!

---

Made with ❤️ by Vihar - [Source code](https://github.com/xlostincode/labyrinth)
