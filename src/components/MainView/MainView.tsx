import "../../styles/components/mainView.scss"
import {NumOfPlayersForm} from "../NumOfPlayersForm"
import { useEffect, useState } from "react"
import { Badge } from "@chakra-ui/react"
import {RollDice} from "../RollDice"
import {PlayerInfo} from "../PlayerInfo"
import { useDispatch, useSelector } from "react-redux"
import { startGame } from "../../store/Game/gameSlice"
import { Board } from "../Board" 
import { RootState } from "../../store"
import { DieInterface } from "../Die"

const MainView = () =>{ 

    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const dispatch = useDispatch()
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayersTurn)
    const board = useSelector((state: RootState) => state.game.tilesArray)
    const [validation, setValidation] = useState<string>("");

    // USE EFFECTS
    useEffect(() => {
        if(numOfPlayers){
            dispatch(startGame(numOfPlayers));
            
        }
    }, [numOfPlayers])

    useEffect(() => {
        if(board.filter(tile => !tile.disabled).length === 0){
            setValidation("Game Over")
        }
    }, [board])
    
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
            <Board  setValidation={setValidation}/>
            <Badge colorScheme="red">{validation}</Badge>
            <RollDice setValidation={setValidation}/>
           <p>Player {currentPlayer+1} plays</p>

        </div>
    )
  }
  
  export default MainView
  
