import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findNeighbors } from "../utils/findNeighbors";
import { generateCells } from "../utils/generateBoard";

export enum CellStates {
  Close = "close",
  Selected = "selected",
  Bomb = "bomb",
  Flag = "flag",
  Question = "question",
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8
}

export enum CellStatuses {
  Open = "open",
  Guess = "guess",
  Close = "close"
}

export interface ICell {
  isBomb: boolean;
  nearBombs: number;
  status: CellStatuses;
  index: number;
  state: CellStates;
}

export type GameState = {
  cells: ICell[];
};

const initialState: GameState = {
  cells: generateCells()
};

function toCellState(bombs: number) {
  switch (bombs) {
    case 1:
      return CellStates.One;
    case 2:
      return CellStates.Two;
    case 3:
      return CellStates.Three;
    case 4:
      return CellStates.Four;
    case 5:
      return CellStates.Five;
    case 6:
      return CellStates.Six;
    case 7:
      return CellStates.Seven;
    case 8:
      return CellStates.Eight;
    default:
      return null;
  }
}

const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    // подстветить неоткрытых соседей открытой клетки
    selectNeighbors(
      state: GameState,
      action: PayloadAction<{ index: number; status: boolean }>
    ) {
      const i = action.payload.index;
      if (i < 0 || i > 255 || state.cells[i].status === CellStatuses.Close) return;
      const cellState = action.payload.status
        ? CellStates.Selected
        : CellStates.Close;

      findNeighbors(i, state.cells)?.forEach(index => {
        if (state.cells[index].status === CellStatuses.Close) state.cells[index].state = cellState;
      });
    },

    // открыть клетку
    openCell(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      if (i < 0 || i > 255 || state.cells[i].status === CellStatuses.Open) return;
      if (state.cells[i].isBomb) {
        state.cells[i].status = CellStatuses.Open;
        state.cells[i].state = CellStates.Bomb;
      } else if (state.cells[i].nearBombs) {
        state.cells[i].status = CellStatuses.Open;
        const newState = toCellState(state.cells[i].nearBombs);
        if (newState) state.cells[i].state = newState;
      } else openEmpty(i, state.cells);
    },

    // подсветить по нажатию
    setSelected(
      state: GameState,
      action: PayloadAction<{ index: number; status: boolean }>
    ) {
      const i = action.payload.index;
      const cellState = action.payload.status
        ? CellStates.Selected
        : CellStates.Close;
      if (i < 0 || i > 255 || state.cells[i].status === CellStatuses.Open) return;
      state.cells[i].state = cellState;
    },

    // отметить бомбу
    putFlag(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      if (i < 0 || i > 255 || state.cells[i].status === CellStatuses.Open) return;

      if (state.cells[i].state !== CellStates.Question) 
        state.cells[i].status = CellStatuses.Guess;
      else state.cells[i].status = CellStatuses.Close;

      if (state.cells[i].state === CellStates.Flag)
        state.cells[i].state = CellStates.Question;
      else if (state.cells[i].state === CellStates.Question) 
        state.cells[i].state = CellStates.Close;
      else state.cells[i].state = CellStates.Flag;
    }
  }
});

function openEmpty(index: number, array: ICell[]) {
  if (index < 0 || index > 255 || array[index].status === CellStatuses.Open) return;
  array[index].status = CellStatuses.Open;
  if (array[index].nearBombs) {
    const newState = toCellState(array[index].nearBombs);
    if (newState) array[index].state = newState;
    return;
  }

  array[index].state = CellStates.Selected;
  findNeighbors(index, array)?.forEach(i => {
    openEmpty(i, array);
  });
}

export default GameSlice.reducer;
export const {
  openCell,
  selectNeighbors,
  setSelected,
  putFlag
} = GameSlice.actions;
