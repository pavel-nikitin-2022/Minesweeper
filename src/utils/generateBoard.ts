import { CellStates } from "../redux/game.reducer";
import { findNeighbors } from "./findNeighbors";

export function generateCells() {
  const bombsIndex = [...Array(256).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);

  const cellsProto = Array.from(Array(256)).map(i => {
    return {
      isBomb: false,
      nearBombs: 0,
      open: false,
      index: i,
      state: CellStates.Close
    };
  });

  bombsIndex.forEach(i => {
    cellsProto[i].isBomb = true;
    cellsProto[i].nearBombs = 0;

    findNeighbors(i, cellsProto)?.forEach(index => {
      if (!cellsProto[index].isBomb) cellsProto[index].nearBombs++;
    });
  });

  return cellsProto;
}
