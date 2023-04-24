import {
    Box,
    Center,
    Flex,
    SimpleGrid,
    Stack,
    Tag,
    useDisclosure,
    useToast,
    Text,
    useMediaQuery,
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

import { PlayerCard } from "../PlayerCard"

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
    console.log(JSON.stringify(selectedDice))

    const currentDiceRoll = useSelector(
        (state: RootState) => state.game.dice.currentDiceRoll
    )

    const { sendPlayerAction, endTurn, isMyTurn, returnMyPlayerId } =
        useGameSocketContext()

    const yourInfo = useSelector((state: RootState) =>
        state.game.playerArray.find(
            (player) => player.id === returnMyPlayerId()
        )
    )
    const [isMobile] = useMediaQuery("(max-width: 715px)")

    const diceAreaWidth = "190px"
    const diceAreaHeight = "95px"

    // USE EFFECTS
    useEffect(() => {
        if (
            currentDiceRoll.length > 0 &&
            !hasSelectableDice(selectedDice, currentDiceRoll) &&
            isMyTurn()
        ) {
            dispatch(returnTile())
            sendPlayerAction("returnTile", null)
            onOpen()

            return
        }
        // ADD CHECK WHETHER OTHER PLAYERS TILES ARE AVAILABLE TO STEAL
        if (
            currentDiceRoll.length > 0 &&
            finalRollFailed(selectedDice, currentDiceRoll, lowestTileOnBoard) &&
            isMyTurn()
        ) {
            dispatch(returnTile())
            sendPlayerAction("returnTile", null)
            onOpen()
            return
        }
    }, [currentDiceRoll])

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
        if (!isMyTurn()) return
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

        sendPlayerAction("selectDice", diceSelection)
        sendPlayerAction("rollDice", [])
    }

    // RENDER
    return (
        <>
            <Box>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="center"
                    gap={4}
                    alignItems="stretch"
                >
                    <Flex justifyContent="center" flexDirection="column">
                        <Box p={2}>
                            <Center>
                                {yourInfo && <PlayerCard player={yourInfo} />}
                            </Center>
                        </Box>
                    </Flex>
                    <Box
                        p={2}
                        border={"1px"}
                        borderColor="black"
                        boxShadow="3px 3px 0 black"
                        backgroundImage={"./game_art/cloudsL.png"}
                        backgroundRepeat={"no-repeat"}
                        backgroundPosition={" center bottom"}
                        // change this to 70% for mobile
                        backgroundSize={isMobile ? "70%" : "90%"}
                        minH={"200px"}
                    >
                        <Center>
                            <Text fontWeight="bold">Selected Dice</Text>
                        </Center>

                        <Center>
                            <Box
                                my={2}
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
                            
                                <Tag
                                    size="md"
                                    variant="solid"
                                    color="black"
                                    bgColor="yellow.400"
                                    mb="1rem"
                                >
                                    Dice total: {totalDiceValue(selectedDice)}
                                </Tag>
                            
                        </Center>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        border={"1px"}
                        borderColor="black"
                        boxShadow="3px 3px 0 black"
                        p={2}
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
                                    isDisabled={selectDisabled || !isMyTurn()}
                                    onClick={selectDice}
                                >
                                    Select
                                </CustomButton>
                                <CustomButton
                                    size="lg"
                                    isDisabled={
                                        rollDisabled ||
                                        !isMyTurn() ||
                                        currentDiceRoll.length > 0
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
                    endTurn()
                    dispatch(nextPlayerTurn())
                    sendPlayerAction("nextPlayerTurn", null)
                    // endTurn();
                    // Are you the current player? Otherwise you can't end your turn
                    // if(isCurrentUserPlaying){
                    //     dispatch(nextPlayerTurn())
                    //     // sendPlayerAction("nextPlayerTurn", null)
                    // }
                }}
                title={
                    isMyTurn() ? "Your turn is over" : "Player's turn is over"
                }
            >
                {isMyTurn()
                    ? "One gamble too far. You have no selectable dice left. Your turn is over."
                    : "The current player has no selectable dice left. Their turn is over."}
            </EndTurnModal>
        </>
    )
}

export default RollDice
