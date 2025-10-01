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

export default function ChatList() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, dateFilter, reloadHomePage, user, isLoggedIn, isSaving } = useSelector((state) => state.user);

  const [chatList, setChatList] = useState([]);

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
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">                
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic1.jpg" alt=""/>
                  </div>
                  <span>Grayson</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic2.jpg" alt=""/>
                  </div>
                  <span>Tenzing</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic3.jpg" alt=""/>
                  </div>
                  <span>Elisha</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic4.jpg" alt=""/>
                  </div>
                  <span>Mitchell</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent active">  
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic5.jpg" alt=""/>
                  </div>
                  <span>Stephon</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic4.jpg" alt=""/>
                  </div>
                  <span>Mitchell</span>
                </Link>
              </div>
              <div className="swiper-slide">
                <Link to="/chat" className="recent"> 
                  <div className="media media-60 rounded-circle">
                    <img src="../src/assets/images/user/pic5.jpg" alt=""/>
                  </div>
                  <span>Stephon</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="title-bar">
            <h6 className="title">Message</h6>
          </div>
          <ul className="message-list">
            {chatList?.map((chat, index) => {
                return (
                  <>
                    <li>
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
                            <span className="date">{chat.last_message?.onlineTimeAgo}</span>
                            <div className="seen-btn active dz-flex-box">
                              <i className="icon feather icon-check"></i>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </>
                );
            })}
            {/* <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic2.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Matt</h6>
                    <p className="last-msg">Is that because we like the...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">4m ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic3.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Karthik</h6>
                    <p className="last-msg">How do you know john?</p>
                  </div>
                  <div className="right-content">
                    <span className="date">8h ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic4.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Elisha</h6>
                    <p className="last-msg">Have you even been...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">1d ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic5.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Wyatt</h6>
                    <p className="last-msg">that so awesome!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">3h ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic6.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Leneve</h6>
                    <p className="last-msg">Is that because we like the...</p>
                  </div>
                  <div className="right-content">
                    <span className="date">5d ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="active">
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic7.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Matt</h6>
                    <p className="last-msg">Would love to!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">2m ago</span>
                    <div className="seen-btn active dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <div className="media media-60">
                  <img src="../src/assets/images/user/pic8.jpg" alt="image"/>
                </div>
                <div className="media-content">
                  <div>
                    <h6 className="name">Wyatt</h6>
                    <p className="last-msg">Would love to!</p>
                  </div>
                  <div className="right-content">
                    <span className="date">4m ago</span>
                    <div className="seen-btn dz-flex-box">
                      <i className="icon feather icon-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </li> */}
          </ul>
        </div>    
      </div>
    </>
  );
}