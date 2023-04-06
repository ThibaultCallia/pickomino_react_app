import { nanoid } from "nanoid";
import Player from "./Player";
import { createUniqueNameArray } from "../helpers";
import  defaultTilesSet  from "./tiles.const";
import { Tile } from "../components";


class GameState{
    gameId: string = nanoid();
    playerArray: Player[];
    tilesArray: Tile[];
    currentRound: number = 0;
    gameStatus: string = "playing";

    constructor(numOfPlayers: number){
        this.playerArray = Array.from({ length: numOfPlayers }, () => new Player());
        this.tilesArray = defaultTilesSet;
        this.createPlayerNames(numOfPlayers);
    }
    createPlayerNames(numOfPlayers: number){
        let playerNames = createUniqueNameArray(numOfPlayers);
        
        this.playerArray.forEach((player, index) => {
            player.setPlayerName(playerNames[index]);
        });
    }

    
}

export default GameState;






// // ...
// public static get instance(): GameState {
//     if (!this._instance) {
//         this._instance = new GameState();
//     }
//     return this._instance;
// }
// // ...