import { ICell } from "../redux/game.reducer";

export function findNeighbors(index: number, array: ICell[]) {
  const neighbors: number[] = [];

  if (index < 0 || index > 255) return;

  // все клетки
  if (index - 16 > 0) neighbors.push(index - 16);

  if (index + 16 < array.length) neighbors.push(index + 16);

  // не правые крайние
  if ((index + 1) % 16) {
    if (index - 15 > 0) neighbors.push(index - 15);
    if (index + 1 < array.length) neighbors.push(index + 1);
    if (index + 17 < array.length) neighbors.push(index + 17);
  }
  // не левые крайние
  if (index % 16) {
    if (index + 15 < array.length) neighbors.push(index + 15);
    if (index - 1 > 0) neighbors.push(index - 1);
    if (index - 17 > 0) neighbors.push(index - 17);
  }

  return neighbors;
}
