import { nanoid } from "nanoid";
import {PlainPlayer} from "./Player.types";
import { PlainTile } from "../../components";



const createPlayer = (): PlainPlayer => {
    return {
        name: "",
        id: nanoid(),
        collectedTiles: [],
      };
};

export const createPlayerArray = (numOfPlayers: number): PlainPlayer[] => {
    return Array.from({ length: numOfPlayers }, () => createPlayer());
}