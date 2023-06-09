export interface GameActionPayload {
  type: string
  payload: any
}

export interface GameSocketInterface {
  roomCode: string | null
  createRoom: (
    roomName: string,
    roomPass: string,
    noOfPlayers: number
  ) => Promise<{ success: boolean, roomCode?: string, message?: string }>
  joinRoom: (
    roomName: string,
    roomPass: string
  ) => Promise<{ success: boolean, roomCode?: string, message?: string }>
  sendPlayerAction: (type: string, payload: any) => void
  endTurn: () => void
  rejoinRoom: (playerId: string, roomCode: string) => Promise<any>
  isMyTurn: () => boolean
  returnMyPlayerId: () => string | null
}
