import { CellStatus, Cell as ICell, CellSprite } from "src/types";

/**
 * Проверяет победил ли пользователь
 * @param array -матрица
 * @returns победил или нет
 */
export function isVictory(array: ICell[]) {
  const findEmpty = array.find(
    (cell) =>
      cell.status === CellStatus.Close ||
      cell.sprite === CellSprite.QuestionMark
  );
  const findBomb = array.find(
    (cell) => cell.sprite === CellSprite.ExplodedBomb
  );
  return findEmpty || findBomb ? false : true;
}
