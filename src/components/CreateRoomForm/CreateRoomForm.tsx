// Import necessary components and hooks
import { FormEvent, useState, ChangeEvent } from "react"
import { Box, FormControl, Button, Select, Flex, Input } from "@chakra-ui/react"
import { CreateRoomFormProps } from "."
import { useGameSocket } from "../../hooks"
import { useDispatch } from "react-redux"

const CreateRoomForm = ({ setNumOfPlayers }: CreateRoomFormProps) => {
    // HOOKS
    const [num, setNum] = useState<string>("")
    const [roomPass, setRoomPass] = useState<string>("")
    const [roomName, setRoomName] = useState<string>("")
    const dispatch = useDispatch()
    const { createRoom } = useGameSocket(dispatch)

    // FUNCTIONS
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (num && roomName && roomPass) {
            // onSubmit(parseInt(num), roomName, roomPass)
            createRoom(roomName, roomPass, parseInt(num)).then((roomCode) => {
                if (roomCode) {
                    setNumOfPlayers(parseInt(num))
                    console.log("success", `room code: ${roomCode}`)
                } else {
                    console.log("error")
                }
            })
        }
    }

    // RENDER
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                {/* Alternatively work with mr on input field? */}
                <Flex gap="10px">
                    <FormControl isRequired id="numOfPlayersForm" mt={4}>
                        {/* <FormLabel>How many players? </FormLabel> */}
                        <Select
                            placeholder="How many players?"
                            value={num}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setNum(e.target.value)
                            }}
                        >
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </Select>
                        <Input
                            placeholder="room name"
                            value={roomName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRoomName(e.target.value)
                            }}
                        />
                        <Input
                            placeholder="password"
                            value={roomPass}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRoomPass(e.target.value)
                            }}
                        />
                    </FormControl>

                    <Button mt={4} colorScheme="yellow" type="submit">
                        Create Room
                    </Button>
                </Flex>
            </form>
        </Box>
    )
}

export default CreateRoomForm
