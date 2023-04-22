import { Box,Text, Flex } from "@chakra-ui/react"
import { CreateRoomForm } from "../CreateRoomForm"
import { JoinRoomForm } from "../JoinRoomForm"

const CreateJoinRoomForm = () => {
    // RENDER
    return (
        <Flex flexDirection={"column"} alignItems={"center"}>
            
            <Flex flexDirection={"column"} gap={10} >
                <CreateRoomForm />
                <JoinRoomForm />
            </Flex>
        </Flex>
    )
}

export default CreateJoinRoomForm
