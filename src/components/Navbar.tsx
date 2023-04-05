import { useState } from "react"
import {
    Box,
    Flex,
    Spacer,
    Button,
    Link,
    IconButton,
    useColorMode,
    Collapse,
    Image,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"

const Navbar = () => {
    // HOOKS
    const { colorMode, toggleColorMode } = useColorMode()
    const [displayMenu, setDisplayMenu] = useState(false)

    const toggleMenu = () => {
        setDisplayMenu(!displayMenu)
    }

    // RENDER
    return (
        <Flex
            as="nav"
            position="relative"
            bg={colorMode === "dark" ? "gray.800" : "white"}
            boxShadow="md"
            px={4}
            py={2}
            alignItems="center"
        >
            <Box>
                <Link href="/" fontWeight="bold" fontSize="xl">
                    <Flex alignItems="center">
                        <Image
                            src="./PP_mini_logo.png"
                            alt="Logo"
                            width="30px"
                            height="30px"
                            marginRight="5px"
                        />
                        <Box fontWeight="bold" fontSize="xl">
                            Planetary Pirates
                        </Box>
                    </Flex>
                </Link>
            </Box>
            <Spacer />
            <Box display={{ base: "none", md: "flex" }}>
                <Link href="/about" mx={2}>
                    About
                </Link>
                <Link href="/gameRules" mx={2}>
                    Game Rules
                </Link>
            </Box>
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={toggleMenu}
                icon={displayMenu ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={displayMenu ? "Close menu" : "Open menu"}
            />
            <Collapse in={displayMenu} animateOpacity>
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    zIndex={10}
                    p={4}
                    display={{ base: "block", md: "none" }}
                    bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                    rounded="md"
                >
                    <Link
                        href="/about"
                        display="block"
                        my={2}
                        onClick={toggleMenu}
                    >
                        About
                    </Link>
                    <Link
                        href="/gameRules"
                        display="block"
                        my={2}
                        onClick={toggleMenu}
                    >
                        Game Rules
                    </Link>
                </Box>
            </Collapse>
            <Button
                onClick={toggleColorMode}
                ml={2}
                colorScheme={colorMode === "dark" ? "yellow" : "gray"}
            >
                {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
        </Flex>
    )
}
export default Navbar
