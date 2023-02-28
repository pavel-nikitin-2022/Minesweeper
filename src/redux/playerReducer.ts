import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayerState = {
  isMouseDown: boolean;
};

const initialState: PlayerState = {
  isMouseDown: false
};

const PlayerSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setMouseDown(state: PlayerState, action: PayloadAction<boolean>) {
      state.isMouseDown = action.payload;
    }
  }
});

export default PlayerSlice.reducer;
export const { setMouseDown } = PlayerSlice.actions;
