import * as React from "react"
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch"

export type PanPinchZoomContextState = {
    panPinchZoom: ReactZoomPanPinchContentRef | null
    setPanPinchZoom: ((ref: ReactZoomPanPinchContentRef) => void) | null
}

const PanPinchZoomContext = React.createContext<PanPinchZoomContextState>({
    panPinchZoom: null,
    setPanPinchZoom: null,
})

export default PanPinchZoomContext
