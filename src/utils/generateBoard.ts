import { Cell as ICell, CellSprite, CellStatus } from "src/types";
import { findNeighbors } from "./findNeighbors";

/**
 * Функция генерации матрицы(игрового поля)
 * @returns массив содержащий значение каждой клетки
 */
export function generateCells() {
  const bombsIndex = [...Array(256).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);

  const cellsProto: ICell[] = Array.from(Array(256)).map((val, i) => {
    return {
      isBomb: false,
      nearBombs: 0,
      status: CellStatus.Close,
      index: i,
      sprite: CellSprite.Close,
    };
  });

  bombsIndex.forEach((i) => {
    cellsProto[i].isBomb = true;
    cellsProto[i].nearBombs = 0;

    findNeighbors(i, cellsProto)?.forEach((index) => {
      if (!cellsProto[index].isBomb) {
        cellsProto[index].nearBombs++;
      }
    });
  });

  return cellsProto;
}
