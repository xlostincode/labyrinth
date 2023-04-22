import { configureStore } from "@reduxjs/toolkit"
import visualizerReducer from "~/slices/visualizerSlice"

export const store = configureStore({
  reducer: {
    visualizer: visualizerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
