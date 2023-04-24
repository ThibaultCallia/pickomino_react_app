import { useContext } from "react"
import { DisconnectedPlayerContext } from "../../contexts"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Center,
    Box,
    Text,
    Button,
    Link,
    ModalFooter,
} from "@chakra-ui/react"
import Cookies from "js-cookie"

const DisconnectedPlayer = () => {
    const { showWaitingScreen } = useContext(DisconnectedPlayerContext)
    const deleteCookie = () => {
        Cookies.remove("PP_playerData")
    }

    return (
        <>
            <Modal
                isOpen={showWaitingScreen}
                onClose={() => {}}
                closeOnOverlayClick={false}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Player Disconnected</ModalHeader>
                    <ModalBody>
                        <Center>
                            <Box>
                                <Text>
                                    A player has disconnected. Please wait for
                                    them to reconnect or leave the game.
                                </Text>
                            </Box>
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Link href="/">
                            <Button
                                colorScheme="yellow"
                                mr={3}
                                onClick={deleteCookie}
                                borderRadius={2}
                                border={"1px solid black"}
                                boxShadow="2px 2px 0 black"
                            >
                                Leave Game
                            </Button>
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DisconnectedPlayer
