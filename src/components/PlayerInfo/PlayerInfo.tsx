import { SimpleGrid } from "@chakra-ui/react"
import { PlayerCard } from "../PlayerCard"

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import socket from "../../socket"

function PlayerInfo() {
    // HOOKS
    const otherPlayers = useSelector((state: RootState) => state.game).playerArray.filter(player=>player.id !== socket.id);
    

    // RENDER
    return (
        <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            mt={4}
        >
            {otherPlayers.map((player, index) => {
                return <PlayerCard key={index} {...player} />
            })}
        </SimpleGrid>
    )
}

export default PlayerInfo
