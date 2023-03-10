import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell as ICell, CellSprite, CellStatus, GameStatus } from "src/types";
import {
  changeCell,
  endGame,
  findNeighbors,
  generateCells,
  isVictory,
  openEmpty,
  openEmptyFlags,
} from "src/utils";

export type GameState = {
  cells: ICell[];
  isStart: boolean;
  flagsAmount: number;
  gameStatus: GameStatus;
  active: boolean;
};

const initialState: GameState = {
  cells: generateCells(),
  isStart: false,
  flagsAmount: 40,
  gameStatus: GameStatus.Unknown,
  // контроль зажатой мышки на игровом поле
  active: false,
};

/**
 * Возвращает новоее значение исходя из кол-ва мин вокруг клетки
 * @param bombs - количество мин вокруг клетки
 */
export function toCellSprite(bombs: number) {
  switch (bombs) {
    case 0:
      return CellSprite.Selected;
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
      // Проверяем существует ли индекс и статус клетки
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
      if (!state.isStart && cell.isBomb) changeCell(i, state.cells);
      state.isStart = true;

      if (cell.isBomb) {
        cell.status = CellStatus.Open;
        state.gameStatus = GameStatus.Defeat;
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

      if (isVictory(state.cells)) {
        endGame(state.cells);
        state.gameStatus = GameStatus.Win;
      }
    },

    /** Открывает закрытую клетку c флагом */
    openCellFlag(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      // проверяем что индекс существует и клетка открыта
      if (i < 0 || i > 255 || state.cells[i].status !== CellStatus.Open) return;
      const answer = openEmptyFlags(i, state.cells);
      if (answer) {
        state.cells[answer.index].status = CellStatus.Open;
        state.gameStatus = GameStatus.Defeat;
        endGame(state.cells);
      }
      if (isVictory(state.cells)) {
        endGame(state.cells);
        state.gameStatus = GameStatus.Win;
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

      if (cell.sprite !== CellSprite.QuestionMark)
        cell.status = CellStatus.Guess;
      else cell.status = CellStatus.Close;

      if (cell.sprite === CellSprite.Flag) {
        cell.sprite = CellSprite.QuestionMark;
        state.flagsAmount++;
      } else if (cell.sprite === CellSprite.QuestionMark)
        cell.sprite = CellSprite.Close;
      else {
        if (state.flagsAmount) {
          cell.sprite = CellSprite.Flag;
          state.flagsAmount--;
        }
      }

      if (isVictory(state.cells)) {
        endGame(state.cells);
        state.gameStatus = GameStatus.Win;
      }
    },

    /** Пересоздание игры */
    recreateGame(state: GameState) {
      state.cells = generateCells();
      state.flagsAmount = 40;
      state.isStart = false;
      state.gameStatus = GameStatus.Unknown;
    },

    /** Передаем информацию о зажатости кнопок */
    setActive(state: GameState, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
  },
});

export default GameSlice.reducer;
export const {
  openCell,
  highlightNeighbors,
  setSelected,
  putFlag,
  recreateGame,
  openCellFlag,
  setActive,
} = GameSlice.actions;
