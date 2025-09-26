import { Link, useParams } from 'react-router';

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
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {t} = useTranslation()
  const { isLoggedIn, isLoading, user, dateFilter } = useSelector((state) => state.user);

  const [subscription, setSubscription] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState({});

  // Get my profile from API
  const getSubscriptionDetails = async () => {
      dispatch(setIsLoading(true));
      try {
          const res = await api.get(`get-subscription-details/${id}`);
          console.log(`get-subscriptions`, res.data); // adjust to your API structure
          setSubscription(res.data.subscription)
      } catch (err) {
          console.error("Error :", err);
      }
      dispatch(setIsLoading(false));
  };

  // Load data on page change
  useEffect(() => {
    getSubscriptionDetails();
    //dispatch(changeLanguage('fr'))
  }, []);

  const handleRadioChange = (id) => {
      setSelectedPeriod(id)
  };
  
  const makePayment = () => {
      //alert('makepaiement')
      dispatch(piPayment({
          amount: selectedPeriod.amount,
          memo: `Subscription ${subscription.name}`,
          metadata: {
              userId: user.id,
              type: 'subscription',
              period_subscriptions_id: selectedPeriod.id,
          },
      }));
  };

  if (isLoading) {
      return (
          <>
              <Header showBackButton={true} title={"Subscription details"} showWishList={false}/>
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
      <Header showBackButton={true} title={"Subscription details"} showWishList={false}/>
      <div class="page-content space-top p-b60">
        <div class="container"> 
          <div class="dz-subscribe-area">
            <div class="subscribe-area-top">
              <div class="swiper subscription-swiper2">
                <div className={`subscribe-box`}>
                  <h3 className="title">{subscription?.name}</h3>
                  {/* <div className="badge">PLUS</div> */}
                </div>
                <div className="swiper-btn">
                  <div className="swiper-pagination style-1 flex-1"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="section-head ps-0 py-4">
                  <h5>Choose a period</h5>
              </div>
              <div className="radio style-2">
                  {
                    subscription?.periods?.map((period, index) => (
                      <label key={index} className="radio-label" htmlFor={period.period_interval}>
                          <input type="radio" name="period" value={period.id}
                              id={period.period_interval} 
                              checked={
                                  period.id ===
                                  selectedPeriod.id
                              }
                              onChange={() =>
                                  handleRadioChange(
                                      period
                                  )
                              }/>
                          <span className="checkmark">						
                              <span className="text">{period.nb_period} {period.period}</span>
                              <span className="check"></span>							
                          </span>
                      </label>
                    ))
                  }
              </div>
            </div>
            <div className={`subscribe-content`}>
              <ul className="pricing-data">
                {
                  subscription?.contents?.map((content, index) => (
                    <li key={index} className="list-true">
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
                <button disabled={!selectedPeriod.id} onClick={() => makePayment()} className="btn btn-gradient dz-flex-box btn-shadow rounded-xl w-100">
                  {selectedPeriod.amount} Pi {'=>'} {t('subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </>
  );
}