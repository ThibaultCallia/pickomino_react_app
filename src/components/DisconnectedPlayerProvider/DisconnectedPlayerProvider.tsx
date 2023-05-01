import React, { useState } from 'react'

import { DisconnectedPlayerContext } from '../../contexts'

interface WaitingScreenProviderProps {
  children: React.ReactNode
}

export const DisconnectedPlayerProvider: React.FC<
WaitingScreenProviderProps
> = ({ children }) => {
  const [showWaitingScreen, setShowWaitingScreen] = useState(false)

  return (
        <DisconnectedPlayerContext.Provider
            value={{ showWaitingScreen, setShowWaitingScreen }}
        >
            {children}
        </DisconnectedPlayerContext.Provider>
  )
}
