import { nanoid } from "nanoid";
import Player from "./Player";
import { createUniqueNameArray } from "../helpers";

class GameState{
    gameId: string = nanoid();
    playerArray: Player[];
    tilesArray: Array<object> = [];
    currentRound: number = 0;
    gameStatus: string = "playing";

    constructor(numOfPlayers: number){
        this.playerArray = Array.from({ length: numOfPlayers }, () => new Player());
        this.tilesArray = [
            { value: 21, points: 1 },
      { value: 22, points: 1 },
      { value: 23, points: 1 },
      { value: 24, points: 1 },
      { value: 25, points: 2 },
      { value: 26, points: 2 },
      { value: 27, points: 2 },
      { value: 28, points: 2 },
      { value: 29, points: 3 },
      { value: 30, points: 3 },
      { value: 31, points: 3 },
      { value: 32, points: 3 },
      { value: 33, points: 4 },
      { value: 34, points: 4 },
      { value: 35, points: 4 },
      { value: 36, points: 4 },
        ];
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