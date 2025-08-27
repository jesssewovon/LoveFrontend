import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
//import './App.css'

import { Routes, Route, useNavigate } from 'react-router';

import Home from './pages/Home';
import About from './pages/About';
import ScrollPage from './pages/ScrollPage';
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import ChatList from './pages/ChatList';
import Explore from './pages/Explore';
import Chat from './pages/Chat';

import Header from './components/Header';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';

import { ThemeProvider } from "./ThemeContext";

import { AliveScope, KeepAlive } from "react-activation";

import { useSelector, useDispatch } from "react-redux";

import { setIsDarkTheme, setIsLoggedIn } from "./varsSlice";

import React from "react";
import { setNavigator } from "./navigationService";

function NavigatorSetter() {
  const navigate = useNavigate();
  React.useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return null;
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const handleSwipe = (direction) => {
    console.log("Swiped:", direction);
  };
  const dispatch = useDispatch();
  const { isDarkTheme, user } = useSelector((state) => state.vars);
  useEffect(() => {
    dispatch(setIsDarkTheme(isDarkTheme))
    //dispatch(setIsLoggedIn(false))
  }, [dispatch]);
  return (
    <>
      <ThemeProvider>
        <AliveScope>
          <SideBar/>
          <NavigatorSetter /> {/* ✅ makes navigate available everywhere */}
          <Routes>
            <Route path="/" element={
              <KeepAlive>
                <Home savedScroll={scrollY} onSaveScroll={setScrollY} />
              </KeepAlive>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/scroll-page" element={
              <KeepAlive>
                <ScrollPage savedScroll={scrollY} onSaveScroll={setScrollY} />
              </KeepAlive>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/chat-list" element={<ChatList />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <MenuBar/>
        </AliveScope>
      </ThemeProvider>
    </>
  )
}

export default App
