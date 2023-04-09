import "../../styles/components/mainView.scss"
import {NumOfPlayersForm} from "../NumOfPlayersForm"
import { useEffect, useState } from "react"
import { Badge, useDisclosure } from "@chakra-ui/react"
import {RollDice} from "../RollDice"
import {PlayerInfo} from "../PlayerInfo"
import { useDispatch, useSelector } from "react-redux"
import { startGame } from "../../store/Game/gameSlice"
import { Board } from "../Board" 
import { RootState } from "../../store"
import { GameOverModal } from "../GameOverModal"



const MainView = () =>{ 

    // USE STATES
    const [numOfPlayers, setNumOfPlayers] = useState<number | null>(null)
    const dispatch = useDispatch()
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayersTurn)
    const board = useSelector((state: RootState) => state.game.tilesArray)
    const { isOpen, onOpen, onClose } = useDisclosure()

    // USE EFFECTS
    useEffect(() => {
        if(numOfPlayers){
            dispatch(startGame(numOfPlayers));
            
        }
    }, [numOfPlayers])

    useEffect(() => {
        if(board.filter(tile => !tile.disabled).length === 0){
            console.log("GAME OVER")
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
            <Board/>
            <RollDice/>
           <p>Player {currentPlayer+1} plays</p>
           <button onClick={onOpen}>test</button>
              <GameOverModal isOpen={isOpen} onClose={onClose}/>
        </div>
    )
  }
  
  export default MainView
  
