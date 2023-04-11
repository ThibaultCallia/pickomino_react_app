import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react"
import { GameRulesDrawerProps } from "./"

const GameRulesDrawer: React.FC<GameRulesDrawerProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="sm"
            // finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Game Rules</DrawerHeader>
                <DrawerBody>
                    <Tabs position="relative" variant="unstyled">
                        <TabList>
                            <Tab>Play a turn</Tab>
                            <Tab>End a turn</Tab>
                            <Tab>Winning</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
                            height="2px"
                            bg="yellow.500"
                            borderRadius="1px"
                        />
                        <TabPanels>
                            <TabPanel>
                                <ul>
                                    <li>The player rolls all eight dice.</li>
                                    <li>
                                        The player selects one of the rolled
                                        symbols and sets aside{" "}
                                        <strong>all</strong> dice with this
                                        symbol.
                                    </li>
                                    <li>
                                        The player can repeat the rolling and
                                        setting aside process a number of times,
                                        each time with the remaining dice. After
                                        each roll, dice <strong>must</strong> be
                                        set aside to be allowed to roll again or
                                        claim a planet. However, be aware: a
                                        symbol that has been set aside once
                                        cannot be set aside again in the same
                                        turn.
                                    </li>
                                    <li>
                                        As soon as the player is allowed to
                                        claim a planet tile, they can end their
                                        turn by picking a tile, but they can
                                        also continue rolling to try to get a
                                        tile with a higher number of planets, or
                                        a tile from another player.
                                    </li>
                                </ul>
                            </TabPanel>
                            <TabPanel>
                                <ul>
                                    <li>
                                        <strong>Successful:</strong> <br />
                                        The player may only claim a planet tile
                                        once there are one or more space ships
                                        set aside and the point total of the
                                        set-aside dice is either at least equal
                                        to the lowest number of the open planet
                                        tiles on the board or exactly
                                        equal to the number on the top tile of
                                        another player. Remember, a space ship
                                        counts as five points. <br />
                                        <br />
                                        If the planet tile with the number
                                        exactly equal to the point total is open
                                        in the row on the table or on top of
                                        another player's stack, they may claim
                                        it. If this is not the case (or if the
                                        player does not see that the relevant
                                        tile is on the stack of another player),
                                        they may claim the planet with the next
                                        lower number from the open row on the
                                        table. <br />
                                        <br />
                                        The tile will be placed on top of the
                                        players’ stack: only the top planet tile
                                        can be seen and claimed by other
                                        players. <br />
                                        <br />
                                    </li>
                                    <li>
                                        <strong>Unsuccessful:</strong> <br />
                                        If the player cannot select any dice
                                        after a roll (all symbols in the roll
                                        have already been set aside once), or as
                                        soon as all dice have been selected but
                                        do not meet the conditions to claim a
                                        planet tile, a planet tile will be returned
                                        (if they have any). This tile will
                                        be placed in the correct position on the
                                        board. Furthermore, the planet tile with
                                        the highest value on the board will be
                                        disabled. This tile will never return
                                        to the game. However, when the planet
                                        being returned is the one with the
                                        highest value, it is disabled.
                                    </li>
                                </ul>
                            </TabPanel>
                            <TabPanel>
                                <p>
                                    The game ends when all planet tiles have
                                    been claimed or disabled. The player
                                    with the highest number of collected planets
                                    wins the game. 
                                </p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default GameRulesDrawer
