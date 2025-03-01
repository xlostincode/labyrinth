### A\* Search

**A\* Search Algorithm** is like **Dijkstra’s algorithm’s even smarter cousin**. While Dijkstra is great at finding the absolute shortest path, **A\* goes one step further** by making an educated guess about which paths are best, helping it reach the goal faster.

---

### Let’s break it down with a fun example:

Imagine you’re a **delivery driver** again, but this time, you don’t just have a list of roads—you also have a **map with a bird’s-eye view of the whole city**. You can actually see where the destination is, so you can make better decisions instead of blindly checking every possible route.

Here’s how A\* works:

1. 🚗 You start at the warehouse and mark it as having a distance of 0.

2. 🛣 You explore all possible roads leading away from it, keeping track of two things:

    - **How far you’ve traveled so far** (**g-score**, like in Dijkstra).
    - **How close you think you are to the goal** (**h-score**, a heuristic guess).

3. 📍 At each step, you pick the location with the **lowest total estimated cost**:

    **f = g + h**

    This means it doesn’t just blindly follow the shortest known route—it prioritizes roads that seem to lead toward the goal faster.

4. 🏁 You keep updating distances and picking the best options until you reach the goal.

### How Is It Different from Dijkstra?

-   **Dijkstra** explores every possible option, making sure to find the absolute shortest path, but it can be slow.
-   **A\*** **uses intuition** (the heuristic) to make educated choices, speeding things up when possible.

---

### Try it yourself!

![video](content/video/astar.mp4)

Watch how **A\*** moves toward the goal more efficiently than Dijkstra! Here is Dijkstra's algorithm running on the same maze for comparison.

![video](content/video/dijkstra_v_astar.mp4)

Notice how Dijkstra's algorithm spreads out more as it focuses only on finding the absolute shortest path, while A\* is more contained since it considers both the cost and the distance to the end goal.

Here are the end results for better comparison

> A\* Search

![image](content/image/astar_result.png)

> Dijkstra's algorithm

![image](content/image/dijkstra_result.png)

---

### Fun Facts

-   A\* was first developed in **1968** for pathfinding in robotics and AI.
-   It’s widely used in **video game AI, GPS navigation, and robotics**, where efficiency matters just as much as accuracy.
-   If you remove the heuristic (h-score), **A\*** turns into **Dijkstra’s algorithm**! So we can say that Dijkstra's algorithm is a special case of A\* search algorithm!

---

### Let’s talk about code

```
AStar(Graph, StartNode, GoalNode):
// Create a priority queue to always process
// the most promising path first
let PQ be priority_queue

// Create dictionaries to store shortest distances and estimated costs
let Distances be dictionary with default value ∞
let EstimatedCosts be dictionary with default value ∞

// The start node has a distance of 0 and an estimated cost based on the heuristic
Distances[StartNode] = 0
EstimatedCosts[StartNode] = Heuristic(StartNode, GoalNode)
PQ.enqueue(StartNode, EstimatedCosts[StartNode])

while (PQ is not empty)
    // Get the node with the smallest estimated cost
    CurrentNode = PQ.dequeue()

    // If we reached the goal, stop!
    if CurrentNode == GoalNode:
        return reconstruct_path(GoalNode)

    // Process each neighbor of CurrentNode
    for all neighbors Neighbor of CurrentNode in Graph

        // Calculate the distance to this neighbor
        NewDistance = Distances[CurrentNode] + Weight(CurrentNode, Neighbor)

        // If this path is better, update records and enqueue
        if NewDistance < Distances[Neighbor]
            Distances[Neighbor] = NewDistance
            EstimatedCosts[Neighbor] = NewDistance + Heuristic(Neighbor, GoalNode)
            PQ.enqueue(Neighbor, EstimatedCosts[Neighbor])
```

---

### **That’s It!**

A* is like **Dijkstra with a built-in sense of direction**—no unnecessary wandering, just a fast and intelligent way to find the best path. Next time your GPS gives you the perfect route, you’ll know A* is behind the magic! 🚀

---

Made with ❤️ by Vihar - [Source code](https://github.com/xlostincode/labyrinth)
