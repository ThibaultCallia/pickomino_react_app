import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react"
import { EndTurnModalProps } from "./"


const EndTurnModal: React.FC<EndTurnModalProps> = ({isOpen, onClose, title, children}) =>{
    return (
        <Modal 
            isCentered 
            closeOnOverlayClick={false} 
            isOpen={isOpen} 
            onClose={onClose}
            >
                
        <ModalOverlay 
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          
          <ModalBody>
            {children}
          </ModalBody>
          

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              End Turn 
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  
  export default EndTurnModal
  
