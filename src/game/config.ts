import { CellSprite } from "../types";

export const SpritesPos: Record<CellSprite, { x: number; y: number }> = {
  close: { x: 0, y: -51 },
  selected: { x: -17, y: -51 },
  bomb: { x: -85, y: -51 },
  flag: { x: -34, y: -51 },
  questionMark: { x: -51, y: -51 },
  explodedBomb: { x: -102, y: -51 },
  falseFlag: { x: -119, y: -51 },
  1: { x: 0, y: -68 },
  2: { x: -17, y: -68 },
  3: { x: -34, y: -68 },
  4: { x: -51, y: -68 },
  5: { x: -68, y: -68 },
  6: { x: -85, y: -68 },
  7: { x: -102, y: -68 },
  8: { x: -119, y: -68 },
};
