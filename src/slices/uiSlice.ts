import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UIState {
    isSidebarOpen: boolean
    isLearnSidebarOpen: boolean
}

const initialState: UIState = {
    isSidebarOpen: false,
    isLearnSidebarOpen: false,
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
        setIsLearnSidebarOpen(
            state,
            action: PayloadAction<UIState["isLearnSidebarOpen"]>
        ) {
            state.isLearnSidebarOpen = action.payload
        },
    },
})

export const { setIsSidebarOpen, setIsLearnSidebarOpen } = uiSlice.actions

export default uiSlice.reducer
