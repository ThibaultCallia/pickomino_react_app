class Player{
    name : string;
    id: number;
    collectedTiles: Array<object> = [];

    constructor(){
        this.name = "Player";
        this.id = 0;
        
    }
}

export default Player;