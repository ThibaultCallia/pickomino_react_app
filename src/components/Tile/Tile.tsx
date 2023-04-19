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
    const boxShadowS: string = "2px 2px 0 black"
    const boxShadowL = "3px 3px 0 black"
    return (
        <Button
            // change width if selected
            width="55px"
            mr={selected ? "5px" : "0"}
            px={0}
            
            py={1}
            borderRadius="sm"
            color={"hsl(224, 49%, 21%)"}
            border={"1px solid black"}
            variant="outline"
            height="auto"
            boxShadow={selected ? "none" : boxShadowS}
            onClick={disabled ? undefined : onTileClick}
            cursor={disabled ? "default" : onTileClick ? "pointer" : "default"}
            overflow="hidden"
            position="relative"
            isDisabled={disabled && !selected}
            _hover={{
                boxShadow: boxShadowL,
            }}
            _disabled={{
                opacity: 0.3,
                cursor: "default",
                boxShadow: "none",
            }}
        >
            <VStack spacing={0}>
                <TileContent points={points} value={value} />
            </VStack>
        </Button>
    )
}

export default Tile
