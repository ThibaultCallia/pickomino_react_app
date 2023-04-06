import {Tile} from "../Tile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid } from "@chakra-ui/react"
import { takeTile } from "../../store/Game/gameSlice"

function Board() {
      // HOOKS
      const gameState = useSelector((state: RootState) => state.game)
      const dispatch = useDispatch();

    //   FUNCTIONS  
        const onTileClick = (value: number) => {
            dispatch(takeTile(value));
        };
    
      // RENDER
      return (
        <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
          {gameState.tilesArray.map((tile, index) => {
            return (
              <Tile onTileClick={()=>onTileClick(tile.value)} key={index} value={tile.value} points={tile.points} />
            );
          })}
        </SimpleGrid>
      );
}
  
  export default Board
  
