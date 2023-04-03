import "../customScss/mainView.scss"
import NumOfPlayersForm from "./NumOfPlayersForm"
import { useEffect, useState } from "react"
import GameState  from "../classes/GameState"
import { Grid, GridItem, Button } from "@chakra-ui/react"
import RollDice from "./RollDice"
import PlayerInfo from "./PlayerInfo"



const MainView = () =>{ 

    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)

    useEffect(() => {
        if(numOfPlayers){
            setGameState(new GameState(numOfPlayers))
            setCurrentPlayer(1);
        }
    }, [numOfPlayers])

    const onEndTurn = () => {
         setCurrentPlayer(prev => prev === numOfPlayers ? 1 : prev + 1);
    }
    
    
    if(!numOfPlayers){
    return (
        <div className="mainView">
            <NumOfPlayersForm setNumOfPlayers={setNumOfPlayers}/>
        </div>
    )
    }

    return (
        <div className="mainView">
            <PlayerInfo gameState = {gameState}/>
            <Button onClick={onEndTurn}>End turn</Button>
            
            <RollDice/>

           <p>Player {currentPlayer} plays</p>


        </div>
    )
  }
  
  export default MainView
  
