import {
    Box,
    Button,
    Center,
    Flex,
    SimpleGrid,
    Stack,
    Tag,
    useBreakpointValue,
    useDisclosure,
    useToast,
    Text,
    StackDivider,
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

    // NOT SURE IF LOWEST TILE IS AVAILABLE
    const lowestTileOnBoard = useSelector(
        (state: RootState) => state.game.tilesArray[0].value
    )
    const showDiceTotal = useSelector(
        (state: RootState) => state.game.settings.selectedDiceTotal
    )
    const selectedDice = useSelector(
        (state: RootState) => state.game.dice.currentlySelectedDice
    )

    const currentDiceRoll = useSelector(
        (state: RootState) => state.game.dice.currentDiceRoll
    )

    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus)
    const isCurrentUserPlaying =
        socket.id === currentPlayerId && gameStatus === "playing"
    const { sendPlayerAction } = useGameSocketContext()
    console.log("rolldice rendering")
    console.log("currenPlayerId: ", currentPlayerId)
    console.log("socket.id: ", socket.id)

    // const buttonSize = useBreakpointValue({ base: "sm", md: "lg", lg: "lg" })

    const diceAreaWidth = "190px"
    const diceAreaHeight = "95px"
    // USE EFFECTS
    useEffect(() => {
        if (
            currentDiceRoll.length > 0 &&
            !hasSelectableDice(selectedDice, currentDiceRoll) &&
            isCurrentUserPlaying
        ) {
            console.log("LVL1")
            dispatch(returnTile())
            sendPlayerAction("returnTile", null)
            onOpen()
            return
        }
        // ADD CHECK WHETHER OTHER PLAYERS TILES ARE AVAILABLE TO STEAL
        if (
            currentDiceRoll.length > 0 &&
            finalRollFailed(selectedDice, currentDiceRoll, lowestTileOnBoard) &&
            isCurrentUserPlaying
        ) {
            console.log("LVL2")
            dispatch(returnTile())
            sendPlayerAction("returnTile", null)
            onOpen()
            return
        }
    }, [currentDiceRoll])

    useEffect(() => {
        dispatch(resetCurrentDiceRoll())
        dispatch(resetSelectedDice())
        sendPlayerAction("resetSelectedDice", null)
        sendPlayerAction("resetCurrentDiceRoll", null)
        setRollDisabled(false)
        setSelectDisabled(true)
    }, [currentPlayerId])

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
        console.log("diceSelection", diceSelection)
        sendPlayerAction("selectDice", diceSelection)
        sendPlayerAction("rollDice", [])
    }

    // RENDER
    return (
        <>
            <Box 
                borderWidth="4px" 
                borderRadius="lg" p={4}
            >
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    justify="center"
                    gap={4}
                >
                    <Box
                        p={2}
                        borderRadius="lg"
                        // border="2px solid blue"
                    >
                        <Center>
                            <Text fontWeight="bold">Selected Dice</Text>
                        </Center>

                        <Center>
                            <Box
                                my={2}
                                // border = {"1px solid green"}
                                width={diceAreaWidth}
                                height={diceAreaHeight}
                            >
                                <SimpleGrid columns={4} spacing={2}>
                                    {selectedDice.length > 0 &&
                                        selectedDice.map(
                                            (
                                                die: DieInterface,
                                                index: number
                                            ) => (
                                                <Die
                                                    selected={die.selected}
                                                    key={index}
                                                    die={die.face}
                                                />
                                            )
                                        )}
                                </SimpleGrid>
                            </Box>
                        </Center>
                        <Center>
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
                        </Center>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        // minWidth={{ base: "100%", md: "200px" }}
                        p={2}
                        // border = "2px solid blue"
                        borderRadius="lg"
                    >
                        <Center>
                            <Text fontWeight="bold">Current Roll</Text>
                        </Center>

                        <Box
                            my={2}
                            // border={"1px solid green"}
                            width={diceAreaWidth}
                            height={diceAreaHeight}
                        >
                            <SimpleGrid columns={4} spacing={"10px"}>
                                {currentDiceRoll.length > 0 &&
                                    currentDiceRoll.map(
                                        (die: DieInterface, index: number) => (
                                            <Die
                                                selected={die.selected}
                                                onClick={() =>
                                                    highlightDice(die.face)
                                                }
                                                key={index}
                                                die={die.face}
                                            />
                                        )
                                    )}
                            </SimpleGrid>
                        </Box>

                        <Center>
                            <Stack
                                direction={"row"}
                                spacing={4}
                                align="center"
                                mt={4}
                            >
                                <CustomButton
                                    size="lg"
                                    isDisabled={
                                        selectDisabled || !isCurrentUserPlaying
                                    }
                                    onClick={selectDice}
                                >
                                    Select
                                </CustomButton>
                                <CustomButton
                                    size="lg"
                                    isDisabled={
                                        rollDisabled || !isCurrentUserPlaying
                                    }
                                    onClick={onRollClick}
                                >
                                    Roll
                                </CustomButton>
                            </Stack>
                        </Center>
                    </Box>
                </Flex>
            </Box>
            <EndTurnModal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    dispatch(nextPlayerTurn())
                    sendPlayerAction("nextPlayerTurn", null)
                    // Are you the current player? Otherwise you can't end your turn
                    // if(isCurrentUserPlaying){
                    //     dispatch(nextPlayerTurn())
                    //     // sendPlayerAction("nextPlayerTurn", null)
                    // }
                }}
                title={
                    isCurrentUserPlaying
                        ? "Your turn is over"
                        : "Player's turn is over"
                }
            >
                {isCurrentUserPlaying
                    ? "One gamble too far. You have no selectable dice left. Your turn is over."
                    : "The current player has no selectable dice left. Their turn is over."}
            </EndTurnModal>
        </>
    )
}

export default RollDice
