import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    SimpleGrid,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react"
import { PlayerCard } from "../PlayerCard"

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import socket from "../../socket"
import { useGameSocketContext } from "../../contexts"

function PlayerInfo() {
    // HOOKS
    const { returnMyPlayerId } = useGameSocketContext()

    const otherPlayers = useSelector(
        (state: RootState) => state.game
    ).playerArray.filter((player) => player.id !== returnMyPlayerId())
    console.log(`myPlayerId: ${returnMyPlayerId()}`)
    console.log(`otherPlayers: ${otherPlayers}`)

    const [isMobile] = useMediaQuery("(max-width: 715px)")
    const { isOpen, onOpen, onClose } = useDisclosure()

    // RENDER
    return (
        <>
            {isMobile ? (
                <>
                    <Button mt={3} colorScheme="yellow" onClick={onOpen}>
                        Show Players
                    </Button>
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>Players</DrawerHeader>
                            <DrawerBody>
                                <SimpleGrid
                                    spacing={1}
                                    columns={1}
                                    alignItems="flex-start"
                                >
                                    {otherPlayers.map((player, index) => {
                                        return (
                                            <PlayerCard
                                                key={index}
                                                player={player}
                                            />
                                        )
                                    })}
                                </SimpleGrid>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button
                                    variant="outline"
                                    colorScheme={"yellow"}
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
            ) : (
                <SimpleGrid
                    spacing={1}
                    columns={3}
                    alignItems="flex-start"
                    mt={4}
                >
                    {otherPlayers.map((player, index) => {
                        return <PlayerCard key={index} player={player} />
                    })}
                </SimpleGrid>
            )}
        </>
    )
}

export default PlayerInfo
