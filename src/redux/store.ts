import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game.reducer";

const rootReducer = combineReducers({
  cells: gameReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
