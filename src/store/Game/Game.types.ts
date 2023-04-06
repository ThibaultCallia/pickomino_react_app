
import {PlainPlayer} from "../Players/Player.types";
import { PlainTile } from "../../components";

export interface PlainGameState {
  gameId: string;
  playerArray: PlainPlayer[];
  tilesArray: PlainTile[];
  currentRound: number;
  gameStatus: string;
  }

