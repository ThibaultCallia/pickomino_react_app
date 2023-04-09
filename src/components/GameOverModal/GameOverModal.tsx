import { Text, Box, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"
import { GameOverModalProps } from "./";
import { totalPlanetsCollected } from "../../helpers";

const GameOverModal = ({isOpen, onClose}: GameOverModalProps) => {
    const playerArray = useSelector((state: RootState) => state.game.playerArray)
    const sortedPlayers = [...playerArray].sort((a, b) => totalPlanetsCollected(b.collectedTiles) - totalPlanetsCollected(a.collectedTiles));
  

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">Winner!</ModalHeader>
            <ModalBody>
              {sortedPlayers.map((player, index) => (
                <Box key={player.id} textAlign="center" mb={3}>
                  {index === 0 && (
                    <>
                      <Text fontSize="3xl" fontWeight="bold" color="yellow.400">{player.name}</Text>
                      <Image src="./game_art/planetary_pirates_art.jpg" alt="Winner" height="100px" mx="auto" mb={2} />
                    </>
                  )}
                  {index > 0 && <Text fontSize="xl" fontWeight="bold">{player.name}</Text>}
                  <Text fontSize="md" fontStyle="italic">Points: {totalPlanetsCollected(player.collectedTiles)}</Text>
                </Box>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      );
    
  }
  
  export default GameOverModal
  
