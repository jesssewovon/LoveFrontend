import { Link } from 'react-router';

import Header from '../components/Header';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace } from '../varsSlice';
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
  const { isLoggedIn, isLoading } = useSelector((state) => state.vars);
  const handleLogin = async () => {
    const scopes = ["username", "payments", "wallet_address", "preferred_language"];
      const onIncompletePaymentFound = (payment) =>{
          //console.log('signin onIncompletePaymentFound', payment)
          let txid = payment.transaction.txid;
          let txUrl = payment.transaction._link;
          let paymentId = payment.identifier;
          let data = {
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
      <div className="page-content space-top p-b60">
        <div className="container pt-0"> 
          {isLoggedIn?
            (<div className="profile-area">
              <div className="main-profile">
                <div className="about-profile">
                  <a href="setting.html" className="setting dz-icon">
                    <i className="flaticon flaticon-setting"></i>
                  </a>
                  <div className="media rounded-circle">
                    <img src="../src/assets/images/user/pic1.jpg" alt="profile-image"/>
                    <svg className="radial-progress m-b20" data-percentage="40" viewBox="0 0 80 80">
                      <circle className="incomplete" cx="40" cy="40" r="35"></circle>
                      <circle className="complete" cx="40" cy="40" r="35" style={{strokeDashoffset: "39.58406743523136;"}}></circle>
                    </svg>
                    <div className="data-fill"><span>40%</span></div>
                  </div>
                  <a href="edit-profile.html" className="edit-profile dz-icon">
                    <i className="flaticon flaticon-pencil-2"></i>
                  </a>
                </div>
                <div className="profile-detail">
                  <h5 className="name">Richard, 20</h5>
                  <p className="mb-0"><i className="icon feather icon-map-pin me-1"></i> Mentreal, Canada</p>
                </div>
              </div>
              <div className="row g-2 mb-5">
                <div className="col-4">
                  <div className="card style-2">
                    <div className="card-body">
                      <a href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"> 
                        <div className="card-icon">
                          <i className="flaticon flaticon-star-1"></i>
                        </div>
                        <div className="card-content">
                          <p>0 Super Likes</p>
                        </div>
                        <i className="icon feather icon-plus"></i>
                      </a>
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
                      <a href="subscription.html">
                        <div className="card-icon">
                          <i className="flaticon flaticon-bell"></i>
                        </div>
                        <div className="card-content">
                          <p>Subscriptions</p>
                        </div>
                        <i className="icon feather icon-plus"></i>
                      </a>
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
                      <a href="subscription.html" className="btn rounded-xl">Get Dating Plus</a>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="dz-content">
                      <h5 className="title">Get Dating Gold</h5>
                      <p>Get Unlimited Likes, Passport and more!</p>
                      <a href="subscription.html" className="btn rounded-xl">Get Dating Gold</a>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="dz-content">
                      <h5 className="title">Get Dating Platinum</h5>
                      <p>Get Unlimited Likes, Passport and more!</p>
                      <a href="subscription.html" className="btn rounded-xl">Get Dating Platinum</a>
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