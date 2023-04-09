import {  Box, SimpleGrid, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { rollDice, canSelect, hasSelectableDice, totalDiceValue, finalRollFailed  } from "../../helpers"
import { Die } from "../Die"
import { CustomButton } from "../CustomButton"
import { RollDiceProps } from "./"
import { nextPlayerTurn, addSelectedDice, resetSelectedDice, setCurrentDiceRoll, resetCurrentDiceRoll, returnTile } from "../../store/Game/gameSlice"
import { useDispatch, useSelector } from "react-redux"
import { DieInterface } from "../Die"
import { RootState } from "../../store"
import EndTurnModal from "../EndTurnModal/EndTurnModal"



const RollDice:React.FC<RollDiceProps> = ({ setValidation}) => {
  // HOOKS
  const [rollDisabled, setRollDisabled] = useState<boolean>(false)
  const [selectDisabled, setSelectDisabled] = useState<boolean>(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const toastId = "selectError"
  const dispatch = useDispatch()
  const currentPlayer = useSelector((state: RootState) => state.game.currentPlayersTurn)
  // NOT SURE IF LOWEST TILE IS AVAILABLE
  const lowestTileOnBoard = useSelector((state: RootState) => state.game.tilesArray[0].value)
  const showDiceTotal = useSelector((state: RootState) => state.game.settings.selectedDiceTotal)
  const selectedDice = useSelector((state: RootState) => state.game.playerArray[currentPlayer]?.currentlySelectedDice) || [];
  const currentDiceRoll = useSelector((state: RootState) => state.game.playerArray[currentPlayer]?.currentDiceRoll) || [];
  const playerArray = useSelector((state: RootState) => state.game.playerArray)
  
  // USE EFFECTS
  useEffect(() => {
    if(currentDiceRoll.length > 0 && !hasSelectableDice(selectedDice, currentDiceRoll)){
      dispatch(returnTile());
      onOpen();
      return;  
    }
    // ADD CHECK WHETHER OTHER PLAYERS TILES ARE AVAILABLE TO STEAL
    if(currentDiceRoll.length > 0 && finalRollFailed(selectedDice, currentDiceRoll, lowestTileOnBoard)){
      dispatch(returnTile());
      onOpen();
      return;
    }
  }, [currentDiceRoll])

  useEffect(() => {
    dispatch(resetCurrentDiceRoll());
    dispatch(resetSelectedDice());
    setValidation("");
    setRollDisabled(false);
    setSelectDisabled(true);
  }, [currentPlayer])

  /* THIS IS REDUNDANT IN CURRENT LOGIC
  useEffect(() => {
    if(hasSelected && selectedDice.length === 8){
      if(totalDiceValue(selectedDice) < lowestTileOnBoard){
        onOpen();
        return;
      }
    }
  }, [selectedDice])
  */

  // FUNCTIONS
  const onRollClick = () => {
    setRollDisabled(true);
    // if there are no selected dice, roll all dice
    // Roll dice should not be able to be clicked if there are no selected dice atm
    dispatch(setCurrentDiceRoll(rollDice(8 - selectedDice.length)));
    setValidation("");
  }

  const highlightDice = (value: string) => {
    setSelectDisabled(false);
      dispatch(setCurrentDiceRoll(currentDiceRoll.map(die => {
        if(die.face === value){
          return {...die, selected: true}
        } 
        return {...die, selected: false}
      })))
  }

  const selectDice = () => {
    if(canSelect( selectedDice, currentDiceRoll)){
      toast.close(toastId);
      setRollDisabled(false);
      setSelectDisabled(true);
      dispatch(addSelectedDice(currentDiceRoll.filter(die => die.selected).map(die => ({...die, selected: false}))));
      dispatch(setCurrentDiceRoll([]));
    } else{
      if(!toast.isActive(toastId)){
        toast({
          id : toastId,
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
    <Box maxW='sm' borderWidth='4px' borderRadius='lg'  minH="300px" minW="650px">
      <Box p='6' display="flex" gap="10px" justifyContent="space-between">
        <Box flex={1}  minWidth="175px" minHeight="250" >
          {showDiceTotal && <p>total dice: {totalDiceValue(selectedDice)}</p>}
          
          <SimpleGrid columns={2} spacing={3}>
                {selectedDice.length>0 && selectedDice.map((die: DieInterface, index: number) => {
                  return <Die selected = {die.selected} key={index} die={die.face}></Die>
                })}
          </SimpleGrid>
        </Box>

        <Box display='flex' flexDirection="column" alignItems='center' minWidth="200px"  minHeight="250" >
          <Stack justify="center"  width="100%" height="100%" direction="column">
            <CustomButton isDisabled = {rollDisabled} onClick = {onRollClick}>Roll</CustomButton>
            <Box flex={1}>
              <SimpleGrid columns={4} spacing={3}>
                {currentDiceRoll.length>0 && currentDiceRoll.map((die: DieInterface, index: number) => {
                  return <Die selected = {die.selected} onClick = {()=>highlightDice(die.face)} key={index} die={die.face}/>
                })}
              </SimpleGrid>
            </Box>
            <CustomButton isDisabled = {selectDisabled} onClick = {selectDice}>Select</CustomButton>
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
  