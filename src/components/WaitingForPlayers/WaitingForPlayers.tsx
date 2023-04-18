import { Text, Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

function WaitingForPlayers() {
    const playersJoined = useSelector(
        (state: RootState) => state.room.playersJoined
    )
    const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers)
    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold">
                Waiting for players...
            </Text>
            <Text fontSize="lg">
                {playersJoined}/{maxPlayers} players joined
            </Text>
        </Box>
    )
}

export default WaitingForPlayers
