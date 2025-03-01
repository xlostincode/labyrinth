### Depth-First Search (DFS)

**Depth-First Search**—or just **DFS**—is like the adventurous sibling of BFS. Instead of carefully exploring all paths evenly, DFS is the kind of algorithm that picks a path and dives straight in, only backtracking when it hits a dead end.

### Let’s break it down with a fun example

Imagine you’re an explorer in a massive underground cave system. You start at the entrance, and your goal is to find a hidden treasure deep inside.

What do you do?

Instead of checking every tunnel entrance before going deeper (like BFS would), you pick **one tunnel** and follow it as far as you can. You keep moving forward, turning wherever necessary, until you either **find the treasure** or **reach a dead end**.

If you **hit a dead end**, you don’t panic! You simply **backtrack** to the last junction where you had another unexplored tunnel, and you try that one next.

Eventually, one of two things will happen:

1. 🎉 You find the treasure—mission accomplished!
2. ❌ You’ve backtracked all the way to the entrance and there are no more tunnels left to explore. In that case, you know the treasure **doesn't exist** in this cave system.

### Fun facts

-   The name **Depth-First Search** comes from the fact that the algorithm explores **deep** into a path before coming back up to check other paths.
-   Unlike BFS (which explores evenly), DFS is more like a **curious adventurer** that follows its instincts.
-   DFS is often used for **maze generation**, **solving puzzles like Sudoku**, and even **navigating AI decision trees** in games.

---

### Try it yourself!

-   Select Depth-First Search in the sidebar
-   Hit play

![video](content/video/dfs.mp4)

Notice how the visualization resembles a snake slithering through the maze, unlike BFS, which spreads like a flood. This happens because DFS focuses on a single path, only backtracking when needed.

---

### Let’s talk about code

```
Depth_First_Search(Graph, StartNode):
    // Push our starting point (StartNode) onto the stack.
    Stack.push( StartNode )

    // Mark StartNode as `visited`
    mark StartNode as visited.

    while ( Stack is not empty )
        // Remove the top node from the stack
        V = Stack.pop( )

        // Go through all the neighbors of V
        for all neighbours neighbour_of_V of V in Graph

            // If we haven't visited this neighbor yet
            if neighbour_of_V is not visited

                // Push it onto the stack and mark as visited
                Stack.push( neighbour_of_V )
                mark neighbour_of_V as visited.
```

Note: Just like with BFS, you'd typically use a Set or Map to track visited nodes, but we’ve omitted that for simplicity.

---

### That's it!

No magic, no fancy tricks—just **pick a path, go deep, and backtrack if needed**. DFS is like a **determined adventurer**—always going forward until there's no other choice but to turn back. 🚀

---

Made with ❤️ by Vihar - [Source code](https://github.com/xlostincode/labyrinth)
