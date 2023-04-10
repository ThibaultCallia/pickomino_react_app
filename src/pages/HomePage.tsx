import { Heading, SimpleGrid, VStack, Button, Box, Image } from "@chakra-ui/react";
import { motion, useIsPresent } from "framer-motion";

import { Link } from "react-router-dom";


const HomePage = () => {
    const isPresent = useIsPresent();
    return (
        <>
        <Box
          height="100vh"
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="hsl(224, 49%, 21%)"
        //   className="home-page"
        >
          <Image
            src="./game_art/PP_transparent.png"
            position="absolute"
            bottom={0}
            left={1}
            zIndex={1}
            width={{ base: '100%', lg: '30%' }}
            height="auto"
          />
          <Heading mb={8} color="yellow.400" >Planetary Pirates</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <VStack
              bg="gray.100"
              borderRadius="md"
              boxShadow="lg"
              p={4}
              height="200px"
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/about">ABOUT</Link>
            </VStack>
            <VStack
              bg="gray.100"
              borderRadius="md"
              boxShadow="lg"
              p={4}
              height="200px"
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/how-to-play">GAME RULES</Link>
            </VStack>
            <VStack
              bg="gray.100"
              borderRadius="md"
              boxShadow="lg"
              p={4}
              height="200px"
              justifyContent="center"
              alignItems="center"
            >
                <Link to ="/game">
              <Button colorScheme="blue" onClick={() => console.log('Play the game')}>
                PLAY THE GAME
              </Button>
              </Link>
            </VStack>
          </SimpleGrid>
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
            exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen"
            />
        </Box>
        </>
      );
    
}

export default HomePage