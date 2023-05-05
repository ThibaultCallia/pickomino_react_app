import {
    Text,
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Image,
    ModalFooter,
    Button,
    Link,
} from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"

import { totalPlanetsCollected } from "../../helpers"
import { type RootState } from "../../store"

import { type GameOverModalProps } from "./"

const GameOverModal = ({
    isOpen,
    onClose,
}: GameOverModalProps): JSX.Element => {
    const playerArray = useSelector(
        (state: RootState) => state.game.playerArray
    )
    const sortedPlayers = [...playerArray].sort(
        (a, b) =>
            totalPlanetsCollected(b.collectedTiles) -
            totalPlanetsCollected(a.collectedTiles)
    )

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Winner!
                </ModalHeader>
                <ModalBody>
                    {sortedPlayers.map((player, index) => (
                        <Box key={player.id} textAlign="center" mb={3}>
                            {index === 0 && (
                                <>
                                    <Text
                                        fontSize="3xl"
                                        fontWeight="bold"
                                        color="yellow.400"
                                    >
                                        {player.name}
                                    </Text>
                                    <Image
                                        src={`./game_art/characters/character_${player.image}.jpg`}
                                        alt="Winner"
                                        height="100px"
                                        mx="auto"
                                        mb={2}
                                    />
                                </>
                            )}
                            {index > 0 && (
                                <Text fontSize="xl" fontWeight="bold">
                                    {player.name}
                                </Text>
                            )}
                            <Text fontSize="md" fontStyle="italic">
                                Points:{" "}
                                {totalPlanetsCollected(player.collectedTiles)}
                            </Text>
                        </Box>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Link href="/">
                        <Button
                            colorScheme="yellow"
                            mr={3}
                            onClick={() => {
                                Cookies.remove("PP_playerData")
                            }}
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
    )
}

export default GameOverModal
