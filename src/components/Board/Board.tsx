import {Tile} from "../Tile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { takeTile, nextPlayerTurn } from "../../store/Game/gameSlice"
import { BoardProps } from "./Board.types"
import { totalDiceValue, includesRocket } from "../../helpers"
import { EndTurnModal } from "../EndTurnModal"


const  Board:React.FC<BoardProps> = ({ setValidation}) => {
      // HOOKS
      const gameState = useSelector((state: RootState) => state.game)
      const dispatch = useDispatch();
      const { isOpen, onOpen, onClose } = useDisclosure()
      const selectedDice = useSelector((state: RootState) => state.game.playerArray[state.game.currentPlayersTurn]?.currentlySelectedDice) || [];

    //   FUNCTIONS  
        const onTileClick = (tileValue: number) => {
            if(!includesRocket(selectedDice)){
              setValidation("You need to select a rocket to take a tile");
            } else if(totalDiceValue(selectedDice) < tileValue){
              setValidation("your selected dice are not enough to take this tile");
            } else{
              dispatch(takeTile(tileValue));
              setValidation("");
              onOpen();
            }
        };
    
      // RENDER
      return (
      <>
        <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
          {gameState.tilesArray.map((tile, index) => {
            return (
              <Tile onTileClick={()=>onTileClick(tile.value)} key={index} {...tile} />
            );
          })}
        </SimpleGrid>
        <EndTurnModal 
      isOpen={isOpen} 
      onClose={()=>{
        onClose();
        dispatch(nextPlayerTurn());}
        }
      title="End of turn"
        >
      Well done. Next player plays.
    </EndTurnModal>
      </>
      );
}
  export default Board

  
