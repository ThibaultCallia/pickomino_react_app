import { nanoid } from "nanoid";
class Player{
    name : string;
    id: string;
    collectedTiles: Array<object> = [];

    constructor(){
        this.name = "";
        this.id = nanoid();
        
    }
    setPlayerName(name: string){
        this.name = name;
    }
}

export default Player;