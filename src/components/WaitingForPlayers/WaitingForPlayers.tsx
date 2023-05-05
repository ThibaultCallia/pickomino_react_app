import { Text, Box, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { type RootState } from '../../store'
import { Loader } from '../Loader'

function WaitingForPlayers ():JSX.Element {
  const playersJoined = useSelector(
    (state: RootState) => state.room.playersJoined
  )
  const maxPlayers = useSelector((state: RootState) => state.room.maxPlayers)
  return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={'center'}
            gap={5}
            justifyContent={'center'}
        >
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    Waiting for players...
                </Text>
                <Text fontSize="lg">
                    {playersJoined}/{maxPlayers} players joined
                </Text>
            </Box>
            <Loader />
        </Flex>
  )
}

export default WaitingForPlayers
