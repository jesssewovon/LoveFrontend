// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

/*import cartReducer from "./cartSlice";*/
import userReducer from "./userSlice";
import profileFormReducer from "./profileFormSlice";

import { initialState as profileFormInitialState } from "./profileFormSlice"; // export it

const persistConfig = {
  key: "root",
  version: 3, // bump this
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

const rehydrateAuth = () => {
  const data = localStorage.getItem("profileForm");
  const version = localStorage.getItem("app_version");
  console.log('dataaaaaaaaaaaaaaa', data, version, profileFormInitialState)
  return data ? { ...profileFormInitialState, ...JSON.parse(data) } : profileFormInitialState;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 disables warnings
    }),
  preloadedState: {
    profileForm: profileFormInitialState,
  },
});

export const persistor = persistStore(store);
