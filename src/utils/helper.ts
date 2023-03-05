import { CellSprite, CellStatus, Cell as ICell } from "src/types";

/**
 * Помощник ставит при первом клике флажки в места где стоят бомбы
 */
export function help(array: ICell[]) {
  array.forEach((cell) => {
    if (cell.isBomb) {
      cell.status = CellStatus.Guess;
      cell.sprite = CellSprite.Flag;
    }
  });
}
