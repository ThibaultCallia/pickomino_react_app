import "../../styles/components/mainView.scss"
import {NumOfPlayersForm} from "../NumOfPlayersForm"
import { useEffect, useState } from "react"
import { Button } from "@chakra-ui/react"
import {RollDice} from "../RollDice"
import {PlayerInfo} from "../PlayerInfo"
import { useDispatch, useSelector } from "react-redux"
import { startGame } from "../../store/Game/gameSlice"
import { Board } from "../Board" 
import { nextPlayerTurn } from "../../store/Game/gameSlice"
import { RootState } from "../../store"
import { DieInterface } from "../Die"

const MainView = () =>{ 

    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const dispatch = useDispatch()
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayersTurn)
    const [selectedDice, setSelectedDice] = useState<DieInterface[]>([])
    const [validation, setValidation] = useState<string>("");

    // USE EFFECTS
    useEffect(() => {
        if(numOfPlayers){
            dispatch(startGame(numOfPlayers));
            
        }
    }, [numOfPlayers])

    
    // RENDER
    if(!numOfPlayers){
    return (
        <div className="mainView">
            <NumOfPlayersForm setNumOfPlayers={setNumOfPlayers}/>
        </div>
    )
    }

    return (
        <div className="mainView">
            <PlayerInfo/>
            <Board selectedDice = {selectedDice} setValidation={setValidation}/>
            <Button onClick={()=>dispatch(nextPlayerTurn())}>End turn</Button>
            <RollDice  selectedDice={selectedDice} setSelectedDice={setSelectedDice}/>
           <p>Player {currentPlayer} plays</p>

        </div>
    )
  }
  
  export default MainView
  
