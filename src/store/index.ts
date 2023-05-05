import { configureStore } from '@reduxjs/toolkit'

import socket from '../socket'

import gameReducer from './Game/gameSlice'
import roomReducer from './Room/roomSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    room: roomReducer
  }
})

// socket.on("game-action", (action) => {
//     store.dispatch(action)
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
