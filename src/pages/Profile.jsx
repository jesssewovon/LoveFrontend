import { Link } from 'react-router';

import Header from '../components/Header';
import MenuBar from '../components/MenuBar';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace } from '../store/userSlice';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../components/Loader';

export default function Profile() {
  const MySwal = withReactContent(Swal);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("fr")
  }, [i18n])
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.user);
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
                  <div className="media rounded-circle">
                    <img src={user?.profile?.imageFirst} alt="profile-image"/>
                    <svg className="radial-progress m-b20" data-percentage="80" viewBox="0 0 80 80">
                      <circle className="incomplete" cx="40" cy="40" r="35"></circle>
                      <circle className="complete" cx="40" cy="40" r="35" style={{strokeDashoffset: "39.58406743523136;"}}></circle>
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
                      <Link to="/" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"> 
                        <div className="card-icon">
                          <i className="flaticon flaticon-star-1"></i>
                        </div>
                        <div className="card-content">
                          <p>0 Super Likes</p>
                        </div>
                        <i className="icon feather icon-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <div className="card-icon">
                        <i className="flaticon flaticon-shuttle"></i>
                      </div>
                      <div className="card-content">
                        <p>My Boosts</p>
                      </div>
                      <i className="icon feather icon-plus"></i>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <Link to="/">
                        <div className="card-icon">
                          <i className="flaticon flaticon-bell"></i>
                        </div>
                        <div className="card-content">
                          <p>Subscriptions</p>
                        </div>
                        <i className="icon feather icon-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper subscription-swiper">
                <div className="swiper-wrapper mb-3">
                  <div className="swiper-slide">
                    <div className="dz-content">
                      <h5 className="title">Get Dating Plus</h5>
                      <p>Get Unlimited Likes, Passport and more!</p>
                      <Link to="/" className="btn rounded-xl">Get Dating Plus</Link>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="dz-content">
                      <h5 className="title">Get Dating Gold</h5>
                      <p>Get Unlimited Likes, Passport and more!</p>
                      <Link to="/" className="btn rounded-xl">Get Dating Gold</Link>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="dz-content">
                      <h5 className="title">Get Dating Platinum</h5>
                      <p>Get Unlimited Likes, Passport and more!</p>
                      <Link to="/" className="btn rounded-xl">Get Dating Platinum</Link>
                    </div>
                  </div>
                </div>
                <div className="swiper-btn">
                  <div className="swiper-pagination style-1 flex-1"></div>
                </div>
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