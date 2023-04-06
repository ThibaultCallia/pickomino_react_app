import "../../styles/components/mainView.scss"
import {NumOfPlayersForm} from "../NumOfPlayersForm"
import { useEffect, useState } from "react"
import GameState from "../../classes/GameState"
import { Button } from "@chakra-ui/react"
import {RollDice} from "../RollDice"
import {PlayerInfo} from "../PlayerInfo"

import { useDispatch } from "react-redux"
import { gameActions } from "../../store/Game/gameSlice"
import { Board } from "../Board" 


const MainView = () =>{ 

    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)
    const dispatch = useDispatch()
    
    // USE EFFECTS
    useEffect(() => {
        if(numOfPlayers){
            dispatch(gameActions.startGame(numOfPlayers));
            setCurrentPlayer(1);
        }
    }, [numOfPlayers])

    // FUNCTIONS
    const onEndTurn = () => {
         setCurrentPlayer(prev => prev === numOfPlayers ? 1 : prev + 1);
    }

    
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
            <Board/>
            <Button onClick={onEndTurn}>End turn</Button>
            
            <RollDice 
                currentPlayer = {currentPlayer} 
                setCurrentPlayer = {setCurrentPlayer} 
                numOfPlayers={numOfPlayers} 
                onEndTurn={onEndTurn}
                key={currentPlayer}
            />

           <p>Player {currentPlayer} plays</p>

        </div>
    )
  }
  
  export default MainView
  
