import React, { useState, useEffect } from "react"
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react"
import { EndTurnModalProps } from "./"

const EndTurnModal: React.FC<EndTurnModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    const [countdown, setCountdown] = useState(10)

    useEffect(() => {
        if (isOpen) {
            setCountdown(10)
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1)
            }, 1000)

            const closeTimer = setTimeout(() => {
                onClose()
            }, 10000)

            return () => {
                clearInterval(timer)
                clearTimeout(closeTimer)
            }
        }
    }, [isOpen, onClose])

    return (
        <Modal
            isCentered={true}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay bg="blackAlpha.500" />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>{children}</ModalBody>

                <Box p={2} position={"absolute"} right={3} top={2}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>
                        {countdown}
                    </Text>
                </Box>

                <ModalFooter>
                    <Button 
                        colorScheme="yellow" 
                        mr={3} 
                        onClick={onClose} 
                        borderRadius={2} 
                        border={"1px solid black"} 
                        boxShadow="2px 2px 0 black"
                        >
                        End Turn
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EndTurnModal
