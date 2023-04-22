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
                <Flex gap={4} alignItems={"center"}>
                <Button 
                        mt={4} 
                        colorScheme="yellow" 
                        type="submit" 
                        border={"1px solid black"} 
                        borderRadius={2} 
                        boxShadow="3px 3px 0 black"
                        w={"80px"}
                        
                        >
                            
                        Join
                    </Button>
                    <FormControl isRequired id="numOfPlayersForm" mt={4} borderLeft={"1px solid lightgrey"}>
                        {/* <FormLabel>How many players? </FormLabel> */}

                        <Input
                        
                        border={"none"}
                        borderRadius={0}
                            placeholder="room name"
                            focusBorderColor="transparent"
                            value={roomName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRoomName(e.target.value)
                            }}
                        />
                        <Input
                        border={"none"}
                        
                        borderRadius={0}
                            placeholder="password"
                            value={roomPass}
                            focusBorderColor="transparent"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRoomPass(e.target.value)
                            }}
                        />
                    </FormControl>

                    
                </Flex>
            </form>
        </Box>
    )
}

export default JoinRoomForm
