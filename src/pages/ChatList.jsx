import { Link, useNavigate, useParams } from 'react-router';

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

import Loader from '../components/Loader';
import MatchModal from '../components/MatchModal';
import MessageLeft from '../components/MessageLeft';
import MessageRight from '../components/MessageRight';
import api from "../api";

import { signinPiketplace, setIsLoading, setIsSaving } from '../store/userSlice';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ChatList() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, dateFilter, reloadHomePage, user, isLoggedIn, isSaving } = useSelector((state) => state.user);

  const [chatList, setChatList] = useState([]);
  const [onlineList, setOnlineList] = useState([]);

  // Load data on page change
  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-chat-list`);
          console.log(`/get-chat-list`, res.data); // adjust to your API structure
          //setReaction(res.data.reaction);
          setChatList(res.data.chatList.data);
          setOnlineList(res.data.onlineList);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsLoading(false));
  };
  
  const getCorresponder = (chat) => {
      return user.profile.id===chat.sender.id?chat.receiver:chat.sender
  };
  
  if (isLoading) {
    return (
        <>
            <Header showBackButton={true} title={"New Matches"} showWishList={false}/>
            <MenuBar/>
            <div className="page-content space-top p-b65">
                <div className="container fixed-full-area">
                    <div className="flex items-center justify-center h-screen bg-gray-100">
                        <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }

  return (
    <>
      <Header showBackButton={true} title={"New Matches"} showWishList={false}/>
      <MenuBar/>
      <div className="page-content space-top p-b60">
        <div className="container">
          <div className="swiper chat-swiper">
            <Swiper
                spaceBetween={15}
                slidesPerView={'auto'}
                speed={500}
                centeredSlides={true}
                autoplay={false}
                loop={false}
                a11y={false}
                freeMode={true}
                pagination={false}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper get-started"
            >
                {onlineList?.map((profile, index) => (
                    <SwiperSlide key={`online-${profile.id}`}>
                        <Link to={`/chat/${profile?.id}`} className={`recent ${profile.isOnline?'active':''}`}>                
                          <div className="media media-60 rounded-circle">
                            <img src={profile?.imageFirst} alt={profile?.firstname}/>
                          </div>
                          <span>{profile?.firstname}</span>
                        </Link>
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          </div>
          <div className="title-bar">
            <h6 className="title">Message</h6>
          </div>
          <ul className="message-list">
            {chatList?.map((chat, index) => {
                return (
                  <>
                    <li key={index}>
                      <Link to={`/chat/${getCorresponder(chat)?.id}`}>
                        <div className="media media-60">
                          <img src={getCorresponder(chat)?.imageFirst} alt={getCorresponder(chat)?.firstname}/>
                        </div>
                        <div className="media-content">
                          <div>
                            <h6 className="name">{getCorresponder(chat)?.firstname}</h6>
                            <p className="last-msg">{chat.last_message?.message}</p>
                          </div>
                          <div className="right-content">
                            <span className="date">{chat.last_message?.sentTimeAgo}</span>
                            <div className="seen-btn active dz-flex-box">
                              {chat.messages_count===0?
                                (<i className="icon feather icon-check"></i>):
                                chat.messages_count
                              }
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </>
                );
            })}
          </ul>
        </div>    
      </div>
    </>
  );
}