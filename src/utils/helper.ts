import { CellSprite, CellStatus, Cell as ICell } from "../types";

/**
 * Скрипт окончания игры
 * @returns массив содержащий значение каждой клетки
 */
export function help(array: ICell[]) {
  array.forEach((cell) => {
    if (cell.isBomb) {
      cell.status = CellStatus.Guess;
      cell.sprite = CellSprite.Flag;
    }
  });
}
