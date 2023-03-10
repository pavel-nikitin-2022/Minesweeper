import { toCellSprite } from "src/store/game.reducer";
import { CellSprite, CellStatus, Cell as ICell } from "src/types";
import { findNeighbors } from "./findNeighbors";
import { openEmpty } from "./openEmpty";

/**
 * Открывает соседей открытой клетки, если количество флагов рядом равно количеству бомб рядом
 * @param index индекс элемента массива
 * @param array - матрица
 */
export function openEmptyFlags(index: number, array: ICell[]) {
  if (index < 0 || index > 255 || array[index].status === CellStatus.Close)
    return;

  let flagNumbers = 0;

  findNeighbors(index, array).forEach((neihgbour) => {
    if (array[neihgbour].sprite === CellSprite.Flag) flagNumbers++;
  });

  if (array[index].nearBombs === flagNumbers) {
    for (const neihgbour of findNeighbors(index, array)) {
      if (array[neihgbour].status === CellStatus.Close) {
        if (array[neihgbour].isBomb) {
          return { index: array[neihgbour].index };
        } else if (array[neihgbour].nearBombs === 0) {
          openEmpty(neihgbour, array);
        } else {
          array[neihgbour].status = CellStatus.Open;
          const newState = toCellSprite(array[neihgbour].nearBombs);
          if (newState) array[neihgbour].sprite = newState;
        }
      }
    }
  }
}
