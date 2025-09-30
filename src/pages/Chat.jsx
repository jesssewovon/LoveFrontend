import { Link, useNavigate, useParams } from 'react-router';

import Header from '../components/Header';

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

import Loader from '../components/Loader';
import MatchModal from '../components/MatchModal';
import api from "../api";

import { signinPiketplace, setIsLoading } from '../store/userSlice';

export default function Chat() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { corresponding_profile_id } = useParams();
  const { isLoading, dateFilter, reloadHomePage, user, isLoggedIn } = useSelector((state) => state.user);

  const [reaction, setReaction] = useState({});
  const [correspondingProfile, setCorrespondingProfile] = useState({});
  const [messages, setMessages] = useState([]);

  const getChatData = async () => {
      console.log("getChatData", corresponding_profile_id)
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-chat-data/${corresponding_profile_id}`);
          console.log(`/get-chat-data`, res.data); // adjust to your API structure
          //setReaction(res.data.reaction);
          setCorrespondingProfile(res.data.corresponding_profile);
          setMessages(res.data.messages.data);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsLoading(false));
  };

  // Load data on page change
  useEffect(() => {
    getChatData();
  }, []);

  return (
    <>
      {isLoading?(
          <div className="page-content space-top p-b65">
              <div className="container fixed-full-area">
                  <div className="flex items-center justify-center h-screen bg-gray-100">
                      <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                      </div>
                  </div>
              </div>
          </div>
        ):(
          <>
            <header className="header header-fixed bg-white">
              <div className="container">
                <div className="header-content">
                  <div className="left-content me-3">
                    <a onClick={() => navigate(-1)} className="back-btn">
                      <i className="icon feather icon-chevron-left"></i>
                    </a>
                  </div>
                  <div className="mid-content d-flex align-items-center text-start">
                    <a href="javascript:void(0);" className="media media-40 rounded-circle me-3">
                      <img src={correspondingProfile?.imageFirst} alt="/"/>
                    </a>
                    <div>
                      <h6 className="title">{correspondingProfile?.firstname}, {correspondingProfile?.age}</h6>
                      <span>Online 24m ago</span>
                    </div>  
                  </div>
                  <div className="right-content d-flex align-items-center">
                    <a href="javascript:void(0);" className="dz-icon btn btn-primary light">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a href="javascript:void(0);" className="dz-icon me-0 btn btn-primary light">
                      <i className="fa-solid fa-video"></i>
                    </a>
                  </div>
                </div>
              </div>
            </header>
            <div className="page-content space-top p-b60 message-content">
              <div className="container"> 
                <div className="chat-box-area"> 
                  <div className="chat-content">
                    <div className="message-item">
                      <div className="bubble">Hi Richard , thanks for adding me</div>    
                      <div className="message-time">08:35</div>    
                    </div>
                  </div>
                  <div className="chat-content user">
                    <div className="message-item">
                      <div className="bubble">Hi Miselia , your welcome , nice to meet you too</div>    
                      <div className="message-time">08:40</div>    
                    </div>
                  </div>
                  <div className="chat-content">
                    <div className="message-item">
                      <div className="bubble">I look you're singer, can you sing for me</div>    
                      <div className="message-time">9:44 AM</div>    
                    </div>
                  </div>
                  <div className="chat-content user">
                    <div className="message-item">
                      <div className="bubble">Sure</div>    
                      <div className="message-time">9.30 AM</div>    
                    </div>
                  </div>
                  <div className="chat-content">
                    <div className="message-item">
                      <div className="bubble">Really!</div>    
                      <div className="message-time">10:44 AM</div>    
                    </div>
                  </div>
                  <div className="chat-content user">
                    <div className="message-item">
                      <div className="bubble">Why not</div>    
                      <div className="message-time">10:44 AM</div>    
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            <footer className="footer border-top fixed bg-white">
                <div className="container p-2">
                    <div className="chat-footer">
                        <form>
                            <div className="form-group">
                                <div className="input-wrapper message-area">
                      <div className="append-media"></div>
                                    <input type="text" className="form-control" placeholder="Send message..."/>
                                    <a href="javascript:void(0);" className="btn-chat">
                                      <i className="icon feather icon-send"></i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>    
                </div>
            </footer>
          </>
        )
      }
    </>
  );
}