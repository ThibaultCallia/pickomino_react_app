import {
    Box,
    Collapse,
    Text,
    Image,
    Tooltip,
    useToast,
    useDisclosure,
    Center,
    Flex,
    Heading,
    HStack,
    Img,
    useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { PlainPlayer } from "../../store/Players/Player.types"
import { Tile } from "../Tile"
import { EndTurnModal } from "../EndTurnModal"
import { totalDiceValue } from "../../helpers"
import { stealTile, nextPlayerTurn } from "../../store/Game/gameSlice"
import { useGameSocketContext } from "../../contexts"
import { PlayerCardProps } from "./"

function PlayerCard({ player }: PlayerCardProps) {
    const { name, collectedTiles, id, image } = player
    // USE STATES
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const selectedDice =
        useSelector(
            (state: RootState) => state.game.dice.currentlySelectedDice
        ) || []
    const currentPlayerId = useSelector(
        (state: RootState) => state.game.currentPlayerId
    )
    const currentDiceRoll =
        useSelector((state: RootState) => state.game.dice.currentDiceRoll) || []
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const toast = useToast()
    const toastId = "stealError"
    const { sendPlayerAction, endTurn } = useGameSocketContext()

    const hoverStyles =
        collectedTiles.length > 0
            ? {
                  _hover: {
                      ".card-image": { display: "none" },
                      ".card-tile": { display: "flex" },
                  },
              }
            : {}

    // FUNCTIONS
    const stealPlayerTile = (toStealPlayerId: string, tileValue: number) => {
        if (toStealPlayerId !== currentPlayerId) {
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
                return
            }

            if (totalDiceValue(selectedDice) !== tileValue) {
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
                return
            }
            toast.close(toastId)
            dispatch(stealTile(toStealPlayerId))
            sendPlayerAction("stealTile", toStealPlayerId)

            onOpen()
        }

        // small error message next to tile if no
    }
    // RENDER
    return (
        <>
            <Box cursor={"pointer"} display="flex" minW={"6rem"} mr={2}>
                <Box
                    rounded={"sm"}
                    my={2}
                    overflow={"hidden"}
                    bg="white"
                    border={"1px"}
                    borderColor="black"
                    boxShadow={useColorModeValue(
                        "3px 3px 0 black",
                        "4px 4px 0 cyan"
                    )}
                    display="flex"
                    flexDirection="row"
                    {...hoverStyles}
                >
                    <Box p={2}>
                        <Box
                            bg="yellow.500"
                            display={"inline-block"}
                            px={2}
                            py={1}
                            color="white"
                            mb={2}
                        >
                            <Text fontSize={"xs"} fontWeight="medium">
                                {`${collectedTiles.length} ${
                                    collectedTiles.length === 1
                                        ? "tile"
                                        : "tiles"
                                }`}
                            </Text>
                        </Box>
                        <Heading
                            h="2.5rem"
                            w={"6rem"}
                            color={"black"}
                            fontSize={"sm"}
                            noOfLines={2}
                        >
                            {name}
                        </Heading>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"center"}
                    >
                        <Box className="card-image" h="full" w="60px">
                            <Img
                                src={`/game_art/characters/character_${image}.jpg`}
                                // roundedTop={"sm"}
                                objectFit="cover"
                                alt={"Image"}
                                h="full"
                                w="60px"
                            />
                        </Box>
                        <Box className="card-tile" display={"none"}>
                            {collectedTiles.length > 0 && (
                                <Tile
                                    {...collectedTiles[
                                        collectedTiles.length - 1
                                    ]}
                                    onTileClick={() =>
                                        stealPlayerTile(
                                            id,
                                            collectedTiles[
                                                collectedTiles.length - 1
                                            ].value
                                        )
                                    }
                                ></Tile>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
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

export default PlayerCard
