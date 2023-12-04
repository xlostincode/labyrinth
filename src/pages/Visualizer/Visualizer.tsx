import Sidebar from "~/components/Sidebar/Sidebar"
import Maze from "~/components/Maze/Maze"

function Visualizer() {
    return (
        <main className="relative h-screen max-h-screen w-full bg-zinc-950 text-zinc-100 font-poppins content-auto">
            <Sidebar />
            <Maze />
        </main>
    )
}

export default Visualizer
