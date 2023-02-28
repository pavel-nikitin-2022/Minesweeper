import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
