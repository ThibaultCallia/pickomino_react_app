import { QuestionOutlineIcon, DeleteIcon } from "@chakra-ui/icons"
import {
    Box,
    Flex,
    Spacer,
    Button,
    Link,
    IconButton,
    Tooltip,
    Image,
    useDisclosure,
} from "@chakra-ui/react"
import Cookies from "js-cookie"

import { GameRulesDrawer } from "../GameRulesDrawer"

import { type NavbarProps } from "./"

const Navbar = ({ game }: NavbarProps): JSX.Element => {
    // HOOKS

    const { isOpen, onOpen, onClose } = useDisclosure()

    // FUNCTIONS
    const deleteCookie = (): void => {
        Cookies.remove("PP_playerData")
    }

    // RENDER
    return (
        <Flex
            as="nav"
            position="relative"
            boxShadow="md"
            px={4}
            py={2}
            alignItems="center"
            minH={"58px"}
        >
            <Box>
                <Link href="/" fontWeight="bold" fontSize="xl">
                    <Flex alignItems="center">
                        <Image
                            src="./PP_mini_logo.svg"
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

            {game && (
                <Flex alignItems="center">
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
                        <Tooltip label="Game rules">
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
            )}
        </Flex>
    )
}
export default Navbar
