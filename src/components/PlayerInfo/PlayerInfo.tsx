import { SimpleGrid } from "@chakra-ui/react"
import { PlayerCard } from "../PlayerCard"

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import socket from "../../socket"

function PlayerInfo() {
    // HOOKS
    const otherPlayers = useSelector(
        (state: RootState) => state.game
    ).playerArray.filter((player) => player.id !== socket.id)

    // RENDER
    return (
        <SimpleGrid spacing={1} columns={3} alignItems="flex-start" mt={4}>
            {otherPlayers.map((player, index) => {
                return <PlayerCard key={index} {...player} />
            })}
        </SimpleGrid>
    )
}

export default PlayerInfo
