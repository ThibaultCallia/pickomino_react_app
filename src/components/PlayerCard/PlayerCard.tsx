import { Box, Collapse , Text, Image } from "@chakra-ui/react"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { PlainPlayer } from "../../store/Players/Player.types";
import { Tile } from "../Tile";
import { totalDiceValue } from "../../helpers";
import { stealTile, nextPlayerTurn } from "../../store/Game/gameSlice";


function PlayerCard({name, collectedTiles, id}: PlainPlayer) {
  // USE STATES
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const selectedDice = useSelector((state: RootState) => state.game.playerArray[state.game.currentPlayersTurn]?.currentlySelectedDice) || [];
    const dispatch = useDispatch();
    
  // FUNCTIONS
  const stealPlayerTile = (playerId:string, tileValue:number) => {
    // ONLY STEAL OTHERS PLAYERS TILES
    if(totalDiceValue(selectedDice) === tileValue){
      dispatch(stealTile(playerId));
      dispatch(nextPlayerTurn());
      
    }else{
      console.log('NO');
    }
    
    
    // small error message next to tile if no

  }
  // RENDER
  return (
    
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      textAlign="center"
    >
      <Text fontWeight="bold">{name}</Text>
      <Collapse in={isHovered}>
        {/* <Image  mx = "auto" boxSize="50px" mt={4} src="/PP_mini_logo.png" borderRadius="lg" /> */}
        {/* <Text>latest tile value: {collectedTiles[collectedTiles.length-1]?.value}</Text> */}

      {collectedTiles.length > 0 && <Tile {...collectedTiles[collectedTiles.length-1]} onTileClick={()=>stealPlayerTile(id,collectedTiles[collectedTiles.length-1].value )}></Tile>}
      </Collapse>
    </Box>
  )
}

export default PlayerCard
