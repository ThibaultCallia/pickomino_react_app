// Import necessary components and hooks
import { type FormEvent, useState, type ChangeEvent, useEffect } from 'react'

import {
  Box,
  FormControl,
  Button,
  Flex,
  Input,
  useToast
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { useGameSocketContext } from '../../contexts'

const JoinRoomForm = (): JSX.Element => {
  // HOOKS
  const [roomName, setRoomName] = useState<string>('')
  const [roomPass, setRoomPass] = useState<string>('')
  const { joinRoom } = useGameSocketContext()

  const [validation, setValidation] = useState<string>('')

  const toast = useToast()
  const roomJoinError = 'roomJoinError'

  // FUNCTIONS
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (roomName && roomPass) {
      ;(async () => {
        setValidation('')
        try {
          const response: any = await joinRoom(roomName, roomPass)
        } catch (error: any) {
          setValidation(error.message)
        }
      })()
    }
  }

  useEffect(() => {
    if (validation) {
      toast({
        id: roomJoinError,
        title: `${validation}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        variant: 'subtle'
      })
    }
    if (!validation) {
      toast.close(roomJoinError)
    }
  }, [validation])

  // RENDER
  return (
        <Box>
            <form onSubmit={handleSubmit}>
                {/* Alternatively work with mr on input field? */}
                <Flex gap={4} alignItems={'center'}>
                    <Button
                        mt={4}
                        colorScheme="yellow"
                        type="submit"
                        border={'1px solid black'}
                        borderRadius={2}
                        boxShadow="3px 3px 0 black"
                        w={'80px'}
                    >
                        Join
                    </Button>
                    <FormControl
                        isRequired
                        id="numOfPlayersForm"
                        mt={4}
                        borderLeft={'1px solid lightgrey'}
                    >
                        {/* <FormLabel>How many players? </FormLabel> */}

                        <Input
                            border={'none'}
                            borderRadius={0}
                            placeholder="Room Name"
                            focusBorderColor="transparent"
                            value={roomName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setRoomName(e.target.value)
                            }}
                        />
                        <Input
                            border={'none'}
                            borderRadius={0}
                            placeholder="Password"
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
