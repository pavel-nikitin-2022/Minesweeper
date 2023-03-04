import { CellSprite } from "./CellSprite";
import { CellStatus } from "./CellStatus";

export interface Cell {
  isBomb: boolean;
  nearBombs: number;
  status: CellStatus;
  index: number;
  sprite: CellSprite;
}
