import { Provider } from "react-redux"
import { store } from "~/stores/visualizerStore"
import Visualizer from "~/pages/Visualizer/Visualizer"
import PanPinchZoomProvider from "~/context/PanPinchZoom/PanPinchZoomProvider"

function App() {
    return (
        <Provider store={store}>
            <PanPinchZoomProvider>
                <Visualizer />
            </PanPinchZoomProvider>
        </Provider>
    )
}

export default App
