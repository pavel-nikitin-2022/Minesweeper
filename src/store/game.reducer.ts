import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openEmpty } from "../utils/openEmpty";
import { endGame } from "../utils/endGame";
import { findNeighbors } from "../utils/findNeighbors";
import { generateCells } from "../utils/generateBoard";
import { changeCell } from "../utils/changeCell";
import { Cell as ICell, CellSprite, CellStatus, } from "../types";

export type GameState = {
  cells: ICell[];
  click: number;
};

const initialState: GameState = {
  cells: generateCells(),
  click: 0
};

/**
 * Возвращает новоее значение исходя из кол-ва мин вокруг клетки
 * @param bombs - количество мин вокруг клетки
 */
export function toCellSprite(bombs: number) {
  switch (bombs) {
    case 1:
      return CellSprite.One;
    case 2:
      return CellSprite.Two;
    case 3:
      return CellSprite.Three;
    case 4:
      return CellSprite.Four;
    case 5:
      return CellSprite.Five;
    case 6:
      return CellSprite.Six;
    case 7:
      return CellSprite.Seven;
    case 8:
      return CellSprite.Eight;
    default:
      return null;
  }
}

const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    /** Подсвечивает неоткрытых соседей открытой клетки */
    highlightNeighbors(
      state: GameState,
      action: PayloadAction<{ index: number; status: boolean }>
    ) {
      const { index, status } = action.payload;
      // проверяем пришел ли адекватный индекс и открыт ли он
      if (
        index < 0 ||
        index > 255 ||
        state.cells[index].status === CellStatus.Close
      )
        return;

      const newCellSprite = status ? CellSprite.Selected : CellSprite.Close;

      findNeighbors(index, state.cells).forEach((neihgbour) => {
        if (state.cells[neihgbour].status === CellStatus.Close) {
          state.cells[neihgbour].sprite = newCellSprite;
        }
      });
    },

    /** Открывает закрытую клетку */
    openCell(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;

      // проверяем что индекс существует и клетка еще не открыта
      if (i < 0 || i > 255 || state.cells[i].status === CellStatus.Open) return;

      const cell = state.cells[i];
      if (!state.click && cell.isBomb) changeCell(i, state.cells);
      state.click++;

      if (cell.isBomb) {
        cell.status = CellStatus.Open;
        endGame(state.cells);
      } else if (cell.nearBombs) {
        const newState = toCellSprite(cell.nearBombs);
        cell.status = CellStatus.Open;

        if (newState) {
          cell.sprite = newState;
        }
      } else {
        openEmpty(i, state.cells);
      }
    },

    /** Подсвечивает элемент по нажатию */
    setSelected(
      state: GameState,
      action: PayloadAction<{ index: number; status: boolean }>
    ) {
      const { index, status } = action.payload;
      const cellSprite = status ? CellSprite.Selected : CellSprite.Close;

      if (
        index < 0 ||
        index > 255 ||
        state.cells[index].status === CellStatus.Open
      )
        return;
      const cell = state.cells[index];
      cell.sprite = cellSprite;
    },

    /** Отмечает место предполагаемого заминирования */
    putFlag(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      if (i < 0 || i > 255 || state.cells[i].status === CellStatus.Open) return;
      const cell = state.cells[i];

      if (cell.sprite !== CellSprite.QuestionMark) cell.status = CellStatus.Guess;
      else cell.status = CellStatus.Close;

      if (cell.sprite === CellSprite.Flag) cell.sprite = CellSprite.QuestionMark;
      else if (cell.sprite === CellSprite.QuestionMark)
        cell.sprite = CellSprite.Close;
      else cell.sprite = CellSprite.Flag;
    },
  },
});

export default GameSlice.reducer;
export const { openCell, highlightNeighbors, setSelected, putFlag } =
  GameSlice.actions;
