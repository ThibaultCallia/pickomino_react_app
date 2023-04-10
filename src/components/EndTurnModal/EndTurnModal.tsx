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
import { EndTurnModalProps } from "./"

const EndTurnModal: React.FC<EndTurnModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    return (
        <Modal
            isCentered={false}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay bg="blackAlpha.500" />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        End Turn
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EndTurnModal
