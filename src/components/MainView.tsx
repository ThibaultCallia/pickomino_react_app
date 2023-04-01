import "../customScss/mainView.scss"
import NumOfPlayersForm from "./NumOfPlayersForm"
import { useEffect, useState } from "react"
import GameState  from "../classes/GameState"
import { Grid, GridItem } from "@chakra-ui/react"



const MainView = () =>{ 

    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const [gameState, setGameState] = useState<GameState | null>(null)

    useEffect(() => {
        if(numOfPlayers){
            setGameState(new GameState(numOfPlayers))
        }
    }, [numOfPlayers])
    
    
    if(!numOfPlayers){
    return (
        <div className="mainView">
            <NumOfPlayersForm setNumOfPlayers={setNumOfPlayers}/>
        </div>
      
    )
    }

    return (
        <div className="mainView">
           {gameState?.playerArray.map((player, index) => {
            return <p key={index}>{player.name}</p>
           })}
        </div>
    )
  }
  
  export default MainView
  
