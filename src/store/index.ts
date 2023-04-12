import { configureStore } from "@reduxjs/toolkit"
import gameReducer from "./Game/gameSlice"
import socket from "../socket"

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
})

socket.on('game-action', (action) => {
    store.dispatch(action);
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
