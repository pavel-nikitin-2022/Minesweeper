import { CellStatus, Cell as ICell, CellSprite } from "../types";

export function isVictory(array: ICell[]) {
  const findEmpty = array.find((cell) => cell.status === CellStatus.Close);
  const findBomb = array.find((cell) => cell.sprite === CellSprite.ExplodedBomb);
  return (findEmpty || findBomb) ? false : true;
}