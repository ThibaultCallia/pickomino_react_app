import {Tile} from "../Tile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid } from "@chakra-ui/react"
import { takeTile } from "../../store/Game/gameSlice"
import { BoardProps } from "./Board.types"
import { totalSelectedDice, includesRocket } from "../../helpers"

const  Board:React.FC<BoardProps> = ({selectedDice, setValidation}) => {
      // HOOKS
      const gameState = useSelector((state: RootState) => state.game)
      const dispatch = useDispatch();

    //   FUNCTIONS  
        const onTileClick = (tileValue: number) => {
            if(!includesRocket(selectedDice)){
              setValidation("You need to select a rocket to take a tile");
              console.log('you need to select a rocket to take a tile');
            } else if(totalSelectedDice(selectedDice) < tileValue){
              setValidation("your selected dice are not enough to take this tile");
              console.log('your selected dice are not enough to take this tile');
            } else{
              dispatch(takeTile(tileValue));
            }
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
  
  
