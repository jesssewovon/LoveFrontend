// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

/*import cartReducer from "./cartSlice";*/
import userReducer from "./userSlice";
import profileFormReducer from "./profileFormSlice";

const persistConfig = {
  key: "root",
  storage,
  //whitelist: ["cart", "auth"], // only persist these reducers
  whitelist: ["user", "profileForm"], // only persist these reducers
};

const rootReducer = combineReducers({
  /*cart: cartReducer,*/
  user: userReducer,
  profileForm: profileFormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 disables warnings
    }),
});

export const persistor = persistStore(store);
