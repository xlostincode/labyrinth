import Sidebar from "~/components/Sidebar/Sidebar"
import Maze from "~/components/Maze/Maze"
import Learn from "~/components/Learn/Learn"

function Visualizer() {
    return (
        <main className="relative flex h-screen max-h-screen w-full bg-zinc-950 text-zinc-100 font-poppins">
            <Sidebar />
            <Maze />
            <Learn />
        </main>
    )
}

export default Visualizer
