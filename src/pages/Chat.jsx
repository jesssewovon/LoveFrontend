import { Link, useNavigate, useParams } from 'react-router';

import Header from '../components/Header';

import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from 'react';
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

  const [isLoadingNewMessages, setIsLoadingNewMessages] = useState(false);
  const [isLoadingOldMessages, setIsLoadingOldMessages] = useState(false);
  
  const [isTopReached, setIsTopReached] = useState(false);
  const [isBottomReached, setIsBottomReached] = useState(false);

  const [newMessages, setNewMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  
  const getNewMessages = async () => {
      const last_message_id = messages[messages.length-1]?.id
      if (!last_message_id) {
        setIsBottomReached(false)
        return
      }
      console.log("getNewMessages", corresponding_profile_id, last_message_id)
      setIsLoadingNewMessages(true)
      try {
          const res = await api.get(`/get-new-messages/${corresponding_profile_id}`, {params: {last_message_id}});
          console.log(`/get-new-messages`, res.data); // adjust to your API structure
          setNewMessages(res.data.messages);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      setIsBottomReached(false)
      setIsLoadingNewMessages(false)
  };
  const getOldMessages = async () => {
    console.log('in getOldMessages')
      const first_message_id = messages[0]?.id
      if (!first_message_id) {
        setIsTopReached(false)
        return
      }
      setIsLoadingOldMessages(true)
      console.log("getOldMessages", corresponding_profile_id, messages, first_message_id)
      try {
          const res = await api.get(`/get-old-messages/${corresponding_profile_id}`, {params: {first_message_id}});
          console.log(`/get-old-messages`, res.data); // adjust to your API structure
          setOldMessages(res.data.messages);
          //setMessages([...res.data.messages, ...messages]);
          console.log('get-old-messages mess', messages)
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      setIsLoadingOldMessages(false)
      setIsTopReached(false)
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

  const getChatData = async () => {
      console.log("getChatData", corresponding_profile_id)
      setLoading(true);
      try {
          const res = await api.get(`/get-chat-data/${corresponding_profile_id}`);
          console.log(`/get-chat-data`, res.data); // adjust to your API structure
          //setReaction(res.data.reaction);
          setCorrespondingProfile(res.data.corresponding_profile);
          setMessages(res.data.messages);
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      setLoading(false);
      bottomRef.current?.scrollIntoView({behaviour: "smooth"})
  };
  useEffect(() => {
    getChatData()
  }, []);

  
  useEffect(() => {
    //bottomRef.current?.scrollIntoView({behaviour: "smooth"})
    /* window.scrollTo({
      top: document.body.scrollHeight,
      behaviour: "smooth"
    }) */
  }, [messages]);
  useEffect(() => {
    if (!loading) {
      bottomRef.current?.scrollIntoView({behaviour: "smooth"})
    }
    
  }, [loading]);

  useEffect(() => {
   console.log('old loaded messages', messages)
   //setMessages([...oldMessages, ...messages]);
   if (isTopReached) {
    getOldMessages();
   }
   //alert('loaded messages')
  }, [isTopReached]);
  useEffect(() => {
   if (isBottomReached) {
    getNewMessages();
   }
   //alert('loaded messages')
  }, [isBottomReached]);

  useEffect(() => {
   console.log('old loaded messages', messages)
   setMessages([...oldMessages, ...messages]);
  }, [oldMessages]);
  useEffect(() => {
    console.log('new loaded messages', messages)
   setMessages([...messages, ...newMessages]);
   
   setTimeout(() => {
      bottomRef.current?.scrollIntoView({behaviour: "smooth"})
    }, 1000);
  }, [newMessages]);

  useEffect(() => {
    const options = {
      root: containerRef.current, // the scrollable div
      rootMargin: "0px",
      threshold: 0.1,
    };

    const topObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("🔼 Top visible → load older messages", messages, isTopReached);
          setIsTopReached(true)
          //alert('top')
        }
      });
    }, options);

    const bottomObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("🔽 Bottom visible → load newer messages", messages, isBottomReached);
          setIsBottomReached(true)
          //alert('bottom')
        }
      });
    }, options);

    if (topRef.current) topObserver.observe(topRef.current);
    if (bottomRef.current) bottomObserver.observe(bottomRef.current);

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [loading]);

  return (
    <>
      {loading?
        (<div className="page-content space-top p-b65">
                    <div className="container fixed-full-area">
                        <div className="flex items-center justify-center h-screen bg-gray-100">
                            <div className="" style={{width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                            </div>
                        </div>
                    </div>
                </div>):
        (<>
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
            <div className="container" style={{overflowY: "hidden"}}>
              <div className="chat-box-area"
                ref={containerRef}
                style={{
                  //height: "80vh",
                  height: "calc(100vh - 120px)",
                  /* height: "calc(400px)",
                  width: "100%", */
                  overflowY: "auto",
                  //border: "1px solid #ccc",
                }}
              >
                {/* top sentinel */}
                <div ref={topRef} style={{ height: 1 }} />
                {isLoadingOldMessages && (<div style={{width: "100%", textAlign: "center"}}>
                  <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent", margin: "auto"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                </div>)}

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

                {isLoadingNewMessages && (<div style={{width: "100%", textAlign: "center"}}>
                  <svg className="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shaperendering: "auto", display: "block", background: "transparent", margin: "auto"}} width="50" height="50" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" fill="none" cy="50" cx="50"><animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform></circle><g></g></g></svg>
                </div>)}
                {/* bottom sentinel */}
                <div ref={bottomRef} style={{ height: 1 }} />
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
          </footer></>
        )
      }
    </>
  );

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
                <div className="chat-box-area" ref={containerRef}>
                  <div ref={topRef} style={{ height: 1 }} />
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
                  <div ref={bottomRef} style={{ height: 1 }} />
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