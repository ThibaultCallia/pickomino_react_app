import { useState, useEffect, useContext } from 'react'

import { type PayloadAction, type Dispatch } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

import { DisconnectedPlayerContext } from '../contexts'
import socket from '../socket' // Update the path to your socket instance
import { type RootState } from '../store'
import { type PlainGameState } from '../store/Game/Game.types'
import {
  setInitialState,
  updatePlayerIds,
  setCurrentDiceRoll,
  addSelectedDice,
  takeTile,
  stealTile,
  returnTile,
  nextPlayerTurn,
  resetSelectedDice,
  resetCurrentDiceRoll
} from '../store/Game/gameSlice'
import { createInitialGameState } from '../store/Game/GameStateObject'
import {
  setRoomId,
  setMaxPlayers,
  setPlayersJoined
} from '../store/Room/roomSlice'

const useGameSocket = (dispatch: Dispatch<PayloadAction<any>>) => {
  const [roomCode, setRoomCode] = useState<string | null>(null)
  const gameState = useSelector((state: RootState) => state.game)
  const currentPlayerId = useSelector(
    (state: RootState) => state.game.currentPlayerId
  )

  const { setShowWaitingScreen } = useContext(DisconnectedPlayerContext)

  const [myPlayerId, setMyPlayerId] = useState<string | null>(null)

  useEffect(() => {
    if (!socket) return

    const handleRoomCreated = ({
      roomCode,
      maxPlayers,
      gameState
    }: {
      roomCode: string
      maxPlayers: number
      gameState: PlainGameState
    }) => {
      Cookies.set(
        'PP_playerData',
        JSON.stringify({ playerId: socket.id, roomCode }),
        { expires: 1 }
      )
      setRoomCode(roomCode)
      setMyPlayerId(socket.id)

      // ROOM SLICE
      dispatch(setRoomId(roomCode))
      dispatch(setMaxPlayers(maxPlayers))
      dispatch(setPlayersJoined(1))
      // GAME SLICE
      dispatch(setInitialState(gameState))
    }

    const handleRoomJoined = ({
      roomCode,
      playersJoined,
      maxPlayers,
      gameState
    }: {
      roomCode: string
      playersJoined: number
      maxPlayers: number
      gameState: PlainGameState
    }) => {
      Cookies.set(
        'PP_playerData',
        JSON.stringify({ playerId: socket.id, roomCode }),
        { expires: 1 }
      )
      setRoomCode(roomCode)
      setMyPlayerId(socket.id)

      // ROOM SLICE
      dispatch(setRoomId(roomCode))
      dispatch(setMaxPlayers(maxPlayers))
      // GAME SLICE
      dispatch(setInitialState(gameState))
    }

    const PlayerJoinedListener = (
      playersJoined: number,
      playerIds: string[]
    ) => {
      socket.on(
        'player-joined',
        ({
          playersJoined,
          playerIds
        }: {
          playersJoined: number
          playerIds: string[]
        }) => {
          // ROOM SLICE
          dispatch(setPlayersJoined(playersJoined))
          // GAME SLICE
          dispatch(updatePlayerIds(playerIds))
        }
      )
    }

    const handleGameAction = (type: string, payload: any) => {
      switch (type) {
        case 'nextPlayerTurn':
          dispatch(nextPlayerTurn())

          break
        case 'selectDice':
          dispatch(addSelectedDice(payload))
          break
        case 'resetSelectedDice':
          dispatch(resetSelectedDice())
          break
        case 'rollDice':
          dispatch(setCurrentDiceRoll(payload))
          break
        case 'resetCurrentDiceRoll':
          dispatch(resetCurrentDiceRoll())
          break
        case 'takeTile':
          dispatch(takeTile(payload))
          break
        case 'stealTile':
          dispatch(stealTile(payload))
          break
        case 'returnTile':
          dispatch(returnTile())
          break
        default:
          break
      }
    }

    const handleSyncGameState = (gameState: PlainGameState) => {
      dispatch(setInitialState(gameState))
    }

    // EVENT LISTENERS
    socket.on('room-created', (data) => {
      handleRoomCreated(data)
      PlayerJoinedListener(data.playerJoined, data.playerIds)
    })
    socket.on('room-joined', (data) => {
      handleRoomJoined(data)
      PlayerJoinedListener(data.playerJoined, data.playerIds)
    })

    socket.on('game-action', ({ type, payload }) => {
      handleGameAction(type, payload)
    })
    socket.on('sync-game-state', ({ gameState }) => {
      handleSyncGameState(gameState)
    })
    socket.on('player-disconnected', () => {
      setShowWaitingScreen(true)
    })
    socket.on('player-reconnected', () => {
      setShowWaitingScreen(false)
    })

    return () => {
      socket.off('room-created', handleRoomCreated)
      socket.off('room-joined', handleRoomJoined)
      socket.off('game-action', handleGameAction)
      socket.off('sync-game-state', handleSyncGameState)
      // socket.off("player-joined", handlePlayerJoined);
    }
  }, [])

  useEffect(() => {
    if (!isMyTurn()) return
    socket.emit('update-game-state', { roomCode, newGameState: gameState })
  }, [gameState])

  const createRoom = async (
    roomName: string,
    roomPass: string,
    noOfPlayers: number
  ): Promise<{ success: boolean, roomCode?: string, message?: string }> => {
    const initialGameState = createInitialGameState(noOfPlayers)

    return await new Promise((resolve, reject) => {
      socket.emit(
        'create-room',
        { roomName, roomPass, noOfPlayers, initialGameState },
        (response: any) => {
          if (response.success) {
            resolve({ success: true, roomCode: response.roomCode })
          } else {
            reject({ success: false, message: response.message })
          }
        }
      )
    })
  }

  const joinRoom = async (
    roomName: string,
    roomPass: string
  ): Promise<{ success: boolean, roomCode?: string, message?: string }> => {
    return await new Promise((resolve, reject) => {
      socket.emit(
        'join-room',
        { roomName, roomPass },
        (response: any) => {
          if (response.success) {
            resolve({ success: true, roomCode: response.roomCode })
          } else {
            reject({ success: false, message: response.message })
          }
        }
      )
    })
  }

  const rejoinRoom = async (playerId: string, roomCode: string) => {
    return await new Promise((resolve, reject) => {
      socket.emit(
        'rejoin-room',
        { playerId, roomCode },
        (response: any) => {
          if (response.success) {
            resolve(response.roomData)
            setMyPlayerId(playerId)

            setRoomCode(response.roomCode)
          } else {
            reject(response.message)
          }
        }
      )
    })
  }

  const sendPlayerAction = (type: string, payload: any) => {
    socket.emit('game-action', { type, payload }, myPlayerId)
  }
  const endTurn = () => {
    socket.emit('end-turn', { roomCode })
  }

  const isMyTurn = () => {
    if (!myPlayerId) return false
    return currentPlayerId === myPlayerId
  }
  const returnMyPlayerId = () => {
    return myPlayerId
  }

  return {
    roomCode,
    createRoom,
    joinRoom,
    sendPlayerAction,
    endTurn,
    rejoinRoom,
    isMyTurn,
    returnMyPlayerId
  }
}

export default useGameSocket
