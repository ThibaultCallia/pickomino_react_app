import { createContext } from 'react'

interface DisconnectedPlayerContextType {
  showWaitingScreen: boolean
  setShowWaitingScreen: (show: boolean) => void
}

export const DisconnectedPlayerContext =
    createContext<DisconnectedPlayerContextType>({
      showWaitingScreen: false,
      setShowWaitingScreen: () => {}
    })
