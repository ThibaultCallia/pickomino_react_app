import {
    Heading,
    SimpleGrid,
    VStack,
    Button,
    Box,
    Image,
    Flex,
} from "@chakra-ui/react"
import { motion, useIsPresent } from "framer-motion"

import { Link } from "react-router-dom"

const HomePage = () => {
    const isPresent = useIsPresent()
    return (
        <>
            <Flex
                height="calc(100vh - 56px - 40px)"
                position="relative"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="hsl(224, 49%, 21%)"
                gap={10}
            >
                <Box pos={"relative"} zIndex={1}>
                    <Heading mb={8} color="white" textAlign={"center"}>
                        Planetary Pirates
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <Button
                            as={Link}
                            variant="outline"
                            colorScheme="yellow"
                            to="/about"
                        >
                            ABOUT
                        </Button>
                        <Button
                            as={Link}
                            variant="outline"
                            colorScheme="yellow"
                            to="/how-to-play"
                        >
                            GAME RULES
                        </Button>
                        <Button as={Link} colorScheme="yellow" to="/game">
                            PLAY THE GAME
                        </Button>
                    </SimpleGrid>
                </Box>
                <Image
                    src="./game_art/PP_transparent.png"
                    position={{ base: "relative", md: "absolute" }}
                    zIndex={0}
                    bottom={0}
                    left={1}
                    width={{ base: "100%", lg: "30%" }}
                    maxW={320}
                    height="auto"
                />
                <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{
                        scaleX: 0,
                        transition: { duration: 0.5, ease: "circOut" },
                    }}
                    exit={{
                        scaleX: 1,
                        transition: { duration: 0.5, ease: "circIn" },
                    }}
                    style={{ originX: isPresent ? 0 : 1 }}
                    className="privacy-screen"
                />
            </Flex>
        </>
    )
}

export default HomePage
