// store/Room/roomSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RoomState } from './'

const initialState: RoomState = {
  roomCode: null,
  playersJoined: 0,
  maxPlayers: 0
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, { payload: roomCode }: PayloadAction<string>) => {
      state.roomCode = roomCode
    },
    setPlayersJoined: (
      state,
      { payload: playersJoined }: PayloadAction<number>
    ) => {
      state.playersJoined = playersJoined
    },
    setMaxPlayers: (
      state,
      { payload: maxPlayers }: PayloadAction<number>
    ) => {
      state.maxPlayers = maxPlayers
    }
  }
})

export const { setRoomId, setPlayersJoined, setMaxPlayers } = roomSlice.actions

export default roomSlice.reducer
