import { CellSprite } from "./CellSprite";
import { CellStatus } from "./CellStatus";

export interface Cell {
  isBomb: boolean;
  nearBombs: number;
  guessNearBombs: number;
  status: CellStatus;
  index: number;
  sprite: CellSprite;
}
