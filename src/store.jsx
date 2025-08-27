// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

/*import cartReducer from "./cartSlice";*/
import varsReducer from "./varsSlice";

const persistConfig = {
  key: "root",
  storage,
  //whitelist: ["cart", "auth"], // only persist these reducers
  whitelist: ["vars"], // only persist these reducers
};

const rootReducer = combineReducers({
  /*cart: cartReducer,*/
  vars: varsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
