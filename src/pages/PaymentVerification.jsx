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
import { useNavigate, useLocation } from 'react-router';
import api from "../api";
import Loader from '../components/Loader';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function PaymentVerification() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {t} = useTranslation()
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  const { isLoggedIn, isLoading, user, dateFilter, isSaving } = useSelector((state) => state.user);

  // Load data on page change
  useEffect(() => {
    dispatch(setIsSaving(true))
    setTimeout(() => {
      dispatch(setIsSaving(false))
    }, 10000);
    return () => {
      verifyPayment()
      //alert('unmounting')
    };
  }, []);
  
  const verifyPayment = async () => {
      //alert('makepaiement')
      const {uniqueId, from} = location.state
      const type = from
      //alert(uniqueId)
      try {
          const res = await api.post(`payment-verifier`, {uniqueId, type});
          console.log(`payment-verifier`, res.data); // adjust to your API structure
          if (res.data.status === true && res.data.isPaymentDone === true) {
            const title = from
            const message = from
            MySwal.fire({ 
              title: title,
              text: message,
              icon: "success",
              showConfirmButton: true,
            });
          }else{
            const title = "Info"
            const message = res.data.message
            MySwal.fire({ 
              title: title,
              text: message,
              icon: "error",
              showConfirmButton: true,
            });
          }
          //navigate(-1)
        } catch (err) {
          console.error("Error :", err);
      }
  };

  return (
    <>
      <Header showBackButton={true} title={"Payment verification"} showWishList={false} classes={` bg-gray-color`}/>
      <div className="content-body bg-gray-color" style={{height: "100vh"}}>
        <div class="page-content space-top p-b60">
          <div class="container"> 
            <div class="dz-subscribe-area">
              <div className={`subscribe-content`}>
                <div className="bottom-btn container bg-white text-center px-5" style={{top: "50%"}}>
                  <button disabled={isSaving} onClick={() => navigate(-1)} className="btn btn-gradient dz-flex-box btn-shadow rounded-xl w-100">
                    {t('close')} <Loader/>
                  </button>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}