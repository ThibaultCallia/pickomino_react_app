import { Grid, GridItem } from "@chakra-ui/react"
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
    Key,
} from "react"

function PlayerInfo({ gameState }: any) {
    // RENDER
    return (
        <Grid>
            {gameState?.playerArray.map(
                (player: { name: string }, index: number) => {
                    return (
                        <GridItem key={index}>
                            player {index + 1}: {player.name}
                        </GridItem>
                    )
                }
            )}
        </Grid>
    )
}

export default PlayerInfo
