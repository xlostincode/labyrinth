import * as React from "react"
import PanPinchZoomContext from "~/context/PanPinchZoom/Context"
import type { PanPinchZoomContextState } from "~/context/PanPinchZoom/Context"

const PanPinchZoomProvider = (props: React.PropsWithChildren) => {
    const [panPinchZoom, setPanPinchZoom] =
        React.useState<PanPinchZoomContextState["panPinchZoom"]>(null)

    return (
        <PanPinchZoomContext.Provider
            value={{
                panPinchZoom,
                setPanPinchZoom,
            }}
        >
            {props.children}
        </PanPinchZoomContext.Provider>
    )
}

export default PanPinchZoomProvider
