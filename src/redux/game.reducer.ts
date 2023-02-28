import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CellType = {
  isBomb: boolean;
  nearBombs: number;
  open: boolean;
  index: number;
  selected: boolean;
};

export type GameState = {
  cells: CellType[];
};

const initialState: GameState = {
  cells: generateCells()
};

const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    // подстветить неоткрытых соседей открытой клетки
    selectNeighbors(state: GameState, action: PayloadAction<{index: number, status: boolean}>) {
      const i = action.payload.index;
      if (i < 0 || i > 255 || !state.cells[i].open) return;
      // все клетки
      if (i - 16 > 0 && !state.cells[i - 16].open)
        state.cells[i - 16].selected = action.payload.status;
      if (i + 16 < 256 && !state.cells[i + 16].open)
        state.cells[i + 16].selected = action.payload.status;

      // не правые крайние
      if ((i + 1) % 16) {
        if (i - 15 > 0 && !state.cells[i - 15].open)
          state.cells[i - 15].selected = action.payload.status;
        if (i + 1 < 256 && !state.cells[i + 1].open)
          state.cells[i + 1].selected = action.payload.status;
        if (i + 17 < 256 && !state.cells[i + 17].open)
          state.cells[i + 17].selected = action.payload.status;
      }
      // не левые крайние
      if (i % 16) {
        if (i + 15 < 256 && !state.cells[i + 15].open)
          state.cells[i + 15].selected = action.payload.status;
        if (i - 1 > 0 && !state.cells[i - 1].open)
          state.cells[i - 1].selected = action.payload.status;
        if (i - 17 > 0 && !state.cells[i - 17].open)
          state.cells[i - 17].selected = action.payload.status;
      }
    },

    // открыть клетку
    openCell(state: GameState, action: PayloadAction<number>) {
      const i = action.payload;
      if (i < 0 || i > 255 || state.cells[i].open) return;
      state.cells[i].open = true;
    }

    // открывает все пустые клетки вогруг выбранной пустой
    // openEmptiesCells(state: GameState, action: PayloadAction<number>) {
    // }
  }
});

// todo генерация поля перенести в ./utils
function* generator(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function generateCells() {
  const bombsIndex = [...Array(256).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);

  const cellsProto = Array.from(generator(0, 256)).map(i => {
    return {
      isBomb: false,
      nearBombs: 0,
      open: false,
      index: i,
      selected: false,
    };
  });

  bombsIndex.forEach(i => {
    cellsProto[i].isBomb = true;
    cellsProto[i].nearBombs = 0;

    // все клетки
    if (i - 16 >= 0 && !cellsProto[i - 16].isBomb)
      cellsProto[i - 16].nearBombs++;
    if (i + 16 < 256 && !cellsProto[i + 16].isBomb)
      cellsProto[i + 16].nearBombs++;

    // не правые крайние
    if ((i + 1) % 16) {
      if (i + 1 < 256 && !cellsProto[i + 1].isBomb)
        cellsProto[i + 1].nearBombs++;
      if (i + 17 < 256 && !cellsProto[i + 17].isBomb)
        cellsProto[i + 17].nearBombs++;
      if (i - 15 >= 0 && !cellsProto[i - 15].isBomb)
        cellsProto[i - 15].nearBombs++;
    }
    // не левые крайние
    if (i % 16) {
      if (i + 15 < 256 && !cellsProto[i + 15].isBomb)
        cellsProto[i + 15].nearBombs++;
      if (i - 1 >= 0 && !cellsProto[i - 1].isBomb)
        cellsProto[i - 1].nearBombs++;
      if (i - 17 >= 0 && !cellsProto[i - 17].isBomb)
        cellsProto[i - 17].nearBombs++;
    }
  });

  return cellsProto;
}

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
export const { openCell, selectNeighbors } = GameSlice.actions;
