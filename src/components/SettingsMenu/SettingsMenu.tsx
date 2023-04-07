import { ChevronDownIcon } from "@chakra-ui/icons"
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text, Switch, MenuItemOption } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { toggleDiceTotal } from "../../store/Game/gameSlice"


function SettingsMenu() {
  
    const showDiceTotal = useSelector((state: RootState) => state.game.settings.selectedDiceTotal);
    const dispatch = useDispatch();

    return (
        <Menu closeOnSelect={false}>
        <MenuButton
          px={4}
          py={2}
          transition='all 0.2s'
          borderRadius={5}
          
        //   _expanded={{ bg: 'yellow.400' }}
          
        >
          Settings <ChevronDownIcon />
        </MenuButton>
        <MenuList>
            
            <MenuItem>
            <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Text>Show Dice Total</Text>
                <Switch 
                    size="md" 
                    colorScheme="yellow" 
                    isChecked = {showDiceTotal}
                    onChange = {() => dispatch(toggleDiceTotal())}
                />
            </Flex>
            </MenuItem>
            
        </MenuList>
      </Menu>
    )
  }
  
  export default SettingsMenu
  
