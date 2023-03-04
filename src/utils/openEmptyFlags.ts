import { toCellSprite } from "../store/game.reducer";
import { CellSprite, CellStatus, Cell as ICell } from "../types";
import { endGame } from "./endGame";
import { findNeighbors } from "./findNeighbors";

export function openEmptyFlags(index: number, array: ICell[], first = false) {
  if (
    index < 0 ||
    index > 255 ||
    (array[index].status !== CellStatus.Close && !first)
  )
    return;
  const cell = array[index];
  let flagNumbers = 0;

  findNeighbors(index, array).forEach((neihgbour) => {
    if (array[neihgbour].sprite === CellSprite.Flag) flagNumbers++;
  });

  if (cell.isBomb) {
    return {index: cell.index};
  }

  if (cell.nearBombs - flagNumbers > 0) {
    cell.status = CellStatus.Open;
    const newState = toCellSprite(cell.nearBombs);
    if (newState) cell.sprite = newState;
    return;
  }

  if (cell.nearBombs - flagNumbers === 0) {
    cell.status = CellStatus.Open;
    const newState = toCellSprite(cell.nearBombs);
    if (newState) cell.sprite = newState;

    let answer: {index: number} | null = null;

    findNeighbors(index, array).forEach((neihgbour) => {
      const t = openEmptyFlags(neihgbour, array);
      if (t) answer = t;
    });

    return answer;
  }
}
