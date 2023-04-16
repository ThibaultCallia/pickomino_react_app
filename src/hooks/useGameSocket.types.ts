export interface GameActionPayload {
    type: string
    payload: any
}

export interface IGameSocket {
    roomCode: string | null
    createRoom: (
        roomName: string,
        roomPass: string,
        noOfPlayers: number
    ) => Promise<string>
    joinRoom: (roomName: string, roomPass: string) => Promise<string>
    sendPlayerAction: (type: string, payload: any) => void
}
