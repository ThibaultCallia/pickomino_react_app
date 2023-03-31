import { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Button,
  Link,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <Flex
      as="nav"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      boxShadow="md"
      px={4}
      py={2}
      alignItems="center"
    >
      <Box>
        <Link href="/" fontWeight="bold" fontSize="xl">
          Brand
        </Link>
      </Box>
      <Spacer />
      <Box display={{ base: 'none', md: 'flex' }}>
        {/* Add your nav links here */}
        <Link href="/about" mx={2}>
          About
        </Link>
        <Link href="/contact" mx={2}>
          Contact
        </Link>
      </Box>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={toggleMenu}
        icon={displayMenu ? <CloseIcon /> : <HamburgerIcon />} aria-label={displayMenu ? 'Close menu' : 'Open menu'}      />
      <Button
        onClick={toggleColorMode}
        ml={2}
        colorScheme={colorMode === 'dark' ? 'yellow' : 'gray'}
      >
        {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </Flex>
  );
};

  
  export default Navbar
  
