// GameSocketContext.tsx
import { createContext, useContext } from 'react'

import { type GameSocketInterface } from '../hooks'

export const GameSocketContext = createContext<GameSocketInterface | null>(null)

export const useGameSocketContext = () => {
  const context = useContext(GameSocketContext)
  if (context == null) {
    throw new Error(
      'useGameSocketContext must be used within a GameSocketProvider'
    )
  }
  return context
}
