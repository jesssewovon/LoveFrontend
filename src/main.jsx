import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import * as bootstrap from 'bootstrap'
import './assets/vendor/swiper/swiper-bundle.min.css'
import './assets/css/style.css'
import './assets/css/custom.css'

import App from './App.jsx'
import { BrowserRouter } from "react-router";

import "./i18n"; // 👈 important import

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index.jsx";
console.log('store', store.getState())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
