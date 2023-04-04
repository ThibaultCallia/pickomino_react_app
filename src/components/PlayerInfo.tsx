import { SimpleGrid, GridItem } from "@chakra-ui/react"
import PlayerCard from "./PlayerCard"

interface PlayerInfoProps {
  gameState: {
    playerArray: Array<{ name: string }>;
  } | null;
}


function PlayerInfo({gameState}: any) {
  // RENDER
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
      {gameState?.playerArray.map((player: { name: string }, index: number ) => {
        return <PlayerCard key = {index} playerName = {player.name}/>
      })}
      
    </SimpleGrid>
  )
}

export default PlayerInfo
