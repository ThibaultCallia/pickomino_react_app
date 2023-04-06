import { PlainTile } from './Tile.types'
import { Box } from '@chakra-ui/react'

function Tile({value, points, onTileClick}:PlainTile) {
    return (
      <Box
        borderRadius="md"
        borderWidth="1px"
        p={4}
        textAlign="center"
        bg="white"
        boxShadow="lg"
        onClick={onTileClick}
        cursor={onTileClick ? 'pointer' : 'default'}
      >
        <h1>Value: {value}</h1>
        <h1>Points: {points}</h1>
      </Box>
  );
  }
  
  export default Tile
  
