import {Tile} from "../Tile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react"
import { takeTile, nextPlayerTurn } from "../../store/Game/gameSlice"
import { totalDiceValue, includesRocket } from "../../helpers"
import { EndTurnModal } from "../EndTurnModal"


const  Board = () => {
      // HOOKS
      const gameState = useSelector((state: RootState) => state.game)
      const dispatch = useDispatch();
      const { isOpen, onOpen, onClose } = useDisclosure()
      const selectedDice = useSelector((state: RootState) => state.game.playerArray[state.game.currentPlayersTurn]?.currentlySelectedDice) || [];
      const toast = useToast();
      const rocketToastId = "rocketToast";
      const diceToastId = "diceToast";
      const currentDiceRoll = useSelector((state: RootState) => state.game.playerArray[state.game.currentPlayersTurn]?.currentDiceRoll) || [];

    //   FUNCTIONS  
        const onTileClick = (tileValue: number) => {
          
          if(currentDiceRoll.length !== 0){
            if(!toast.isActive(rocketToastId)){
                toast({
                  title: "You must choose a die ",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  id: rocketToastId,
                  variant: "subtle"
                })
              }
          } else if(!includesRocket(selectedDice)){
              if(!toast.isActive(rocketToastId)){
                toast({
                  title: "You must select a rocket to take a tile",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  id: rocketToastId,
                  variant: "subtle"
                })
              }
            } else if(totalDiceValue(selectedDice) < tileValue){
              if(!toast.isActive(diceToastId)){
                toast({
                  title: "Not enough dice ",
                  description:"You must roll at least the same value as the tile you want to take",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  id: diceToastId,
                  variant: "subtle"
                })
              }
            } else{
              dispatch(takeTile(tileValue));
              toast.close(rocketToastId);
              toast.close(diceToastId);
              // timeout?
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

  
