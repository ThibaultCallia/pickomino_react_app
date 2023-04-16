import {
    Box,
    Button,
    SimpleGrid,
    Stack,
    Tag,
    useDisclosure,
    useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import {
    rollDice,
    canSelect,
    hasSelectableDice,
    totalDiceValue,
    finalRollFailed,
} from "../../helpers"
import { Die } from "../Die"
import { CustomButton } from "../CustomButton"
import {
    nextPlayerTurn,
    addSelectedDice,
    resetSelectedDice,
    setCurrentDiceRoll,
    resetCurrentDiceRoll,
    returnTile,
} from "../../store/Game/gameSlice"
import { useDispatch, useSelector } from "react-redux"
import { DieInterface } from "../Die"
import { RootState } from "../../store"
import EndTurnModal from "../EndTurnModal/EndTurnModal"
import socket from "../../socket"
import { useGameSocketContext } from "../../contexts"


const RollDice = () => {
    // HOOKS
    const [rollDisabled, setRollDisabled] = useState<boolean>(false)
    const [selectDisabled, setSelectDisabled] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const toastId = "selectError"
    const dispatch = useDispatch()
    const currentPlayer = useSelector(
        (state: RootState) => state.game.currentPlayersTurn
    )
    // NOT SURE IF LOWEST TILE IS AVAILABLE
    const lowestTileOnBoard = useSelector(
        (state: RootState) => state.game.tilesArray[0].value
    )
    const showDiceTotal = useSelector(
        (state: RootState) => state.game.settings.selectedDiceTotal
    )
    const selectedDice =
        useSelector(
            (state: RootState) =>
                state.game.dice.currentlySelectedDice)
        
    const currentDiceRoll =
        useSelector(
            (state: RootState) =>
                state.game.dice.currentDiceRoll
        )
    
    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    const isCurrentUserPlaying =
        socket.id === currentPlayerId && gameStatus === "playing"
    const { sendPlayerAction } = useGameSocketContext();
    
    console.log('Component rendered');

    // USE EFFECTS
    useEffect(() => {
        if (
            currentDiceRoll.length > 0 &&
            !hasSelectableDice(selectedDice, currentDiceRoll)
        ) {
            dispatch(returnTile())
            onOpen()
            return
        }
        // ADD CHECK WHETHER OTHER PLAYERS TILES ARE AVAILABLE TO STEAL
        if (
            currentDiceRoll.length > 0 &&
            finalRollFailed(selectedDice, currentDiceRoll, lowestTileOnBoard)
        ) {
            dispatch(returnTile())
            onOpen()
            return
        }
    }, [currentDiceRoll])

    useEffect(() => {
        dispatch(resetCurrentDiceRoll())
        dispatch(resetSelectedDice())
        setRollDisabled(false)
        setSelectDisabled(true)
    }, [currentPlayer])

    useEffect(() => {
        if (selectedDice.length > 0 && selectedDice.length < 8) {
            setRollDisabled(false)
        }
    }, [selectedDice])

    // FUNCTIONS
    const onRollClick = () => {
        setRollDisabled(true)
        const dice = rollDice(8 - selectedDice.length)

        dispatch(setCurrentDiceRoll(dice))
        sendPlayerAction("rollDice", dice)
    }

    const highlightDice = (value: string) => {
        setSelectDisabled(false)
        dispatch(
            setCurrentDiceRoll(
                currentDiceRoll.map((die) => {
                    if (die.face === value) {
                        return { ...die, selected: true }
                    }
                    return { ...die, selected: false }
                })
            )
        )
    }

    const selectDice = () => {
        if (!canSelect(selectedDice, currentDiceRoll)) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: "You can't select that die",
                    description: "You already have a die with that value",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    variant: "subtle",
                })
            }
            return
        }
        toast.close(toastId)
        setSelectDisabled(true)
        const diceSelection = currentDiceRoll.reduce(
            (acc: DieInterface[], die) => {
                if (die.selected) {
                    acc.push({ ...die, selected: false })
                }
                return acc
            },
            []
        )

        dispatch(addSelectedDice(diceSelection))
        dispatch(setCurrentDiceRoll([]))
            console.log("diceSelection", diceSelection);
        sendPlayerAction("selectDice", diceSelection)
        sendPlayerAction("rollDice", [])
    }

    // RENDER
    return (
        <>
            <Box borderWidth="4px" borderRadius="lg" maxW={"100%"}>
                <Box
                    p="6"
                    display="flex"
                    gap="10px"
                    justifyContent="space-between"
                >
                    <Box flex={1} minWidth="175px" minHeight="250">
                        {showDiceTotal && (
                            <Tag
                                size="md"
                                variant="solid"
                                color="black"
                                bgColor="yellow.400"
                                mb="1rem"
                            >
                                Dice total: {totalDiceValue(selectedDice)}
                            </Tag>
                        )}

                        <SimpleGrid columns={2} spacing={3}>
                            {selectedDice.length > 0 &&
                                selectedDice.map(
                                    (die: DieInterface, index: number) => {
                                        return (
                                            <Die
                                                selected={die.selected}
                                                key={index}
                                                die={die.face}
                                            ></Die>
                                        )
                                    }
                                )}
                        </SimpleGrid>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        minWidth="200px"
                        minHeight="250"
                    >
                        <Stack
                            justify="center"
                            width="100%"
                            height="100%"
                            direction="column"
                        >
                            <CustomButton
                                isDisabled={
                                    rollDisabled || !isCurrentUserPlaying
                                }
                                onClick={onRollClick}
                            >
                                Roll
                            </CustomButton>
                            <Box flex={1}>
                                <SimpleGrid columns={4} spacing={3}>
                                    {currentDiceRoll.length > 0 &&
                                        currentDiceRoll.map(
                                            (
                                                die: DieInterface,
                                                index: number
                                            ) => {
                                                return (
                                                    <Die
                                                        selected={die.selected}
                                                        onClick={() =>
                                                            highlightDice(
                                                                die.face
                                                            )
                                                        }
                                                        key={index}
                                                        die={die.face}
                                                    />
                                                )
                                            }
                                        )}
                                </SimpleGrid>
                            </Box>
                            <CustomButton
                                isDisabled={
                                    selectDisabled || !isCurrentUserPlaying
                                }
                                onClick={selectDice}
                            >
                                Select
                            </CustomButton>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <EndTurnModal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    dispatch(nextPlayerTurn())
                }}
                title="Your turn is over"
            >
                One gamble too far. You have no selectable dice left. Your turn
                is over.
            </EndTurnModal>
        </>
    )
}

export default RollDice
