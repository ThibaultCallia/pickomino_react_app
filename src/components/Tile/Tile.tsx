import { PlainTile } from "./Tile.types"
import {
    Box,
    Center,
    Text,
    Image,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react"

const TileContent = ({ points, value }: { points: number; value: number }) => {
    // Assuming you have images named image1, image2, image3, and image4 in your src/assets folder
    const imageSrc = `./tiles/planet_tile_${points}.svg`
    return (
        <>
            <Center flex="1">
                <Text my="1" fontSize="l" fontWeight="bold">
                    {value}
                </Text>
            </Center>
            
            <Center flex="1">
                <Image
                    src={imageSrc}
                    alt={`Image for ${points} planets`}
                    width="40px"
                    height="40px"
                    objectFit={"contain"}
                    
                />
            </Center>
        </>
    )
}

function Tile({ value, points, onTileClick, selected, disabled }: PlainTile) {
    return (
        <Button
        // change width if selected
            width="55px"
            
            px={0}
            py={1}
            variant="outline"
            height="auto"
            boxShadow={"md"}
            onClick={disabled ? undefined : onTileClick}
            cursor={disabled ? "default" : onTileClick ? "pointer" : "default"}
            overflow="hidden"
            position="relative"
            isDisabled={disabled && !selected}
            _hover={{
                boxShadow: "lg",
            }}
            _disabled={{
                opacity: 0.3,
                cursor: "default",
                boxShadow: "none",
            }}
        >
            {selected ? (
                <HStack  spacing={0}>
                    <TileContent points={points} value={value} />
                </HStack>
            ) : (
                <VStack  spacing={0}>
                    <TileContent points={points} value={value} />
                </VStack>
            )}
        </Button>
    )
}

export default Tile
