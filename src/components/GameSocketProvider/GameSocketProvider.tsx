// GameSocketProvider.tsx
import { GameSocketContext } from '../../contexts'
import { useGameSocket } from '../../hooks'

import { type GameSocketProviderProps } from './'

const GameSocketProvider = ({
  dispatch,
  children
}: GameSocketProviderProps) => {
  const gameSocket = useGameSocket(dispatch)

  return (
        <GameSocketContext.Provider value={gameSocket}>
            {children}
        </GameSocketContext.Provider>
  )
}

export default GameSocketProvider
