// GameSocketContext.tsx
import { createContext, useContext } from "react"
import { IGameSocket } from "../hooks"

export const GameSocketContext = createContext<IGameSocket | null>(null)

export const useGameSocketContext = () => {
    const context = useContext(GameSocketContext)
    if (!context) {
        throw new Error(
            "useGameSocketContext must be used within a GameSocketProvider"
        )
    }
    return context
}
