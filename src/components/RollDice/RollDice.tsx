import {  Box, Button, SimpleGrid, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { rollDice, canSelect, hasSelectableDice  } from "../../helpers"
import Die from "../Die/Die"
import {GameOverModal} from "../EndTurnModal"
import { RollDiceProps } from "./"
import { nextPlayerTurn } from "../../store/Game/gameSlice"
import { useDispatch, useSelector } from "react-redux"
import { DieInterface } from "../Die"
import { RootState } from "../../store"
import { totalSelectedDice } from "../../helpers"
import EndTurnModal from "../EndTurnModal/EndTurnModal"



const RollDice:React.FC<RollDiceProps> = ({selectedDice, setSelectedDice, setValidation}) => {
  // HOOKS
  const [currentDiceRoll, setCurrentDiceRoll] = useState<DieInterface[]>([])
  const [hasSelected, setHasSelected] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const id = "selectError";
  const dispatch = useDispatch()
  const currentPlayer = useSelector((state: RootState) => state.game.currentPlayersTurn)

  // USE EFFECTS
  useEffect(() => {
    if(currentDiceRoll.length > 0 && !hasSelectableDice(selectedDice, currentDiceRoll)){
        onOpen();  
    }
  }, [currentDiceRoll])

  useEffect(() => {
    setCurrentDiceRoll([]);
    setSelectedDice([]);
    setHasSelected(true);
    setValidation("");
    
  }, [currentPlayer])

  // FUNCTIONS
  const onRollClick = () => {
    // if there are no selected dice, roll all dice
    // Roll dice should not be able to be clicked if there are no selected dice atm
    if(hasSelected){
    setCurrentDiceRoll(rollDice(8 - selectedDice.length));
    setHasSelected(false);
    setValidation("");
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
          <p>total dice: {totalSelectedDice(selectedDice)}</p>
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
    <EndTurnModal 
      isOpen={isOpen} 
      onClose={()=>{
        onClose();
        dispatch(nextPlayerTurn());}
        }
      title="Your turn is over"
        >
      One gamble too far. You have no selectable dice left. Your turn is over.
    </EndTurnModal>
    </>
    
    )
  }
  
  export default RollDice
  