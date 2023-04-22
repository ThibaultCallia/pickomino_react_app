// Import necessary components and hooks
import { FormEvent, useState, ChangeEvent } from "react"
import { Box, FormControl, Button, Select, Flex, Input, Text, FormErrorMessage } from "@chakra-ui/react"
import { CreateRoomFormProps } from "."

import { useDispatch } from "react-redux"
import { useGameSocketContext } from "../../contexts"
import { TriangleDownIcon } from '@chakra-ui/icons'

const CreateRoomForm = () => {
    // HOOKS
    const [num, setNum] = useState<string>("")
    const [roomPass, setRoomPass] = useState<string>("")
    const [roomName, setRoomName] = useState<string>("")
    const dispatch = useDispatch()
    const { createRoom } = useGameSocketContext()
    const [validation, setValidation] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)

    // FUNCTIONS
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (num && roomName && roomPass) {
          (async () => {
            try {
              const response:any = await createRoom(roomName, roomPass, parseInt(num));
              
            } catch (error) {
                setIsError(true);
              setValidation(error.message);
            }

          })();
        }
      };
      
      

    // RENDER
    return (
        <Box>
            
            <form onSubmit={handleSubmit} >
                {/* Alternatively work with mr on input field? */}
                <Flex gap={4} alignItems={"center"}>
                <Button 
                        type="submit"
                        mt={4} 
                        colorScheme="yellow" 
                        
                        border={"1px solid black"} 
                        borderRadius={2} 
                        boxShadow="3px 3px 0 black"
                        w={"80px"}
                        >

                        Create
                    </Button>
                    <FormControl isRequired id="numOfPlayersForm" mt={4} isInvalid={isError} borderLeft={"1px solid lightgrey"}>
                        {/* <FormLabel>How many players? </FormLabel> */}
                        
                        <Select
                            maxW={"230px"}
                            border={"none"}
                            errorBorderColor="transparent"
                            placeholder="How many players?"
                            focusBorderColor="transparent"
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
                            border={"none"}
                            errorBorderColor="transparent"
                            focusBorderColor="transparent"
                            
                            borderRadius={0}
                            placeholder="room name"
                            value={roomName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRoomName(e.target.value)
                            }}
                        />
                        <Input
                        border={"none"}
                        errorBorderColor="transparent"
                        borderRadius={0}
                            placeholder="password"
                            focusBorderColor="transparent"
                            value={roomPass}
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

export default CreateRoomForm
