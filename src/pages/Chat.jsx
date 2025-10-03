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
import MessageLeft from '../components/MessageLeft';
import MessageRight from '../components/MessageRight';
import api from "../api";

import moment from 'moment';

import { signinPiketplace, setIsLoading, setIsSaving } from '../store/userSlice';

export default function Chat() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { corresponding_profile_id } = useParams();
  const { isLoading, dateFilter, reloadHomePage, user, isLoggedIn, isSaving } = useSelector((state) => state.user);

  const [reaction, setReaction] = useState({});
  const [correspondingProfile, setCorrespondingProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const getChatData = async () => {
      console.log("getChatData", corresponding_profile_id)
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-chat-data/${corresponding_profile_id}`);
          console.log(`/get-chat-data`, res.data); // adjust to your API structure
          //setReaction(res.data.reaction);
          setCorrespondingProfile(res.data.corresponding_profile);
          setMessages(res.data.messages);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsLoading(false));
  };
  const getNewMessages = async () => {
      const first_message_id = messages[messages.length-1]?.id
      console.log("getNewMessages", corresponding_profile_id)
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-new-messages/${corresponding_profile_id}`, {params: {first_message_id}});
          console.log(`/get-chat-data`, res.data); // adjust to your API structure
          setMessages(...res.data.messages.data, ...messages);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsLoading(false));
  };
  const getOldMessages = async () => {
      const last_message_id = messages[0]?.id
      console.log("getOldMessages", corresponding_profile_id)
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-old-messages/${corresponding_profile_id}`, {params: {last_message_id}});
          console.log(`/get-chat-data`, res.data); // adjust to your API structure
          setMessages(...messages, ...res.data.messages.data);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsLoading(false));
  };
  const sendMessage = async () => {
      //alert(messageText)
      console.log("sendMessage", corresponding_profile_id)
      dispatch(setIsSaving(true));
      try {
          const res = await api.post(`/send-message`, {corresponding_profile_id, messageText});
          console.log(`/send-message`, res.data); // adjust to your API structure
          if (res.data.status === true) {
            setMessageText('')
          }
          setCorrespondingProfile(res.data.corresponding_profile);
          setMessages(res.data.messages);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      dispatch(setIsSaving(false));
  };

  const handleMessageInput = (e) => {
      setMessageText(e.target.value)
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
                    <a style={{position: "relative"}} className="media media-40 rounded-circle me-3">
                      <img src={correspondingProfile?.imageFirst} alt="/"/>
                      {correspondingProfile?.isOnline && (<span style={{position: "absolute", width: "10px", height: "10px", backgroundColor: "#55D866", bottom: "0", left: "0", borderRadius: "50%", border: "1px solid #000"}}></span>)}
                    </a>
                    <div>
                      <h6 className="title">{correspondingProfile?.firstname}, {correspondingProfile?.age}</h6>
                      {correspondingProfile?.isOnline ?
                        (<span>Online</span>):
                        (<span>{correspondingProfile.onlineTimeAgo}</span>)
                      }
                    </div>  
                  </div>
                  <div className="right-content d-flex align-items-center">
                    <a className="dz-icon btn btn-primary light">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                    <a className="dz-icon me-0 btn btn-primary light">
                      <i className="fa-solid fa-video"></i>
                    </a>
                  </div>
                </div>
              </div>
            </header>
            <div className="page-content space-top p-b60 message-content">
              <div className="container"> 
                <div className="chat-box-area">
                  {messages?.map((message, index) => {
                      return (
                        <>
                          {
                            !messages[index-1]?.created_at?.includes(message.created_at.substr(0, 10)) &&
                            (
                              <div style={{textAlign: "center"}}>
                                <span className="active-date">
                                  {moment(message.created_at).format('ll')}
                                </span>
                              </div>
                            )
                          }
                          {
                            message.sender_profiles_id==user.profile.id?
                            (<MessageRight key={`right-${index}`} message={message.message} time={moment(message.created_at).format('LT')}/>)
                            :(<MessageLeft key={`left-${index}`} message={message.message} time={moment(message.created_at).format('LT')}/>)
                          }
                        </>
                      );
                  })}
                </div>
              </div> 
            </div>
            <footer className="footer border-top fixed bg-white">
                <div className="container p-2">
                    <div className="chat-footer">
                        <div>
                            <div className="form-group">
                                <div className="input-wrapper message-area" style={{display: "flex", alignItems: "center"}}>
                                    <div className="append-media"></div>
                                    <input value={messageText} onChange={handleMessageInput} type="text" className="form-control" placeholder="Send message..." style={{border: "0", height: "45px", marginRight: "15px"}}/>
                                    <button disabled={messageText==''} onClick={sendMessage} className="btn-chat" style={{border: "0"}}>
                                      {isSaving!==true?(<i className="icon feather icon-send"></i>):
	    	                              (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="34" height="34" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#fff" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </footer>
          </>
        )
      }
    </>
  );
}