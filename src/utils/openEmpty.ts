
import { toCellSprite } from "../store/game.reducer";
import { CellSprite, CellStatus, Cell as ICell } from "../types";
import { findNeighbors } from "./findNeighbors";

export function openEmpty(index: number, array: ICell[]) {
  if (index < 0 || index > 255 || array[index].status !== CellStatus.Close)
    return;

  array[index].status = CellStatus.Open;
  if (array[index].nearBombs) {
    const newState = toCellSprite(array[index].nearBombs);
    if (newState) array[index].sprite = newState;
    return;
  }

  array[index].sprite = CellSprite.Selected;

  findNeighbors(index, array).forEach((neihgbour) => {
    openEmpty(neihgbour, array);
  });
}
