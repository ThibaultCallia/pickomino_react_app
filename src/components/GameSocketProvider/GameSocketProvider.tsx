// GameSocketProvider.tsx
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { IGameSocket, useGameSocket } from "../../hooks"; 
import { GameSocketContext } from "../../contexts";
import { GameSocketProviderProps } from "./";


const GameSocketProvider = ({
  dispatch,
  children,
}: GameSocketProviderProps) => {
  const gameSocket = useGameSocket(dispatch);

  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
