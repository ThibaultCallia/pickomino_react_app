import { Box, Collapse , Text, Image } from "@chakra-ui/react"
import { useState } from "react";

interface PlayerCardProps {
    playerName: string;
}

function PlayerCard({playerName}: PlayerCardProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
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
      <Text fontWeight="bold">{playerName}</Text>
      <Collapse in={isHovered}>
        <Image  mx = "auto" boxSize="50px" mt={4} src="/PP_mini_logo.png" borderRadius="lg" />
      </Collapse>
    </Box>
  )
}

export default PlayerCard
