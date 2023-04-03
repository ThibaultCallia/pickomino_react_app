import { Grid, GridItem } from "@chakra-ui/react"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react"

function PlayerInfo({gameState}: any) {
  return (
    <Grid>
      {gameState?.playerArray.map((player: { name: string }, index: Key ) => {
        return <GridItem key={index}>name: {player.name}</GridItem>
      })}
    </Grid>
  )
}

export default PlayerInfo
