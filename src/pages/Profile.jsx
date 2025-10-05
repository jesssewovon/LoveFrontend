import { Link } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace, piPayment } from '../store/userSlice';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../components/Loader';
import { navigate } from '../navigationService';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Profile() {
  const MySwal = withReactContent(Swal);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("fr")
  }, [i18n])
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user, settings } = useSelector((state) => state.user);
  const handleLogin = async () => {
      const scopes = ["username", "payments", "wallet_address", "preferred_language"];
      const onIncompletePaymentFound = (payment) =>{
          //console.log('signin onIncompletePaymentFound', payment)
          const txid = payment.transaction.txid;
          const txUrl = payment.transaction._link;
          const paymentId = payment.identifier;
          const data = {
              paymentId:paymentId,
              txid:txid,
          }
          //self.executePaymentCompletion(data)
          //We're not allowed to cancel a payment after approve
          //this.dispatch('cancelPayment', data)
      };
    dispatch(signinPiketplace({ scopes, onIncompletePaymentFound }));
  };

  return (
    <>
      <Header showBackButton={true} title={"Profile"} showWishList={false} classes={"bg-white"}/>
      <MenuBar/>
      <div className="page-content space-top p-b60">
        <div className="container pt-0"> 
          {isLoggedIn?
            (<div className="profile-area">
              <div className="main-profile">
                <div className="about-profile">
                  <Link to="/settings" className="setting dz-icon">
                    <i className="flaticon flaticon-setting"></i>
                  </Link>
                  <div className="media rounded-circle" onClick={() => navigate('/edit-profile')}>
                    <img src={user?.profile?.imageFirst} alt="profile-image"/>
                    <svg className="radial-progress m-b20" data-percentage="40" viewBox="0 0 80 80">
                      <circle className="incomplete" cx="40" cy="40" r="35"></circle>
                      <circle className="complete" cx="40" cy="40" r="35" style={{strokeDashoffset: (100-user?.profile?.profilePercentage)*222/100}}></circle>
                    </svg>
                    <div className="data-fill"><span>{user?.profile?.profilePercentage}%</span></div>
                  </div>
                  <Link to="/edit-profile" className="edit-profile dz-icon">
                    <i className="flaticon flaticon-pencil-2"></i>
                  </Link>
                </div>
                <div className="profile-detail">
                  <h5 className="name">
                    {user?.profile?.firstname}, {user?.profile?.age}
                  </h5>
                  {user?.profile?.address?
                    (<p className="mb-0">
                      <i className="icon feather icon-map-pin me-1"></i> 
                      {user?.profile?.address}
                    </p>):''
                  }
                </div>
              </div>
              <div className="row g-2 mb-5">
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <a> 
                        <div className="card-icon">
                          <i className="fa fa-heart"></i>
                        </div>
                        <div className="card-content">
                          <p>{user?.profile?.matchData?.nbLikes} Likes</p>
                        </div>
                        {/* <i className="icon feather icon-plus"></i> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <a> 
                        <div className="card-icon">
                          <i className="fa fa-times" style={{color: "red"}}></i>
                        </div>
                        <div className="card-content">
                          <p>{user?.profile?.matchData?.nbDislikes} Dislikes</p>
                        </div>
                        {/* <i className="icon feather icon-plus"></i> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <a>
                        <div className="card-icon">
                          <svg className="subscription" width="30px" height="30px" viewBox="0 0 120 120" id="Layer_1" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <polygon class="st0" points="60,13.7 70.7,19.9 83.1,19.9 89.3,30.7 100.1,36.9 100.1,49.3 106.3,60 100.1,70.7 100.1,83.1 89.3,89.3 83.1,100.1 70.7,100.1 60,106.3 49.3,100.1 36.9,100.1 30.7,89.3 19.9,83.1 19.9,70.7 13.7,60 19.9,49.3 19.9,36.9 30.7,30.7 36.9,19.9 49.3,19.9 "></polygon> <g> <path class="st1" d="M60,93.9c-18.7,0-33.9-15.2-33.9-33.9S41.3,26.1,60,26.1S93.9,41.3,93.9,60S78.7,93.9,60,93.9z M60,29 c-17.1,0-31,13.9-31,31s13.9,31,31,31s31-13.9,31-31S77.1,29,60,29z"></path> </g> <g> <path class="st2" d="M56.3,72.6L41.6,60.9c-1.2-1-1.4-2.7-0.4-3.9l0,0c1-1.2,2.7-1.4,3.9-0.4l12.6,10.1l16.8-18.8 c1-1.1,2.8-1.2,3.9-0.2v0c1.1,1,1.2,2.8,0.2,3.9L60.1,72.3C59.1,73.4,57.4,73.5,56.3,72.6z"></path> </g> </g> </g></svg>
                        </div>
                        <div className="card-content">
                          {
                            user.profile?.hasActiveSubscription?
                            (<p>{user.profile?.active_subscription.name}</p>):
                            (<p>No subscriptions</p>)
                          }
                        </div>
                        {/* <i className="icon feather icon-plus"></i> */}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper subscription-swiper">
                <Swiper
                    spaceBetween={30}
                    speed={1500}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper get-started"
                >
                    {settings?.subscriptions?.map((subscription, index) => (
                        <SwiperSlide key={subscription.id}>
                            <div className="dz-content">
                              <h5 className="title">{subscription.name}</h5>
                              <p>{subscription.description}</p>
                              <Link to={`/subscription-details/${subscription.id}`} className="btn rounded-xl">
                                {t('subscribe')}
                              </Link>
                            </div>
                        </SwiperSlide>
                      ))
                    }
                </Swiper>
              </div>
            </div>):
            (
              <div className="profile-area">
                <div className="main-profile">
                  <div className="mt-4">
                    <button disabled={isLoading} onClick={() => handleLogin()} className="btn mb-2 me-2 btn-icon icon-start w-100 btn-primary">
                      {t('log_in_first')}
                      <Loader/>
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div> 
      </div>
    </>
  );
}