## Breadth-First Search (BFS) Algorithm

**Breadth-first search**—or just **BFS**—is one of the simplest and most intuitive ways to explore a graph. Seriously, if someone asked you to find the shortest path between two points, you'd probably invent BFS without even realizing it!

### Let’s break it down with a fun example:

Imagine this: You’re a brand-new postman in a city you’ve never been to. Your mission? Deliver a letter from your office to someone’s house.

Here’s the catch: no GPS, no smartphone, and no helpful directions. What do you do?

You start at the post office and check out all the roads leading away from it. When you reach a junction (where roads split), you explore all the new roads there too. You keep repeating this process—exploring each road as you come to it—until you finally find the house you’re looking for.

But wait! Cities can be tricky, full of looping roads. How do you avoid going in circles? Easy—you keep track of every road and place you’ve already visited. If you stumble across a spot you’ve been to before, you simply skip it and move on.

Eventually, one of two things will happen:

1. You find the house—yay, mission accomplished!
2. You’ve explored every road and junction, and there’s nowhere left to go. In that case, you know either the address is wrong or it’s impossible to reach the house from the post office.

### Fun facts

-   The name Breadth-first Search comes from the fact that the algorithm explores the connected nodes at the same level before moving to the next level. This is the behaviour that gives it the "flooding" effect.
-   One of the most common applications of the BFS is implementing the flood-fill algorithm in drawing softwares. Ever used the paint bucket tool in Paint or Photoshop? It uses some version of BFS under the hood!

See flood-fill in action! Set Block Chance to 0% to generate an open maze, draw a closed shape, place the starting point inside, and hit play — and you get a very slow version of paint bucket tool.

![video](/content/video/flood-fill.mp4)

### Let’s talk about code:

```
Breadth_First_Search(Graph, StartNode):
    // Declare a new queue.
    let Queue be queue.

    // Insert our starting point (StartNode) in the queue.
    Q.enqueue( StartNode )

    // Mark StartNode as `visited` so we avoid visiting
    // it again end getting stuck in an endless loop
    mark StartNode as visited.

    while ( Queue is not empty )
        // Remove the first node from the queue
        // whose neighbour will be visited now
        V = Queue.dequeue( )

        // Go through all the neighbours of V
        for all neighbours neighbour_of_V of V in Graph

            // Check if this particular neighnour of V hasn't
            // been visited already. Because we don't want
            // to visit the same neighbour again and again
            // and get stuck in an infinite loop.
            if neighbour_of_V is not visited

                // Queue the neighbour_of_V
                // and mark it as visited
                Q.enqueue( w )
                mark w as visited.
```

Note: You would generally use a Set or a Map to keep track of the visited nodes but those data structures are ommitted to keep the pseudocode simple.

### That's it

No fancy tricks, no overthinking. BFS is just this straightforward process of exploring everything layer by layer.
