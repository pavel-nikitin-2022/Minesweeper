import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findNeighbors } from "../utils/findNeighbors";
import { generateCells } from "../utils/generateBoard";

export enum CellStates {
  Close = "close",
  Selected = "selected",
  Bomb = "bomb",
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
}

export interface ICell {
  isBomb: boolean;
  nearBombs: number;
  open: boolean;
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
    case 1: return CellStates.One;
    case 2: return CellStates.Two;
    case 3: return CellStates.Three;
    case 4: return CellStates.Four;
    case 5: return CellStates.Five;
    case 6: return CellStates.Six;
    case 7: return CellStates.Seven;
    case 8: return CellStates.Eight;
    default: return null;
  }
}

const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    // подстветить неоткрытых соседей открытой клетки
    selectNeighbors(state: GameState, action: PayloadAction<{index: number, status: boolean}>) {
      const i = action.payload.index;
      if (i < 0 || i > 255 || !state.cells[i].open) return;
      const cellState = action.payload.status ? CellStates.Selected : CellStates.Close;

      findNeighbors(i, state.cells)?.forEach((index) => {
        if (!state.cells[index].open)
          state.cells[index].state = cellState;
      });
    },

    // открыть клетку
    openCell(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      if (i < 0 || i > 255 || state.cells[i].open) return;
      state.cells[i].open = true;
      if (state.cells[i].isBomb)
        state.cells[i].state = CellStates.Bomb;
      else if (state.cells[i].nearBombs) {
        const newState = toCellState(state.cells[i].nearBombs);
        if (newState) state.cells[i].state = newState;
      }
      else state.cells[i].state = CellStates.Selected;
    },

    // подсветить по нажатию
    setSelected(state: GameState, action: PayloadAction<{index: number, status: boolean}>) {
      const i = action.payload.index;
      const cellState = action.payload.status ? CellStates.Selected : CellStates.Close;
      if (i < 0 || i > 255 || state.cells[i].open) return;
      state.cells[i].state = cellState;
    }
  }
});

// function openEmpty(index: number, array: CellType[]) {
//   if (index < 0 || index > 255 || array[index].open) return;
//   if (array[index].nearBombs) {
//     array[index].open = true;
//     return;
//   }

//   openEmpty(index - 17, array);
//   openEmpty(index - 16, array);
//   openEmpty(index - 15, array);

//   openEmpty(index + 17, array);
//   openEmpty(index + 16, array);
//   openEmpty(index + 15, array);

//   openEmpty(index - 1, array);
// }
// todo конец генерации

export default GameSlice.reducer;
export const { openCell, selectNeighbors, setSelected } = GameSlice.actions;
