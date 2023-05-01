import {
    SimpleGrid,
    useDisclosure,
    useMediaQuery,
    useToast,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"

import { useGameSocketContext } from "../../contexts"
import { totalDiceValue, includesRocket } from "../../helpers"
import { type RootState } from "../../store"
import { takeTile, nextPlayerTurn } from "../../store/Game/gameSlice"
import { EndTurnModal } from "../EndTurnModal"
import { Tile } from "../Tile"

const Board = () => {
    // HOOKS
    const gameState = useSelector((state: RootState) => state.game)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()

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
    const { sendPlayerAction, endTurn, isMyTurn } = useGameSocketContext()
    const [isMobile] = useMediaQuery("(max-width: 560px)")

    //   FUNCTIONS
    const onTileClick = (tileValue: number): void => {
        if (!isMyTurn()) {
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
            <SimpleGrid
                columns={isMobile ? 4 : 8}
                spacing={6}
                placeItems="center"
                placeSelf={isMobile ? "center" : "flex-start"}
            >
                {gameState.tilesArray.map((tile, index) => {
                    return (
                        <Tile
                            onTileClick={() => {
                                onTileClick(tile.value)
                            }}
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
                    endTurn()

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
