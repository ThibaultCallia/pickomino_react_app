import { SimpleGrid } from "@chakra-ui/react"
import {PlayerCard} from "../PlayerCard"

import { useSelector } from "react-redux"
import { RootState } from "../../store"

function PlayerInfo() {
  // HOOKS
  const gameState = useSelector((state: RootState) => state.game)
  
  // RENDER
  return (
    
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
      {gameState.playerArray.map((player: { name: string }, index: number ) => {
        return <PlayerCard key = {index} playerName = {player.name}/>
      })}
      
    </SimpleGrid>
  )
}

export default PlayerInfo
