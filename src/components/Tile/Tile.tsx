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
}

function Tile({ value, points, onTileClick, selected, disabled }: PlainTile) {
    return (
        <Button
            variant="outline"
            height="auto"
            boxShadow={"lg"}
            onClick={disabled ? undefined : onTileClick}
            cursor={disabled ? "default" : onTileClick ? "pointer" : "default"}
            overflow="hidden"
            position="relative"
            isDisabled={disabled && !selected}
            _disabled={{
                opacity: 0.3,
                cursor: "default",
                boxShadow: "none",
            }}
        >
            {selected ? (
                <HStack width="100%" spacing={0}>
                    <TileContent points={points} value={value} />
                </HStack>
            ) : (
                <VStack height="100%" spacing={0}>
                    <TileContent points={points} value={value} />
                </VStack>
            )}
        </Button>
    )
}

export default Tile
