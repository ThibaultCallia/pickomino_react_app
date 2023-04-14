import {
    Box,
    Collapse,
    Text,
    Image,
    Tooltip,
    useToast,
    useDisclosure,
    Center,
} from "@chakra-ui/react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { PlainPlayer } from "../../store/Players/Player.types"
import { Tile } from "../Tile"
import { EndTurnModal } from "../EndTurnModal"
import { totalDiceValue } from "../../helpers"
import { stealTile, nextPlayerTurn } from "../../store/Game/gameSlice"

function PlayerCard({ name, collectedTiles, id }: PlainPlayer) {
    // USE STATES
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const selectedDice =
        useSelector(
            (state: RootState) =>
                state.game.playerArray[state.game.currentPlayersTurn]
                    ?.currentlySelectedDice
        ) || []
    const currentPlayerId = useSelector(
        (state: RootState) =>
            state.game.playerArray[state.game.currentPlayersTurn]?.id
    )
    const currentDiceRoll =
        useSelector(
            (state: RootState) =>
                state.game.playerArray[state.game.currentPlayersTurn]
                    ?.currentDiceRoll
        ) || []
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const toast = useToast()
    const toastId = "stealError"

    // FUNCTIONS
    const stealPlayerTile = (toStealPlayerId: string, tileValue: number) => {
        if (currentDiceRoll.length !== 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    title: "You must choose a die ",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    id: toastId,
                    variant: "subtle",
                })
            }
        } else if (toStealPlayerId !== currentPlayerId) {
            if (totalDiceValue(selectedDice) === tileValue) {
                toast.close(toastId)
                dispatch(stealTile(toStealPlayerId))
                onOpen()
            } else {
                if (!toast.isActive(toastId)) {
                    toast({
                        title: "You can't steal that tile",
                        description:
                            "You need to roll the exact same value to steal that tile",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        id: toastId,
                        variant: "subtle",
                    })
                }
            }
        }

        // small error message next to tile if no
    }
    // RENDER
    return (
        <>
            <Center
                flexDir={"column"}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                textAlign="center"
                position="relative"
            >
                <Box
                    boxSize={5}
                    bgColor="yellow.500"
                    position="absolute"
                    top={-2}
                    right={-2}
                    borderRadius="100%"
                    display={"grid"}
                    placeItems="center"
                >
                    <Text fontSize="xs" color="white" fontWeight={"bold"}>
                        {collectedTiles.length}
                    </Text>
                </Box>

                <Text fontWeight="bold">{name}</Text>
                <Text fontWeight="bold">{id}</Text>

                <Collapse in={isHovered}>
                    {/* <Image  mx = "auto" boxSize="50px" mt={4} src="/PP_mini_logo.png" borderRadius="lg" /> */}
                    {/* <Text> */}
                    {/*     latest tile value:{" "} */}
                    {/*     {collectedTiles[collectedTiles.length - 1]?.value} */}
                    {/* </Text> */}

                    {collectedTiles.length > 0 && (
                        <Tile
                            {...collectedTiles[collectedTiles.length - 1]}
                            onTileClick={() =>
                                stealPlayerTile(
                                    id,
                                    collectedTiles[collectedTiles.length - 1]
                                        .value
                                )
                            }
                        ></Tile>
                    )}
                </Collapse>
            </Center>
            <EndTurnModal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    dispatch(nextPlayerTurn())
                }}
                title="End of turn"
            >
                Well done. Next player plays.
            </EndTurnModal>
        </>
    )
}

export default PlayerCard
