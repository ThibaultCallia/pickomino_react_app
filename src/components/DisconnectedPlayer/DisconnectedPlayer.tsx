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
} from "@chakra-ui/react"

const DisconnectedPlayer = () => {
    const { showWaitingScreen } = useContext(DisconnectedPlayerContext)

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
                                    them to reconnect...
                                </Text>
                            </Box>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DisconnectedPlayer
