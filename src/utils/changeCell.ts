import { Cell as ICell } from "../types";
import { findNeighbors } from "./findNeighbors";

/**
 * Функция для замены бомбы на безопасную клетку
 * @param index - порядковый номер клетки в матрице
 * @param array - матрицаи
 */
export function changeCell(index: number, array: ICell[]) {
  if (index < 0 || index > 255 || !array[index].isBomb) return;
  console.log("AAAA");
  const cell = array[index];
  cell.isBomb = false;

  findNeighbors(index, array).forEach((neihgbour) => {
    if (array[neihgbour].isBomb)
      array[index].nearBombs++;
    else array[neihgbour].nearBombs--;
  });

  for (const noBombCell of array) {
    if (!noBombCell.isBomb) {
      noBombCell.isBomb = true;
      noBombCell.nearBombs = 0;
      findNeighbors(noBombCell.index, array).forEach((neihgbour) => {
        if (!array[neihgbour].isBomb) {
          array[neihgbour].nearBombs++;
        }
      });
      break;
    }
  }
}