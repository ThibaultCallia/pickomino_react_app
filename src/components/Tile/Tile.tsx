import { PlainTile } from "./Tile.types"
import { Box, Center, Text, Image, VStack, HStack } from "@chakra-ui/react"

function Tile({ value, points, onTileClick, selected, disabled }: PlainTile) {
    // Assuming you have images named image1, image2, image3, and image4 in your src/assets folder
    const imageSrc = `./tiles/planet_tile_${points}.jpg`
    const tileContent = (
        <>
            <Center flex="1">
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
    )

    return (
        <Box
            borderRadius="md"
            borderWidth="1px"
            textAlign="center"
            bg="white"
            boxShadow="lg"
            onClick={disabled ? undefined : onTileClick}
            cursor={disabled ? "default" : onTileClick ? "pointer" : "default"}
            overflow="hidden"
            position="relative"
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
            {disabled && !selected && (
                <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                    bg="gray.500"
                    opacity={0.6}
                    zIndex={1}
                />
            )}
        </Box>
    )
}

export default Tile
