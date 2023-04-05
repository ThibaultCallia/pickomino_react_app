import {  Box, Button, SimpleGrid, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { rollDice, canSelect, hasSelectableDice  } from "../../helpers"
import Die from "../Die/Die"
import {GameOverModal} from "../GameOverModal"
import { DieInterface } from "../Die"


function RollDice( {currentPlayer, setCurrentPlayer, numOfPlayers, onEndTurn}: any) {
  // USE STATES
  const [selectedDice, setSelectedDice] = useState<DieInterface[]>([])
  const [currentDiceRoll, setCurrentDiceRoll] = useState<DieInterface[]>([])
  const [hasSelected, setHasSelected] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const id = "selectError";

  // USE EFFECTS
  useEffect(() => {
    if(currentDiceRoll.length > 0 && !hasSelectableDice(selectedDice, currentDiceRoll)){
      setGameOver(true);
        onOpen();  

    }
  }, [currentDiceRoll])

  // FUNCTIONS
  
  const onRollClick = () => {
    // if there are no selected dice, roll all dice
    // Roll dice should not be able to be clicked if there are no selected dice atm
    if(hasSelected){
    setCurrentDiceRoll(rollDice(8 - selectedDice.length));
    setHasSelected(false);
    }
  }

  const onSelectDiceClick = (value: string) => {
      setCurrentDiceRoll(prev => prev.map(die => {
        if(die.face === value){
          return {...die, selected: true}
        } 
        return {...die, selected: false}
      }))
    
  }

  const finalSelectClick = () => {
    if(canSelect( selectedDice, currentDiceRoll)){
      toast.close(id);
      setHasSelected(true);
      setSelectedDice(prev => [...prev, ...currentDiceRoll.filter(die => die.selected).map(die => ({...die, selected: false}))])
      setCurrentDiceRoll([])
    } else{
      if(!toast.isActive(id)){
        toast({
          id,
          title: "You can't select that die",
          description: "You already have a die with that value",
          status: "error",
          duration: 5000,
          isClosable: true,
          variant: "subtle",
        })
      }
    }
  }

  

  // RENDER
    return (
      <>
    <Box maxW='sm' borderWidth='4px' borderRadius='lg'  minH="300px" minW="450px">
      <Box p='6' display="flex" gap="10px" justifyContent="space-between">
        <Box flex={1}  minWidth="175px" minHeight="250" >
          <SimpleGrid columns={2} spacing={3}>
                {selectedDice.length>0 && selectedDice.map((die: DieInterface, index: number) => {
                  return <Die selected = {die.selected} key={index} die={die.face}></Die>
                })}
              </SimpleGrid>
        </Box>

        <Box display='flex' flexDirection="column" alignItems='center' minWidth="175px"  minHeight="250" >
          <Stack justify="center"  width="100%" height="100%" direction="column">
            <Button disabled = {hasSelected} onClick = {onRollClick} colorScheme={hasSelected? "yellow" : "gray"}>Roll</Button>
            <Box flex={1}>
              <SimpleGrid columns={4} spacing={3}>
                {currentDiceRoll.length>0 && currentDiceRoll.map((die: DieInterface, index: number) => {
                  return <Die selected = {die.selected} onClick = {()=>onSelectDiceClick(die.face)} key={index} die={die.face}/>
                })}
              </SimpleGrid>
            </Box>
            <Button onClick = {finalSelectClick} colorScheme="yellow">Select</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
    <GameOverModal isOpen={isOpen} onClose={()=>{
      onClose();
      onEndTurn();
    }} />
    </>
    
    )
  }
  
  export default RollDice
  