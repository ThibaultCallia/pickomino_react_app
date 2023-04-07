import { PlainTile } from './Tile.types'
import { Box, Center, Text, Image, VStack, HStack } from '@chakra-ui/react'

function Tile({ value, points, onTileClick, selected}: PlainTile) {
  // Assuming you have images named image1, image2, image3, and image4 in your src/assets folder
  const imageSrc = `./tiles/planet_tile_${points}.jpg`;
  const tileContent = (
    <>
      <Center flex="1" >
        <Text fontSize="xl" fontWeight="bold">
          {value}
        </Text>
      </Center>
      <Center flex="1">
        <Image
          src={imageSrc}
          alt={`Image for ${points} points`}
          width="1cm"
          height="1cm"
          objectFit="cover"
        />
      </Center>
    </>
  );

  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      textAlign="center"
      bg="white"
      boxShadow="lg"
      onClick={onTileClick}
      cursor={onTileClick ? 'pointer' : 'default'}
      overflow="hidden"
    >
      {selected ? (
        <HStack width="100%" spacing={0}>
          {tileContent}
        </HStack>
      ) : (
        <VStack height="100%" spacing={0}>
          {tileContent}
        </VStack>
      )}
    </Box>
  );
}
  
  export default Tile
  
