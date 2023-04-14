import { Box, Image } from "@chakra-ui/react"
import { DieProps } from "./"

function Die({ die, onClick, selected }: DieProps) {
    // FUNCTIONS
    const handleClick = () => {
        if (onClick) {
            onClick(die)
        }
    }

    // RENDER
    return (
        <Box
            onClick={handleClick}
            borderWidth={selected ? "2px" : "1px"}
            borderColor={selected ? "red" : "black"}
            // boxShadow={selected ? "dark-lg" : "none"}
            borderRadius="lg"
            overflow="hidden"
            width="40px"
            height="40px"
            cursor={onClick ? "pointer" : "default"}
        >
            <Image objectFit="cover" src={`/diceFaces/die${die}.svg`} />
        </Box>
    )
}

export default Die
