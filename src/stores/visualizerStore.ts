import { configureStore } from "@reduxjs/toolkit"
import visualizerReducer from "~/slices/visualizerSlice"
import uiReducer from "~/slices/uiSlice"

export const store = configureStore({
    reducer: {
        visualizer: visualizerReducer,
        ui: uiReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
