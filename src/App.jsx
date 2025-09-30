import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
//import './App.css'

import { Routes, Route, useNavigate } from 'react-router';

import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import ScrollPage from './pages/ScrollPage';
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import ChatList from './pages/ChatList';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';
import Filter from './pages/Filter';
import ProfileDetails from './pages/ProfileDetails';
import Donation from './pages/Donation';
import Subscription from './pages/Subscription';
import SubscriptionDetails from './pages/SubscriptionDetails';
import PaymentVerification from './pages/PaymentVerification';

import FirstName from './pages/Registration/FirstName';
import BirthDate from './pages/Registration/BirthDate';
import Gender from './pages/Registration/Gender';
import SexualOrientation from './pages/Registration/SexualOrientation';
import InterestedGender from './pages/Registration/InterestedGender';
import RelationshipGoal from './pages/Registration/RelationshipGoal';
import Images from './pages/Registration/Images';

import Header from './components/Header';
import SideBar from './components/SideBar';

import { ThemeProvider } from "./ThemeContext";

import { AliveScope, KeepAlive } from "react-activation";

import { useSelector, useDispatch } from "react-redux";

import { setIsDarkTheme, setIsLoggedIn, setIsLoading } from "./store/userSlice";
import { updateField } from "./store/profileFormSlice";

import { setNavigator } from "./navigationService";

import { persistor } from "./store/index";
import { useVersionCheck } from "./hooks/useVersionCheck";

import { unstable_HistoryRouter as HistoryRouter } from "react-router";
//import { history } from "./navigationService";

function NavigatorSetter() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return null;
}

function App() {
  // run version check at startup
  useVersionCheck({ persistor });

  const [scrollY, setScrollY] = useState(0);
  const handleSwipe = (direction) => {
    console.log("Swiped:", direction);
  };
  const dispatch = useDispatch();
  const { isDarkTheme, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(setIsDarkTheme(isDarkTheme))
    dispatch(setIsLoading(false))
    //dispatch(setIsLoggedIn(false))
    dispatch(updateField({ field: "images", value: {} }));
  }, [dispatch]);
  return (
    <>
      <ThemeProvider>
        <AliveScope>
          <SideBar/>
          <NavigatorSetter /> {/* ✅ makes navigate available everywhere */}
          {/* <HistoryRouter history={history}> */}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={
                <KeepAlive id="home">
                  <Home savedScroll={scrollY} onSaveScroll={setScrollY} />
                </KeepAlive>
              } />
              <Route path="/about" element={<About />} />
              <Route id="scroll-page" path="/scroll-page" element={
                <KeepAlive>
                  <ScrollPage savedScroll={scrollY} onSaveScroll={setScrollY} />
                </KeepAlive>
              } />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={
                <KeepAlive id="wishlist">
                  <WishList savedScroll={scrollY} onSaveScroll={setScrollY} />
                </KeepAlive>
              } />
              <Route path="/chat-list" element={<ChatList />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/chat/:corresponding_profile_id" element={<Chat />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/profile-details/:id" element={<ProfileDetails />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/subscription-details/:id" element={<SubscriptionDetails />} />
              <Route path="/payment-verification" element={<PaymentVerification />} />
              <Route path="/registration-firstname" element={<FirstName />} />
              <Route path="/registration-birth-date" element={<BirthDate />} />
              <Route path="/registration-gender" element={<Gender />} />
              <Route path="/registration-sexual-orientation" element={<SexualOrientation />} />
              <Route path="/registration-interested-gender" element={<InterestedGender />} />
              <Route path="/registration-relationship-goal" element={<RelationshipGoal />} />
              <Route path="/registration-images" element={<Images />} />
            </Routes>
          {/* </HistoryRouter> */}
        </AliveScope>
      </ThemeProvider>
    </>
  )
}

export default App
