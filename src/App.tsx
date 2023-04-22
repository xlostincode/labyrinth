import { Provider } from "react-redux"
import { store } from "~/stores/visualizerStore"
import Visualizer from "~/pages/Visualizer/Visualizer"

function App() {
  return (
    <Provider store={store}>
      <Visualizer />
    </Provider>
  )
}

export default App
