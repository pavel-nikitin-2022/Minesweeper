import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";

const rootReducer = combineReducers({
  player: playerReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
