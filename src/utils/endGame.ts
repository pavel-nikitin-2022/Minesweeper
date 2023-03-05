import { CellSprite, CellStatus, Cell as ICell } from "src/types";

/**
 * Скрипт окончания игры
 * @param array - матрица
 * @returns массив содержащий значение каждой клетки
 */
export function endGame(array: ICell[]) {
  array.forEach(cell => {
    if (cell.isBomb) {
      if (cell.status === CellStatus.Open) {
        cell.sprite = CellSprite.ExplodedBomb;
      }
      if (cell.status === CellStatus.Close) {
        cell.sprite = CellSprite.Bomb;
        cell.status = CellStatus.Open;
      }
      if (cell.sprite === CellSprite.QuestionMark) {
        cell.sprite = CellSprite.Flag;
      }
    } else {
      if (cell.sprite === CellSprite.Flag) {
        cell.status = CellStatus.Open;
        cell.sprite = CellSprite.FalseFlag;
      }
    }
  });
}
