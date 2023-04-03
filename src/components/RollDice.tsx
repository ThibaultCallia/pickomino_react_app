import { Box, Button, Container } from "@chakra-ui/react"
import { useState } from "react"
import { rollDice } from "../helpers"

function RollDice() {
  const [selectedDice, setSelectedDice] = useState<number[]>([])
  const [currentDiceRoll, setCurrentDiceRoll] = useState<number[]>([])

  const onRollClick = () => {
    console.log(rollDice(6));
  }
    return (
      
      <Container maxW='2xl' centerContent>
      
      <Button onClick={onRollClick}colorScheme='teal' >
        Roll
      </Button>
      
    </Container>
    )
  }
  
  export default RollDice
  