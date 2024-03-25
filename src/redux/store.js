import { configureStore } from "@reduxjs/toolkit";
import bookStoreSlice from "./bookstoreSlice";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistRed = persistReducer(persistConfig, bookStoreSlice);

export const store = configureStore({
  reducer: persistRed,
});

export const persistor = persistStore(store);
