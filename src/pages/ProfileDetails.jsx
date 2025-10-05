import { Link, useParams } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace, setIsLoading, setShowScreenLoader } from '../store/userSlice';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../components/Loader';
import MatchModal from '../components/MatchModal';
import ScreenLoader from "../components/ScreenLoader";

import { navigate } from "../navigationService";

import api from "../api";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ProfileDetails() {
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);

  const [profile, setProfile] = useState({});
  const [reaction, setReaction] = useState({});

  const [subscriptionData, setSubscriptionData] = useState(user?.profile?.subscriptionData);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendReaction = async (id, type) => {
      console.log('sendReaction', id, type)
      dispatch(setShowScreenLoader(true))
      //alert('sendReaction')
      const res = await api.post(`/save-one-reaction`, {id, type})
      dispatch(setShowScreenLoader(false))
      if (res.data.status === true) {
          //alert('success')
          MySwal.fire({ 
              title: "Info!",
              text: res.data.message,
              icon: "success",
              showConfirmButton: true,
              timer: 1500
          });
          if (res.data.is_match === true) {
            setReaction(res.data.reaction)
            handleShow()
          }
      }else{
          MySwal.fire({ 
              title: "Info!",
              text: t('an_error_occured'),
              icon: "error",
              showConfirmButton: true,
              timer: 1500
          });
      }
  };

  const getProfileDetails = async () => {
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`/get-profile-details/${id}`);
          console.log(`/get-profile-details`, res.data); // adjust to your API structure
          setProfile(res.data.profile); // adjust to your API structure
          //setInterestsForm(res.data.interest_form); // adjust to your API structure
          //setRelationshipGoals(res.data.relationship_goals); // adjust to your API structure
          //setSexualOrientation(res.data.sexual_orientation_form); // adjust to your API structure
          //setGenders(res.data.genders); // adjust to your API structure
      } catch (err) {
          console.error("Error fetching users:", err);
      }
      console.log('profile', profile)
      dispatch(setIsLoading(false));
  };

  const messageBeforeMatching = async () => {
    dispatch(setShowScreenLoader(true))
    const corresponding_profile_id = profile.id
    const res = await api.post(`message-before-matching`, {corresponding_profile_id})
    dispatch(setShowScreenLoader(false))
    if (res.data.status === true) {
      navigate(`/chat/${corresponding_profile_id}`)
    }else{
      MySwal.fire({ 
          title: "Info!",
          text: res.data.message,
          icon: "error",
          showConfirmButton: true,
      });
    }
  };

  // Load data on page change
  useEffect(() => {
    getProfileDetails();
  }, []);

  if (isLoading) {
      return (
          <>
              <Header showBackButton={true} title={"Profile Details"} showWishList={false}/>
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
      <Header showBackButton={true} title={"Profile Details"} showWishList={false} classes={"bg-white"}/>
      <div className="page-content space-top p-b40">
        <div className="container">
          <div className="detail-area">
            <div className="dz-media-card style-2">
              <div className="dz-media swiper subscription-swiper2">
                {/* <img src={profile?.imageFirst} alt={profile.firstname}/> */}
                <Swiper
                  spaceBetween={30}
                  speed={1500}
                  centeredSlides={true}
                  autoplay={{
                      delay: 2000,
                      disableOnInteraction: true,
                  }}
                  pagination={{
                      clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper get-started"
                >
                  <SwiperSlide key={`slider1`}>
                    <div className="dz-media">
                      <img src={profile?.images?.image1} alt={``}/>
                    </div>
                  </SwiperSlide>
                  {profile?.images?.image2 && (<SwiperSlide key={`slider2`}>
                    <div className="dz-media">
                      <img src={profile?.images?.image2} alt={``}/>
                    </div>
                  </SwiperSlide>)}
                  {profile?.images?.image3 && (<SwiperSlide key={`slider3`}>
                    <div className="dz-media">
                      <img src={profile?.images?.image3} alt={``}/>
                    </div>
                  </SwiperSlide>)}
                </Swiper>
                <div className="swiper-btn">
                  <div className="swiper-pagination style-1 flex-1"></div>
                </div>
              </div>
              <div className="dz-content">
                <div className="left-content">
                  <h4 className="title">{profile.firstname}, {profile.age}</h4>
                  {profile.distance && (<p className={`mb-0 ${(!subscriptionData || !subscriptionData['unlimited likes']) && remainingFreeSwiping<=0?'text-blur':''}`}>
                    <i className="icon feather icon-map-pin"></i>
                    &nbsp; {profile.distance} km away
                  </p>)}
                  {profile.interests?.length && (
                    <ul class="intrest">
                      <li><span class="badge">Photography</span></li>
                      {profile.interests?.map((name, index) => {
                          return (
                              <li key={index}><span class="badge">{name}</span></li>
                          );
                      })}
                    </ul>
                  )}
                </div>
                {/* <a href="javascript:void(0);" className="dz-icon">
                  <i className="flaticon flaticon-star-1"></i>
                </a> */}
                <a onClick={()=>{messageBeforeMatching(profile)}} className="dz-icon" style={{width: "50px", height: "50px", borderRadius: "50%", background :"var(--btn-gradient)", color: "#fff"}}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 11.5V15.5C22 19 20 20.5 17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H12" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.7" d="M7 9L10.13 11.5C11.16 12.32 12.85 12.32 13.88 11.5" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.7" d="M19.4792 2.81994L19.7592 3.38993C19.8992 3.66993 20.2492 3.92994 20.5592 3.98994L20.9392 4.04994C22.0792 4.23994 22.3492 5.07994 21.5292 5.90994L21.1792 6.25993C20.9492 6.49993 20.8192 6.95993 20.8892 7.27993L20.9392 7.48994C21.2492 8.86994 20.5192 9.39993 19.3192 8.67993L19.0592 8.52993C18.7492 8.34993 18.2492 8.34993 17.9392 8.52993L17.6792 8.67993C16.4692 9.40993 15.7392 8.86994 16.0592 7.48994L16.1092 7.27993C16.1792 6.95993 16.0492 6.49993 15.8192 6.25993L15.4692 5.90994C14.6492 5.07994 14.9192 4.23994 16.0592 4.04994L16.4392 3.98994C16.7392 3.93994 17.0992 3.66993 17.2392 3.38993L17.5192 2.81994C18.0592 1.72994 18.9392 1.72994 19.4792 2.81994Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </a>
              </div>
            </div>
            <div className="detail-bottom-area">
              {profile.about_me && (<div className="about">
                <h6 className="title">About me</h6>
                <p className="para-text">{profile.about_me}</p>					
              </div>)}
              {profile.interests?.length && (
                <div className="intrests mb-3">
                  <h6 className="title">Interests</h6>
                  <ul className="dz-tag-list">
                    {/* <li> 
                      <div className="dz-tag">
                        <i className="icon feather icon-camera"></i>
                        <span>Photography</span>
                      </div>
                    </li> */}
                    {profile.interests?.map((name, index) => {
                        return (
                            <li key={index}>
                              <div className="dz-tag">
                                {/* <i className="icon feather icon-camera"></i> */}
                                <span>{t(name)}</span>
                              </div>
                            </li>
                        );
                    })}
                  </ul>
                </div>
              )}
              <div className="languages mb-3">
                <h6 className="title">Languages</h6>
                <ul className="dz-tag-list">
                  <li> 
                    <div className="dz-tag">
                      <span>English</span>
                    </div>
                  </li>
                  <li> 
                    <div className="dz-tag">
                      <span>Spanish</span>
                    </div>
                  </li>
                  <li> 
                    <div className="dz-tag">
                      <span>German</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer fixed">
        <div className="dz-icon-box">
          <a onClick={() => sendReaction(id, 'dislike')} className="icon dz-flex-box dislike">
            <i className="flaticon flaticon-cross font-18"></i>
          </a>
          {/* <a className="icon dz-flex-box super-like">
            <i className="fa-solid fa-star"></i>
          </a> */}
          <a onClick={() => sendReaction(id, 'like')} className="icon dz-flex-box like">
            <i className="fa-solid fa-heart"></i>
          </a>
        </div>
      </div>
      <MatchModal reaction={reaction} show={show} onHide={handleClose}/>
      <ScreenLoader/>
    </>
  );
}