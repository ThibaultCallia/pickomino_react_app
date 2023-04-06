import {Tile} from "../Tile"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid } from "@chakra-ui/react"

function Board() {
      // HOOKS
      const gameState = useSelector((state: RootState) => state.game)

    
      // RENDER
      return (
        <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
          {gameState.tilesArray.map((tile, index) => {
            return (
              <Tile key={index} value={tile.value} points={tile.points} />
            );
          })}
        </SimpleGrid>
      );
}
  
  export default Board
  
