import { Link } from 'react-router';

import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { setIsLoading, setIsSaving, setDateFilter,
  setUser, setReloadHomePage, changeLanguage, piPayment, 
} from "../store/userSlice";
//import { navigate } from "../navigationService";
import { useNavigate } from 'react-router';
import api from "../api";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Filter() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {t} = useTranslation()
  const { isLoggedIn, isLoading, user, dateFilter } = useSelector((state) => state.user);

  const swiperRef = useRef();
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(0);

  // Get my profile from API
  const getSubscriptions = async () => {
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`get-subscriptions`);
          console.log(`get-subscriptions`, res.data); // adjust to your API structure
          setSubscriptions(res.data.subscriptions)
      } catch (err) {
          console.error("Error :", err);
      }
      dispatch(setIsLoading(false));
  };

  // Load data on page change
  useEffect(() => {
    getSubscriptions();
    console.log('swiperRef', swiperRef)
    //dispatch(changeLanguage('fr'))
  }, []);

  const makePayment = (subscription) => {
      //alert('makepaiement')
      dispatch(piPayment({
          amount: subscription.amount,
          memo: `Subscription ${subscription.name}`,
          metadata: {
              userId: user.id,
              type: 'subscription',
              subscription_id: subscription.id,
          },
      }));
  };

  if (isLoading) {
      return (
          <>
              <Header showBackButton={true} title={"My subscription"} showWishList={false}/>
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
      <Header showBackButton={true} title={"My subscription"} showWishList={false}/>
      <div class="page-content space-top p-b60">
        <div class="container"> 
          <div class="dz-subscribe-area">
            <div class="subscribe-area-top">
              <div class="swiper subscription-swiper2">
                <Swiper
                    ref={swiperRef}
                    onSlideChange={(swiper) => {
                      //alert(swiper.activeIndex)
                      setActiveSubscription(swiper.activeIndex)
                    }}
                    spaceBetween={30}
                    speed={1500}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper get-started"
                >
                    {subscriptions?.map((subscription, index) => (
                        <SwiperSlide key={subscription.id}>
                            <div className={`subscribe-box ${index%2==0?'plus':'platinum'}`}>
                              <h3 className="title">{subscription.name}</h3>
                              {/* <div className="badge">PLUS</div> */}
                            </div>
                        </SwiperSlide>
                      ))
                    }
                </Swiper>
                <div className="swiper-btn">
                  <div className="swiper-pagination style-1 flex-1"></div>
                </div>
              </div>
            </div>
            {subscriptions?.map((subscription, index) => (
                activeSubscription === index && (<div key={subscription.id} className={`subscribe-content ${index%2==0?'plus':'platinum'}`}>
                  <ul class="pricing-data">
                    {
                      subscription?.contents?.map((content, index1) => (
                        <li className="list-true">
                          {((content.item.type=='boolean' && content.value==1)) && (<i className="icon feather icon-check"></i>)}
                          {((content.item.type=='boolean' && content.value==0) || (content.item.type=='int' && content.value==0)) && (<i className="icon feather icon-lock"></i>)}
                          {(content.item.type=='int' && content.value!=0 && content.value!=-1) && (<i>{content.value}</i>)}
                          <span>{content.name}</span>
                        </li>
                      ))
                    }
                    {/* <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Unlimited Likes</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>See Who Likes You</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>Priority Likes</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Unlimited Rewinds</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>1 Free Boost per month</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>5 Free Super Likes per week</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>Message Before Matching</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Passport</span>
                    </li>
                    <li class="list-false">
                      <i class="icon feather icon-lock"></i>
                      <span>Top Picks</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Control Your Profile</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Control Who Sees You</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Control Who You See</span>
                    </li>
                    <li class="list-true">
                      <i class="icon feather icon-check"></i>
                      <span>Hide Ads</span>
                    </li> */}
                  </ul>
                  <div className="bottom-btn container bg-white text-center px-5">
                    <a onClick={() => makePayment(subscription)} className="btn btn-gradient dz-flex-box btn-shadow rounded-xl">
                      {subscription.amount} Pi {'=>'} {t('subscribe')}</a>
                  </div>
                </div>)
              ))
            }
            {/* {activeSubscription ===0 && (<div class="subscribe-content plus">
              <ul class="pricing-data">
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Likes</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>See Who Likes You</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>Priority Likes</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Rewinds</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>1 Free Boost per month</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>5 Free Super Likes per week</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>Message Before Matching</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Passport</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>Top Picks</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Your Profile</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who Sees You</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who You See</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Hide Ads</span>
                </li>
              </ul>
              <div class="bottom-btn container bg-white text-center px-5">
                <a href="javascript:void(0);" class="btn btn-gradient dz-flex-box btn-shadow rounded-xl">Starting at <span class="ms-2"><i class="fa-solid fa-indian-rupee-sign"></i></span> 450</a>
              </div>
            </div>)}
            {activeSubscription ===1 && (<div class="subscribe-content gold">
              <ul class="pricing-data">
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Likes</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>See Who Likes You</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>Priority Likes</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Rewinds</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>1 Free Boost per month</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>5 Free Super Likes per week</span>
                </li>
                <li class="list-false">
                  <i class="icon feather icon-lock"></i>
                  <span>Message Before Matching</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Passport</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Top Picks</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Your Profile</span>
                </li> 
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who Sees You</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who You See</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Hide Ads</span>
                </li>
              </ul>
              <div class="bottom-btn container bg-white text-center px-5">
                <a href="javascript:void(0);" class="btn btn-gradient dz-flex-box btn-shadow rounded-xl">Starting at <span class="ms-2"><i class="fa-solid fa-indian-rupee-sign"></i></span> 650</a>
              </div>
            </div>)}
            {activeSubscription ===2 && (<div class="subscribe-content platinum">
              <ul class="pricing-data">
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Likes</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>See Who Likes You</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Priority Likes</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Unlimited Rewinds</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>1 Free Boost per month</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>5 Free Super Likes per week</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Message Before Matching</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Passport</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Top Picks</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Your Profile</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who Sees You</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Control Who You See</span>
                </li>
                <li class="list-true">
                  <i class="icon feather icon-check"></i>
                  <span>Hide Ads</span>
                </li>
              </ul>
              <div class="bottom-btn container bg-white text-center px-5">
                <a href="javascript:void(0);" class="btn btn-gradient dz-flex-box btn-shadow rounded-xl">Starting at <span class="ms-2"><i class="fa-solid fa-indian-rupee-sign"></i></span> 999</a>
              </div>
            </div>)} */}
          </div>
        </div> 
      </div>
    </>
  );
}