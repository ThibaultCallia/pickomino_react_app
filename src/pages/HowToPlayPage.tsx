
import {
  Text,
  Container,
  Heading,
  ListItem,
  Box,
  Flex,
  Stack,
  StackDivider,
  Button,
  UnorderedList,
  Link
} from '@chakra-ui/react'
import { useIsPresent, motion } from 'framer-motion'

import { NavBar } from '../components'

const HowToPlayPage = () => {
  const isPresent = useIsPresent()
  return (
        <>
            <NavBar game={false} />
            <Container mt={9} maxW={'900px'} p={8}>
                <Flex direction={'column'} gap={5}>
                    <Heading>How to Play</Heading>
                    <Text>
                        Arrrr, Welcome to Planetary Pirates, the thrilling
                        online dice game that takes you on an interstellar
                        adventure to plunder riches from across the universe!
                        <br />
                        <br />
                        Designed for players of all ages, Planetary Pirates
                        combines strategy, luck, and a sprinkle of arithmetic in
                        a competitive and entertaining gaming experience. In
                        this captivating online adaptation, you'll join fellow
                        space pirates in a quest to gather the most sought-after
                        planet tiles with the highest point values. But don’t
                        forget, pirates be pirates and will be after your
                        collected tiles as well.
                    </Text>
                    <Flex gap={4}>
                        <Link href="/">
                            <Button
                                mt={4}
                                colorScheme="yellow"
                                border={'1px solid black'}
                                borderRadius={2}
                                boxShadow="3px 3px 0 black"
                            >
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/game">
                            <Button
                                mt={4}
                                colorScheme="yellow"
                                border={'1px solid black'}
                                borderRadius={2}
                                boxShadow="3px 3px 0 black"
                            >
                                Play
                            </Button>
                        </Link>
                    </Flex>
                    <Box
                        p={5}
                        border={'1px solid black'}
                        boxShadow="3px 3px 0 black"
                    >
                        <Heading mb={2} size="md">
                            Objective
                        </Heading>
                        <Text>
                            The goal of Planetary Pirates is to collect the most
                            valuable planet tiles with the highest point values.
                            Planet tiles are numbered 21 to 36 and have a
                            certain number of planets on them.
                        </Text>
                    </Box>
                    <Box
                        p={5}
                        border={'1px solid black'}
                        boxShadow="3px 3px 0 black"
                    >
                        <Heading mb={2} size="md">
                            Gameplay
                        </Heading>
                        <Stack
                            divider={<StackDivider borderColor="gray.200" />}
                        >
                            <Box mb={4}>
                                <Heading size={'s'}>Play a Turn</Heading>
                                <UnorderedList>
                                    <ListItem>
                                        The player rolls all eight dice by
                                        clicking{' '}
                                        <Button
                                            colorScheme="yellow"
                                            borderRadius={1}
                                            fontSize={'xs'}
                                            size={'xs'}
                                            mr={1}
                                        >
                                            Roll
                                        </Button>
                                        .
                                    </ListItem>
                                    <ListItem>
                                        The player selects one of the rolled
                                        symbols (a number or the space ship) and
                                        sets aside all dice with this symbol.
                                        This is done by clicking on the desired
                                        die which will be highlighted. If you
                                        click{' '}
                                        <Button
                                            colorScheme="yellow"
                                            borderRadius={1}
                                            fontSize={'xs'}
                                            size={'xs'}
                                            mr={1}
                                        >
                                            Select
                                        </Button>
                                        those dice will be set aside.
                                    </ListItem>
                                    <ListItem>
                                        The player can repeat the rolling and
                                        setting aside process a number of times,
                                        each time with the remaining dice. After
                                        each roll, dice must be set aside to be
                                        allowed to roll again or claim a planet
                                        tile. However, be aware: a symbol that
                                        has been set aside once cannot be set
                                        aside again in the same turn.
                                    </ListItem>
                                    <ListItem>
                                        As soon as the player is allowed to
                                        claim a planet tile, they can end their
                                        turn, but they can also continue rolling
                                        to try to get a tile with a higher
                                        number of planets, or a tile from
                                        another player.
                                    </ListItem>
                                    <ListItem>
                                        Finally, when the player claims a planet
                                        tile, this will be placed on top of
                                        their stack. If he cannot select a tile,
                                        his previous collected tile will be
                                        returned to the board.
                                    </ListItem>
                                </UnorderedList>
                            </Box>

                            <Box>
                                <Heading size={'s'}>End of a Turn</Heading>

                                <UnorderedList>
                                    <ListItem>
                                        <strong>Successful: </strong>
                                        <br />
                                        The player may only claim a planet tile
                                        once there are one or more space ships
                                        set aside and the point total of the
                                        set-aside dice is either at least equal
                                        to the lowest number of the open planet
                                        tiles on the board or exactly equal to
                                        the number on the top tile of another
                                        player. Remember, a space ship counts as
                                        five points. <br />
                                        If the planet tile with the number
                                        exactly equal to the point total is open
                                        in the row on the board or available on
                                        a opponents' card, they may claim it. If
                                        this is not the case (or if the player
                                        does not see that the relevant tile is
                                        available on an opponent), they may
                                        claim the planet with the next lower
                                        number from the open row on the board.{' '}
                                        <br />
                                        <br />
                                        The tile will be placed on top of the
                                        players’ stack: only the top planet tile
                                        can be seen and claimed by other
                                        players. <br />
                                        <br />
                                    </ListItem>
                                    <ListItem>
                                        <strong>Unsuccessful</strong>
                                        <br />
                                        If the player cannot select any dice
                                        after a roll (all symbols in the roll
                                        have already been set aside once), or as
                                        soon as all dice have been selected but
                                        do not meet the conditions to claim a
                                        planet tile, a planet tile will be
                                        returned (if they have any). This tile
                                        will be placed in the correct position
                                        on the board. Furthermore, the planet
                                        tile with the highest value on the board
                                        will be disabled. This tile will never
                                        return to the game. However, when the
                                        planet being returned is the one with
                                        the highest value, it is disabled.
                                        <br />
                                    </ListItem>
                                </UnorderedList>
                            </Box>
                            <Box>
                                <Heading size={'s'}>Winning</Heading>

                                <Text>
                                    The game ends when all planet tiles have
                                    been claimed or disabled. The player with
                                    the highest number of collected planets wins
                                    the game.
                                </Text>
                            </Box>
                        </Stack>
                    </Box>
                </Flex>
            </Container>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{
                  scaleX: 0,
                  transition: { duration: 0.5, ease: 'circOut' }
                }}
                exit={{
                  scaleX: 1,
                  transition: { duration: 0.5, ease: 'circIn' }
                }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            />
        </>
  )
}

export default HowToPlayPage
