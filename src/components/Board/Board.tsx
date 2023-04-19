import { Tile } from "../Tile"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SimpleGrid, useDisclosure, useMediaQuery, useToast } from "@chakra-ui/react"
import { takeTile, nextPlayerTurn } from "../../store/Game/gameSlice"
import { totalDiceValue, includesRocket } from "../../helpers"
import { EndTurnModal } from "../EndTurnModal"
import socket from "../../socket"
import { useGameSocketContext } from "../../contexts"

const Board = () => {
    // HOOKS
    const gameState = useSelector((state: RootState) => state.game)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const currentPlayer = useSelector(
        (state: RootState) => state.game.currentPlayersTurn
    )
    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    const isCurrentUserPlaying =
        socket.id === currentPlayerId && gameStatus === "playing"
    const selectedDice =
        useSelector(
            (state: RootState) => state.game.dice.currentlySelectedDice
        ) || []
    const toast = useToast()
    const rocketToastId = "rocketToast"
    const diceToastId = "diceToast"
    const currentDiceRoll = useSelector(
        (state: RootState) => state.game.dice.currentDiceRoll
    )
    const { sendPlayerAction } = useGameSocketContext()
    const [isMobile] = useMediaQuery("(max-width: 560px)")

    //   FUNCTIONS
    const onTileClick = (tileValue: number) => {
        if (!isCurrentUserPlaying) {
            if (!toast.isActive(rocketToastId)) {
                toast({
                    title: "Wait for your turn",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    id: rocketToastId,
                    variant: "subtle",
                })
            }
            return
        }
        if (currentDiceRoll.length !== 0) {
            if (!toast.isActive(rocketToastId)) {
                toast({
                    title: "You must choose a die ",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    id: rocketToastId,
                    variant: "subtle",
                })
            }
            return
        }

        if (!includesRocket(selectedDice)) {
            if (!toast.isActive(rocketToastId)) {
                toast({
                    title: "You must select a rocket to take a tile",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    id: rocketToastId,
                    variant: "subtle",
                })
            }
            return
        }

        if (totalDiceValue(selectedDice) < tileValue) {
            if (!toast.isActive(diceToastId)) {
                toast({
                    title: "Not enough dice ",
                    description:
                        "You must roll at least the same value as the tile you want to take",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    id: diceToastId,
                    variant: "subtle",
                })
            }
            return
        }

        dispatch(takeTile(tileValue))
        sendPlayerAction("takeTile", tileValue)
        toast.close(rocketToastId)
        toast.close(diceToastId)
        onOpen()
    }

    // RENDER
    return (
        <>
            <SimpleGrid columns={isMobile ? 4 : 8} spacing={6} placeItems="center" placeSelf={"center"}>
                {gameState.tilesArray.map((tile, index) => {
                    return (
                        <Tile
                            onTileClick={() => onTileClick(tile.value)}
                            key={index}
                            {...tile}
                        />
                    )
                })}
            </SimpleGrid>
            <EndTurnModal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    dispatch(nextPlayerTurn())
                    sendPlayerAction("nextPlayerTurn", null)
                }}
                title="End of turn"
            >
                Well done. Next player plays.
            </EndTurnModal>
        </>
    )
}
export default Board
