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
    useDisclosure,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { SettingsMenu } from "../SettingsMenu"
import { GameRulesDrawer } from "../GameRulesDrawer"
import Cookies from "js-cookie"

const Navbar = () => {
    // HOOKS
    const { colorMode } = useColorMode()
    const [displayMenu, setDisplayMenu] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toggleMenu = () => {
        setDisplayMenu(!displayMenu)
    }

    const deleteCookie = () => {
        Cookies.remove("PP_playerData")
    }

    // RENDER
    return (
        <Flex
            as="nav"
            position="relative"
            // bg={colorMode === 'dark' ? 'gray.800' : 'white'}
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
                            alt="Planetary Pirates Logo"
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

            <Box alignItems="center" display={{ base: "none", md: "flex" }}>
                <SettingsMenu />

                <Button bg="transparent" onClick={onOpen}>
                    Game Rules
                </Button>
                <Link href="/">
                    <Button bg="transparent" onClick={deleteCookie}>
                        Leave Game
                    </Button>
                </Link>
                <GameRulesDrawer
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Box>
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={toggleMenu}
                icon={displayMenu ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={displayMenu ? "Close menu" : "Open menu"}
            />
            {/* <Button
          onClick={toggleColorMode}
          ml={2}
          colorScheme={colorMode === 'dark' ? 'yellow' : 'gray'}
        >
          {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button> */}

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
                        href="/gameRules"
                        display="block"
                        my={2}
                        onClick={toggleMenu}
                    >
                        Game Rules
                    </Link>
                </Box>
            </Collapse>
        </Flex>
    )
}
export default Navbar
