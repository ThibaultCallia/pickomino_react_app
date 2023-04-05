import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"

interface GameOverModalProps {
    isOpen: boolean
    onClose: () => void
}

function GameOverModal({ isOpen, onClose }: GameOverModalProps) {
    return (
        <Modal
            isCentered
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
                <ModalHeader>Your turn is over</ModalHeader>

                <ModalBody>
                    One gamble too far. You have no selectable dice left. Your
                    turn is over.
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        End Turn
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GameOverModal
