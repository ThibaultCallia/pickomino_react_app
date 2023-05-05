import { Stack, Text, Box, Flex } from "@chakra-ui/react"
import { useSelector } from "react-redux"

import { useGameSocketContext } from "../../contexts"
import { type RootState } from "../../store"
import { Board } from "../Board"
import { PlayerInfo } from "../PlayerInfo"
import { RollDice } from "../RollDice"

function GamePlay(): JSX.Element {
    // HOOKS

    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )

    const currentPlayerName = useSelector(
        (state: RootState) =>
            state.game.playerArray.find(
                (player) => player.id === currentPlayerId
            )?.name
    )
    const { isMyTurn } = useGameSocketContext()
    // FUNCTIONS

    // RENDER
    return (
        <Flex flexDirection={"column"} gap={"5rem"}>
            <PlayerInfo />
            <Board />
            <Stack spacing={2}>
                <Box
                    backgroundColor={"hsl(46, 83%, 61%)"}
                    mb={3}
                    borderRadius={2}
                >
                    <Text
                        fontWeight={"bolder"}
                        textAlign="center"
                        fontSize={"xl"}
                    >
                        {`${
                            isMyTurn()
                                ? "Your"
                                : `${currentPlayerName}'${
                                      currentPlayerName?.slice(-1) === "s"
                                          ? ""
                                          : "s"
                                  }`
                        } turn`}
                    </Text>
                </Box>
                <RollDice />
            </Stack>
        </Flex>
    )
}

export default GamePlay
