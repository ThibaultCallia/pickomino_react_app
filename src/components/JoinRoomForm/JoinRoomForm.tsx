// Import necessary components and hooks
import { FormEvent, useState, ChangeEvent } from "react"
import { Box, FormControl, Button, Select, Flex, Input } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { useGameSocketContext } from "../../contexts"

const JoinRoomForm = () => {
    // HOOKS
    const [roomName, setRoomName] = useState<string>("")
    const [roomPass, setRoomPass] = useState<string>("")
    const dispatch = useDispatch()
    const { joinRoom } = useGameSocketContext()

    // FUNCTIONS
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (roomName && roomPass) {
            joinRoom(roomName, roomPass).then((roomCode) => {
                if (roomCode) {
                    
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
                        Join Room
                    </Button>
                </Flex>
            </form>
        </Box>
    )
}

export default JoinRoomForm
