import { StarIcon } from "@chakra-ui/icons"
import { Badge, Box, Button, Container, Grid, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { rollDice } from "../helpers"
import Die from "./Die"


interface DieInterface {
  value: number;
  face: string;
}

function RollDice() {
  const [selectedDice, setSelectedDice] = useState<number[]>([])
  const [currentDiceRoll, setCurrentDiceRoll] = useState<DieInterface[]>([])

  

  const onRollClick = () => {
    setCurrentDiceRoll(rollDice(8 - selectedDice.length))
  }
    return (
      
    <Box maxW='sm' borderWidth='4px' borderRadius='lg'  minH="300px" minW="450px">
      <Box p='6' display="flex" gap="10px" justifyContent="space-between">
        <Box display='flex' alignItems='baseline' minWidth="175px" borderWidth='1px' minHeight="250" >
          
        </Box>
        <Box display='flex' flexDirection="column" alignItems='center' minWidth="175px"  minHeight="250" >
          <Stack justify="center"  width="100%" height="100%" direction="column">
            <Button onClick = {onRollClick} colorScheme="yellow">Roll</Button>
            <Box flex={1}>
              <SimpleGrid columns={4} spacing={3}>
                {currentDiceRoll.map((die: DieInterface, index: number) => {
                  return <Die key={index} die={die.face}></Die>
                })}
                
                
              </SimpleGrid>
            </Box>
            <Button colorScheme="yellow">Select</Button>
          </Stack>
          
        </Box>
      </Box>
    </Box>

    

    )
  }
  
  export default RollDice
  