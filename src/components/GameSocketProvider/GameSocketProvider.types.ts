import { ReactNode } from "react"
import { Dispatch, PayloadAction } from "@reduxjs/toolkit"

export interface GameSocketProviderProps {
    dispatch: Dispatch<PayloadAction<any>>
    children: ReactNode
}
