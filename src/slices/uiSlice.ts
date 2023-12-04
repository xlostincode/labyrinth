import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UIState {
    isSidebarOpen: boolean
}

const initialState: UIState = {
    isSidebarOpen: false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setIsSidebarOpen(
            state,
            action: PayloadAction<UIState["isSidebarOpen"]>
        ) {
            state.isSidebarOpen = action.payload
        },
    },
})

export const { setIsSidebarOpen } = uiSlice.actions

export default uiSlice.reducer
