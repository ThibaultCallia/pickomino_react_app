import { useState } from "react"
import {
    Box,
    Flex,
    Spacer,
    Button,
    Link,
    IconButton,
    useColorMode,
    Tooltip,
    Image,
    useDisclosure,
} from "@chakra-ui/react"
import {
    HamburgerIcon,
    CloseIcon,
    SearchIcon,
    QuestionOutlineIcon,
    QuestionIcon,
    DeleteIcon,
} from "@chakra-ui/icons"
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

            <Flex alignItems="center">
                {/* <SettingsMenu /> */}

                <Button
                    bg="transparent"
                    onClick={onOpen}
                    display={{ base: "none", md: "flex" }}
                    alignItems={"center"}
                >
                    Game Rules
                </Button>
                <Link href="/" display={{ base: "none", md: "flex" }}>
                    <Button bg="transparent" onClick={deleteCookie}>
                        Quit Game
                    </Button>
                </Link>
                <Flex display={{ base: "flex", md: "none" }} gap={4}>
                    <Tooltip label="Game rules" >
                        <IconButton
                            colorScheme="yellow"
                            aria-label="Search database"
                            icon={<QuestionOutlineIcon />}
                            rounded={"sm"}
                            onClick={onOpen}
                            border={"1px solid black"}
                            boxShadow="2px 2px 0 black"
                        />
                    </Tooltip>
                    <Tooltip label="Quit game">
                        <Link href="/">
                        <IconButton
                            
                            border={"1px solid black"}
                            boxShadow="2px 2px 0 black"
                            colorScheme="yellow"
                            aria-label="Search database"
                            icon={<DeleteIcon />}
                            rounded={"sm"}
                            onClick={deleteCookie}
                        />
                        </Link>
                    </Tooltip>
                </Flex>

                <GameRulesDrawer
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Flex>
            {/* <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={toggleMenu}
                icon={displayMenu ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={displayMenu ? "Close menu" : "Open menu"}
            /> */}

            {/* <Collapse in={displayMenu}>
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    zIndex={10}
                    p={4}
                    display={{ base: "block", md: "none" }}
                    bg={colorMode === "dark" ? "gray.700" : "gray.100"}
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
            </Collapse> */}
        </Flex>
    )
}
export default Navbar
