// Footer.js

import { Box, Flex, Link, useColorMode } from '@chakra-ui/react';


const Footer = () => {
  const { colorMode } = useColorMode();

  // RENDER
  return (
    <Box
      as="footer"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      boxShadow="md"
      px={4}
      py={2}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="/privacy" mx={2}>
            Based on "Regenwormen" by 999 Games
          </Link>
          
        </Box>
        <Box>
          <Link href="https://github.com/ThibaultCallia/pickomino_react_app" mx={2} isExternal>
            GitHub
          </Link>
          
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
