// store/Room/roomSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "./";


const initialState: RoomState = {
  roomCode: null,
  playersJoined: 0,
  maxPlayers: 0,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomCode = action.payload;
    },
    setPlayersJoined: (state, action: PayloadAction<number>) => {
      state.playersJoined = action.payload;
    },
    setMaxPlayers: (state, action: PayloadAction<number>) => {
      state.maxPlayers = action.payload;
    },
  },
});

export const { setRoomId, setPlayersJoined, setMaxPlayers } = roomSlice.actions;

export default roomSlice.reducer;
