import { Box, Collapse , Text, Image } from "@chakra-ui/react"
import { useState } from "react";
import { PlayerCardProps } from "./PlayerCard.types";
import { PlainPlayer } from "../../store/Players/Player.types";
import { Tile } from "../Tile";


function PlayerCard({name, collectedTiles}: PlainPlayer) {
  // USE STATES
    const [isHovered, setIsHovered] = useState<boolean>(false);
    
    
  // FUNCTIONS
  const stealTile = () => {
    console.log("steal tile")
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

      {collectedTiles.length > 0 && <Tile {...collectedTiles[collectedTiles.length-1]} onTileClick={stealTile}></Tile>}
      </Collapse>
    </Box>
  )
}

export default PlayerCard
